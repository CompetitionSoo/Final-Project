#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import cv2
import math
import rospy
import smbus
import threading
import ros_numpy
import numpy as np
import RPi.GPIO as GPIO
import pyzbar.pyzbar as pyzbar
from time import sleep
# Note: Robot class is removed if we exclusively use I2C for motors
# from jetbotmini import Robot  # Commented out - assuming I2C control is primary
from jetbotmini_msgs.msg import *
from jetbotmini_msgs.srv import *
from sensor_msgs.msg import Image
from std_msgs.msg import String

print("Starting Coubot node!")

# --- Constants ---
# States
STATE_STOP = 0
STATE_DRIVE = 1
STATE_LEFT = 2
STATE_RIGHT = 3

# GPIO
Led_B_pin = 23

# I2C
I2C_BUS = 1
I2C_ADDRESS = 0x1B # Address of the motor driver / peripheral board
MOTOR_REG = 0x01   # Register for motor control commands
BUZZER_REG = 0x06  # Register for buzzer control
VOLTAGE_REG = 0x00 # Register for reading voltage ADC

# Motor Control Parameters (Tune these values!)
# Using 0-255 range as suggested by handle_set_speed
FORWARD_SPEED = 100      # Base speed for driving straight
TURN_SPEED_FAST = 100    # Speed of the faster wheel during a turn
TURN_SPEED_SLOW = 50     # Speed of the slower wheel during a turn
# Direction constants for I2C command [DirL, SpeedL, DirR, SpeedR]
# Assuming 1 = Forward, 0 = Backward/Stop (Verify this with hardware documentation!)
DIR_F = 1
DIR_B = 0 # Or use DIR_F with speed 0 for stop if DIR_B means reverse

# Line Following Parameters (Tune these values!)
BLUE_LOWER = np.array([100, 100, 100], dtype=np.uint8) # Adjust saturation/value lower bounds
BLUE_UPPER = np.array([124, 255, 255], dtype=np.uint8) # Adjust hue range if needed
MIN_CONTOUR_RADIUS = 30 # Minimum size of detected blue blob to react
STEERING_THRESHOLD = 35 # Pixel difference from center to trigger turning

# --- GPIO & I2C Setup ---
GPIO.setwarnings(False) # Disable GPIO warnings
GPIO.setmode(GPIO.BCM)
GPIO.setup(Led_B_pin, GPIO.OUT, initial=GPIO.HIGH) # LED Off initially

try:
    bus = smbus.SMBus(I2C_BUS)
    rospy.loginfo(f"I2C Bus {I2C_BUS} connected.")
except Exception as e:
    rospy.logerr(f"Failed to connect to I2C bus {I2C_BUS}: {e}")
    # Exit or handle error appropriately
    exit()


class Coubot:
    def __init__(self):
        rospy.on_shutdown(self.cancel)
        # self.robot = Robot() # Removed if using I2C directly

        self.state = STATE_STOP
        self.frame = None
        self.qrData = None
        self._lock = threading.Lock() # Lock for thread safety if needed (simple state is often okay)

        # --- ROS Communication Setup ---
        self.img_subscriber = rospy.Subscriber("/image", Image, self.image_callback, queue_size=1, buff_size=52428800) # Process one image at a time
        self.auto_subscriber = rospy.Subscriber("/start_auto", String, self.auto_cb)
        self.srv_Buzzer = rospy.Service("/Buzzer", Buzzer, self.buzzer_cb)
        self.srv_LEDBLUE = rospy.Service("/LEDBLUE", LEDBLUE, self.led_blue_cb)
        self.srv_speed = rospy.Service("/set_speed", SetSpeed, self.set_speed_cb)
        self.srv_dir = rospy.Service("/key_Controll", KeyControll, self.key_controll_cb)
        self.qr_publisher = rospy.Publisher("/data", String, queue_size=10)
        self.volPublisher = rospy.Publisher("/voltage", Battery, queue_size=10)

        # --- Start Background Threads ---
        self.stop_event = threading.Event() # Event to signal threads to stop

        self.decode_thread = threading.Thread(target=self.decode_qr_loop)
        self.decode_thread.daemon = True
        self.decode_thread.start()

        self.battery_thread = threading.Thread(target=self.battery_monitor_loop)
        self.battery_thread.daemon = True
        self.battery_thread.start()

        rospy.loginfo("Coubot Initialized.")

    def cancel(self):
        rospy.loginfo("Shutting down Coubot...")
        self.stop_event.set() # Signal threads to stop
        self.stop_motors() # Ensure motors are stopped
        # Wait briefly for threads to finish
        self.battery_thread.join(timeout=1.0)
        self.decode_thread.join(timeout=1.0)
        self.img_subscriber.unregister()
        # Services shutdown automatically with node shutdown
        # Publishers unregister automatically with node shutdown
        GPIO.output(Led_B_pin, GPIO.HIGH) # Turn off LED
        GPIO.cleanup()
        cv2.destroyAllWindows() # Close OpenCV windows
        rospy.loginfo("Coubot shutdown complete.")
        rospy.sleep(1)

    def set_state(self, new_state):
        # Potentially use self._lock here if state transitions become complex
        # with self._lock:
        if self.state != new_state:
            self.state = new_state
            rospy.loginfo(f"State changed to: {self.get_state_name(self.state)}")

    def get_state_name(self, state_enum):
        if state_enum == STATE_STOP: return "STOP"
        if state_enum == STATE_DRIVE: return "DRIVE"
        if state_enum == STATE_LEFT: return "LEFT"
        if state_enum == STATE_RIGHT: return "RIGHT"
        return "UNKNOWN"

    def auto_cb(self, msg):
        rospy.loginfo(f"Received auto command: {msg.data}")
        if msg.data == "on":
            rospy.loginfo("Starting line driving mode.")
            self.set_state(STATE_DRIVE) # Start in DRIVE state
        elif msg.data == "off":
            rospy.loginfo("Stopping autonomous driving.")
            self.set_state(STATE_STOP)
            self.stop_motors() # Explicitly stop motors

    def battery_monitor_loop(self):
        """Continuously monitors battery voltage and publishes it."""
        while not self.stop_event.is_set() and not rospy.is_shutdown():
            try:
                # Read 2 bytes from the specified register
                AD_value = bus.read_i2c_block_data(I2C_ADDRESS, VOLTAGE_REG, 2)
                # Combine bytes (assuming high byte first)
                raw_adc = (AD_value[0] << 8) + AD_value[1]
                # Convert to voltage - ** ADJUST THE FORMULA BASED ON YOUR HARDWARE **
                # The formula V = raw * 13.3 / 1023.0 seems specific. Verify it.
                # Assuming 10-bit ADC (1024 levels) and a voltage divider.
                # Example: If max voltage (e.g., 13V) maps to 1023, then V = raw * 13.0 / 1023.0
                # Let's stick to your formula for now:
                voltage_actual = raw_adc * 13.3 / 1023.0
                # Calculate percentage (assuming 13.0V is 100%? Adjust as needed)
                # voltage_percent = math.floor((voltage_actual * 100) / 13.0)
                # Let's just publish the raw voltage for now, percentage calc can be uncertain
                voltage_percent = voltage_actual # Publish actual voltage

                battery_msg = Battery()
                battery_msg.Voltage = round(voltage_percent, 2) # Publish rounded voltage
                self.volPublisher.publish(battery_msg)

            except IOError as e:
                rospy.logwarn(f"I2C read error during battery check: {e}")
            except Exception as e:
                rospy.logerr(f"Error in battery monitor loop: {e}")

            # Sleep for 30 seconds OR until stop event is set
            self.stop_event.wait(30.0)

    def led_blue_cb(self, request):
        """Handles the LED control service."""
        response = LEDBLUEResponse(result=False) # Default to False
        try:
            if request.ledblue == 1: # Blink
                rospy.loginfo("Blinking BLUE LED")
                # Run blinking in a short-lived thread to avoid blocking service
                def blink():
                    for _ in range(5): # Blink 5 times
                        if self.stop_event.is_set(): break
                        GPIO.output(Led_B_pin, GPIO.LOW) # LED On
                        sleep(0.4)
                        if self.stop_event.is_set(): break
                        GPIO.output(Led_B_pin, GPIO.HIGH) # LED Off
                        sleep(0.4)
                    if not self.stop_event.is_set():
                         GPIO.output(Led_B_pin, GPIO.HIGH) # Ensure LED is off after blinking
                blink_thread = threading.Thread(target=blink)
                blink_thread.start() # Start blinking
                response.result = True # Indicate command received
            elif request.ledblue == 0: # Turn Off
                rospy.loginfo("Turning BLUE LED OFF")
                GPIO.output(Led_B_pin, GPIO.HIGH)
                response.result = True
            else: # Turn On Solid (Optional: Add a case for solid on if needed)
                 rospy.loginfo("Turning BLUE LED ON (Solid)")
                 GPIO.output(Led_B_pin, GPIO.LOW) # LED On
                 response.result = True
                 # Note: If you turn it solid ON, you need a way to turn it OFF later.
                 # The original code only had blink or off.
        except Exception as e:
            rospy.logerr(f"Error in LEDBLUEcallback: {e}")
            response.result = False
        return response

    def buzzer_cb(self, request):
        """Handles the Buzzer control service."""
        response = BuzzerResponse(result=False)
        try:
            # Assuming request.buzzer = 1 means ON, 0 means OFF
            # The value might be frequency or duration depending on hardware
            # Let's assume it's ON/OFF for now.
            value_to_write = 1 if request.buzzer > 0 else 0 # Sanitize input
            bus.write_byte_data(I2C_ADDRESS, BUZZER_REG, value_to_write)
            rospy.loginfo(f"Buzzer set to: {value_to_write}")
            response.result = True
        except IOError as e:
            rospy.logwarn(f"I2C write error during buzzer control: {e}")
        except Exception as e:
            rospy.logerr(f"Error in buzzer callback: {e}")
        return response

    # --- Motor Control using I2C ---
    def set_motors_i2c(self, left_speed, right_speed):
        """Sends speed commands to motors via I2C."""
        # Clamp speeds to -255 to 255 range for easier direction handling
        left_speed = max(-255, min(255, int(left_speed)))
        right_speed = max(-255, min(255, int(right_speed)))

        # Determine direction and absolute speed
        left_dir = DIR_F if left_speed >= 0 else DIR_B
        left_val = abs(left_speed)

        right_dir = DIR_F if right_speed >= 0 else DIR_B
        right_val = abs(right_speed)

        # Create I2C command: [DirL, SpeedL, DirR, SpeedR]
        cmd = [left_dir, left_val, right_dir, right_val]

        try:
            bus.write_i2c_block_data(I2C_ADDRESS, MOTOR_REG, cmd)
            # rospy.logdebug(f"Motors cmd: {cmd}") # Use logdebug to avoid flooding logs
        except IOError as e:
            rospy.logwarn(f"I2C write error during motor control: {e}")
        except Exception as e:
            rospy.logerr(f"Error setting motors: {e}")

    def go_forward(self):
        self.set_motors_i2c(FORWARD_SPEED, FORWARD_SPEED)

    def turn_left(self):
        # Slow down right, speed up left (or reverse left slightly)
        self.set_motors_i2c(TURN_SPEED_SLOW, TURN_SPEED_FAST) # Adjust speeds as needed

    def turn_right(self):
        # Slow down left, speed up right (or reverse right slightly)
        self.set_motors_i2c(TURN_SPEED_FAST, TURN_SPEED_SLOW) # Adjust speeds as needed

    def stop_motors(self):
        self.set_motors_i2c(0, 0)

    # --- QR Code Decoding ---
    def decode_qr_loop(self):
        """Continuously decodes QR codes from the latest frame."""
        last_qr_data = None
        last_qr_time = rospy.Time.now()

        while not self.stop_event.is_set() and not rospy.is_shutdown():
            if self.frame is not None:
                try:
                    # Create a local copy to avoid race conditions if frame updates
                    local_frame = self.frame.copy()
                    gray = cv2.cvtColor(local_frame, cv2.COLOR_BGR2GRAY)
                    qrcodes = pyzbar.decode(gray)

                    detected_data_this_frame = None
                    for qrcode in qrcodes:
                        try:
                            data = qrcode.data.decode('utf-8')
                            detected_data_this_frame = data # Store the first one found
                            # Debounce: Only process if it's new or enough time has passed
                            if data != last_qr_data or (rospy.Time.now() - last_qr_time).to_sec() > 5.0:
                                self.qrData = data
                                last_qr_data = data
                                last_qr_time = rospy.Time.now()
                                rospy.loginfo(f"QR CODE DETECTED: {self.qrData}")
                                self.qr_publisher.publish(self.qrData)

                                # --- QR Code Actions ---
                                if self.qrData.lower() == "stop": # Example: Stop command
                                     rospy.loginfo("QR Code 'stop' detected, stopping robot.")
                                     self.set_state(STATE_STOP)
                                     self.stop_motors()
                                elif self.qrData.lower() == "right": # Example: Pause and resume
                                     rospy.loginfo("QR Code 'right' detected, pausing...")
                                     original_state = self.state
                                     self.set_state(STATE_STOP)
                                     self.stop_motors()
                                     # Use ROS Timer for non-blocking delay
                                     rospy.Timer(rospy.Duration(2), lambda e: self.set_state(original_state), oneshot=True)
                                     rospy.loginfo("...resuming state after 2 seconds.")
                                elif self.qrData.lower() == "left": # Example: Pause and resume
                                     rospy.loginfo("QR Code 'left' detected, pausing...")
                                     original_state = self.state
                                     self.set_state(STATE_STOP)
                                     self.stop_motors()
                                     rospy.Timer(rospy.Duration(2), lambda e: self.set_state(original_state), oneshot=True)
                                     rospy.loginfo("...resuming state after 2 seconds.")
                                # Add more QR code commands here
                                break # Process only the first QR code found per frame cycle
                        except Exception as decode_err:
                            rospy.logwarn(f"Error decoding or processing QR data: {decode_err}")

                    # Optional: If no QR code is detected for a while, clear qrData
                    if detected_data_this_frame is None and (rospy.Time.now() - last_qr_time).to_sec() > 10.0:
                         last_qr_data = None # Reset last detected data

                except Exception as e:
                    rospy.logerr(f"Error in QR decode loop: {e}")
            # Sleep briefly to yield CPU
            sleep(0.1)

    # --- Service Callbacks using I2C ---
    def set_speed_cb(self, req):
        """Handles the set speed service using I2C."""
        # Note: This service expects 0-255 speeds and provides direction implicitly
        # Our set_motors_i2c handles signed speeds (-255 to 255).
        # We need to adapt or clarify the service definition.
        # Assuming the service intends absolute speed and direction is handled elsewhere or fixed?
        # Let's assume positive means forward for this service.
        rospy.loginfo(f"Set Speed Service called: Left={req.left_speed}, Right={req.right_speed}")
        self.set_motors_i2c(req.left_speed, req.right_speed) # Pass directly
        return SetSpeedResponse(success=True, message="Speed updated via I2C")

    def key_controll_cb(self, req):
        """Handles manual key control service using I2C."""
        # Speeds defined for manual control (adjust as needed)
        MANUAL_SPEED = 150
        moveBindings = {
            # key: [left_speed, right_speed] using signed values
            "w": [ MANUAL_SPEED,  MANUAL_SPEED],  # Forward
            "s": [-MANUAL_SPEED, -MANUAL_SPEED],  # Backward
            "a": [-MANUAL_SPEED,  MANUAL_SPEED],  # Turn Left (Rotate)
            "d": [ MANUAL_SPEED, -MANUAL_SPEED],  # Turn Right (Rotate)
            "q": [0, 0]                           # Stop
        }
        key = req.keyval.lower() # Make case-insensitive
        if key in moveBindings:
            speeds = moveBindings[key]
            rospy.loginfo(f"Manual Key Control: '{key}' -> speeds {speeds}")
            # Ensure robot stops autonomous mode if manual control is used
            if key != 'q' and self.state != STATE_STOP:
                 rospy.loginfo("Manual control taking over, setting state to STOP.")
                 self.set_state(STATE_STOP) # Stop autonomous behavior

            self.set_motors_i2c(speeds[0], speeds[1])
            return KeyControllResponse(success=True, message=f"Executed command: {key}")
        else:
            rospy.logwarn(f"Invalid key control value: {req.keyval}")
            return KeyControllResponse(success=False, message="Invalid key value")


    # --- Image Processing and Line Following ---
    def image_callback(self, msg):
        """Processes incoming images for line following."""
        if self.state == STATE_STOP and not rospy.get_param("~enable_debug_view", False):
             # If stopped and not specifically debugging, don't process image
             # This saves CPU. Remove this if you always want QR detection.
             # return # Commented out to allow QR detection even when stopped
             pass # Allow processing for QR codes

        try:
            # Convert ROS Image message to OpenCV format
            cv_image = ros_numpy.numpify(msg)
            # Make frame available for QR decoding thread
            self.frame = cv_image.copy() # Store a copy

            # --- Line Detection ---
            # Apply Gaussian blur
            blurred = cv2.GaussianBlur(cv_image, (5, 5), 0)
            # Convert to HSV color space
            hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

            # Create a mask for the blue color
            mask = cv2.inRange(hsv, BLUE_LOWER, BLUE_UPPER)

            # Morphological operations to clean up the mask
            mask = cv2.erode(mask, None, iterations=2)
            mask = cv2.dilate(mask, None, iterations=2)
            # Optional: Another blur on the mask
            # mask = cv2.GaussianBlur(mask, (3, 3), 0)

            # Find contours in the mask
            contours, _ = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            center_x = cv_image.shape[1] // 2
            line_detected = False

            if len(contours) > 0:
                # Find the largest contour
                c = max(contours, key=cv2.contourArea)
                # Get the minimum enclosing circle
                ((x, y), radius) = cv2.minEnclosingCircle(c)

                # Check if the detected contour is large enough
                if radius > MIN_CONTOUR_RADIUS:
                    line_detected = True
                    # Calculate moments to find centroid (more stable than circle center sometimes)
                    M = cv2.moments(c)
                    if M["m00"] != 0:
                        cX = int(M["m10"] / M["m00"])
                        cY = int(M["m01"] / M["m00"])
                    else:
                        cX, cY = int(x), int(y) # Fallback to circle center

                    # --- Draw Debug Visuals ---
                    if rospy.get_param("~enable_debug_view", True): # Control view with param
                         cv2.circle(cv_image, (cX, cY), 5, (0, 0, 255), -1) # Centroid
                         cv2.circle(cv_image, (int(x), int(y)), int(radius), (0, 255, 0), 2) # Enclosing circle
                         cv2.line(cv_image, (center_x, 0), (center_x, cv_image.shape[0]), (255, 0, 0), 1) # Center line
                         cv2.putText(cv_image, f"State: {self.get_state_name(self.state)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

                    # --- Line Following Decision Logic ---
                    if self.state != STATE_STOP: # Only steer if not stopped
                        error = center_x - cX
                        if abs(error) < STEERING_THRESHOLD:
                            # Close enough to the center, go straight
                            if self.state != STATE_DRIVE:
                                self.set_state(STATE_DRIVE)
                            self.go_forward()
                        elif error > 0:
                            # Line is to the left, turn left
                            if self.state != STATE_LEFT:
                                self.set_state(STATE_LEFT)
                            self.turn_left()
                        else: # error < 0
                            # Line is to the right, turn right
                            if self.state != STATE_RIGHT:
                                self.set_state(STATE_RIGHT)
                            self.turn_right()
                # else: contour too small, treat as line not detected well enough

            # --- Handle Line Lost ---
            if not line_detected:
                 # If line is lost AND we were previously driving/turning
                 if self.state in [STATE_DRIVE, STATE_LEFT, STATE_RIGHT]:
                     rospy.logwarn("Line lost!")
                     self.stop_motors()
                     # Optionally, you could change state back to STOP or add searching behavior
                     # self.set_state(STATE_STOP) # Uncomment if you want it to stop state on line loss

            # --- Display Debug Window ---
            if rospy.get_param("~enable_debug_view", True):
                 cv2.imshow("Line Following View", cv_image)
                 # cv2.imshow("Mask", mask) # Uncomment to see the mask
                 key = cv2.waitKey(1) & 0xFF
                 if key == ord('z'): # Exit
                     rospy.signal_shutdown("User pressed 'z' key")
                 elif key == ord('k'): # Toggle auto mode
                     if self.state == STATE_STOP:
                         rospy.loginfo("Debug key 'k': Enabling DRIVE")
                         self.set_state(STATE_DRIVE)
                     else:
                         rospy.loginfo("Debug key 'k': Disabling DRIVE (STOP)")
                         self.set_state(STATE_STOP)
                         self.stop_motors()

        except ros_numpy.registry.ROSInitException:
            rospy.logwarn("ros_numpy issue, skipping frame (likely during shutdown).")
        except Exception as e:
            rospy.logerr(f"Error in image_callback: {e}")
            import traceback
            traceback.print_exc() # Print detailed traceback for debugging


if __name__ == '__main__':
    rospy.init_node("coubot_driver", anonymous=False)
    try:
        # You can control the debug view via a ROS parameter
        # To enable: rosparam set /coubot_driver/enable_debug_view true
        # To disable: rosparam set /coubot_driver/enable_debug_view false
        # Default is True if not set
        if not rospy.has_param("~enable_debug_view"):
             rospy.set_param("~enable_debug_view", True)

        coubot_node = Coubot()
        rospy.loginfo("Coubot node spinning.")
        rospy.spin() # Now this will run and handle callbacks
    except rospy.ROSInterruptException:
        rospy.loginfo("ROS interrupt received. Shutting down.")
    except Exception as e:
        rospy.logfatal(f"Unhandled exception in main: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Ensure cleanup happens even if errors occur
        GPIO.cleanup()
        cv2.destroyAllWindows()
        rospy.loginfo("Main loop finished.")