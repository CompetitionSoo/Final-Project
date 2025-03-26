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
from time import sleep, time
# from jetbotmini import Robot # Assuming I2C control is primary
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
STATE_MANUAL = 4 # Added state for manual control

# GPIO
Led_B_pin = 23

# I2C
I2C_BUS = 1
I2C_ADDRESS = 0x1B # Address of the motor driver / peripheral board
MOTOR_REG = 0x01   # Register for motor control commands [DirL, SpeedL, DirR, SpeedR]
BUZZER_REG = 0x06  # Register for buzzer control (0=Off, 1=On ? Verify)
VOLTAGE_REG = 0x00 # Register for reading voltage ADC (2 bytes)

# Motor Control Parameters (Tune these!)
# Using 0-255 range for I2C command
BASE_SPEED = 80          # Base speed for driving straight in auto mode
TURN_FACTOR = 0.6        # Factor to reduce speed of inner wheel during turn (e.g., 0.6 means inner wheel is 60% of outer)
MANUAL_SPEED = 120       # Speed for manual control
# Direction constants for I2C command [DirL, SpeedL, DirR, SpeedR]
# *** VERIFY THESE VALUES WITH YOUR MOTOR DRIVER DATASHEET ***
# Common convention: 1=Forward, 0=Backward, Speed=0-255
DIR_F = 1
DIR_B = 0

# Line Following Parameters (Tune these!)
BLUE_LOWER = np.array([100, 80, 80], dtype=np.uint8)  # Adjusted lower bounds for saturation/value
BLUE_UPPER = np.array([125, 255, 255], dtype=np.uint8) # Slightly wider hue range
MIN_CONTOUR_AREA = 200 # Use area instead of radius, often more robust
STEERING_THRESHOLD = 30 # Pixel difference from center to trigger turning
LINE_LOST_STOP_DELAY = 1.5 # Seconds to wait after line lost before stopping motors

# Image Processing Optimization
FRAME_PROCESS_RATE = 5 # Process 1 out of every N frames for line following (e.g., 5 = ~6Hz if camera is 30Hz)
QR_DECODE_INTERVAL = 0.5 # Decode QR codes every X seconds (e.g., 0.5 = 2Hz)
# Region of Interest (ROI) - Process only the bottom half of the image for lines
# Format: (startY, endY, startX, endX). Use None to disable ROI.
# Example: Process bottom 50% -> ROI = (0.5, 1.0, 0.0, 1.0)
ROI_PERCENT = (0.5, 1.0, 0.0, 1.0) # (top_%, bottom_%, left_%, right_%)

# --- GPIO & I2C Setup ---
GPIO.setwarnings(False) # Disable GPIO warnings
GPIO.setmode(GPIO.BCM)
GPIO.setup(Led_B_pin, GPIO.OUT, initial=GPIO.HIGH) # LED Off initially

# --- Global Variables ---
bus = None # Initialize bus globally

try:
    bus = smbus.SMBus(I2C_BUS)
    rospy.loginfo(f"I2C Bus {I2C_BUS} connected.")
except FileNotFoundError:
    rospy.logerr(f"I2C bus {I2C_BUS} not found. Check connection and configuration (e.g., sudo raspi-config).")
    exit()
except Exception as e:
    rospy.logerr(f"Failed to connect to I2C bus {I2C_BUS}: {e}")
    exit()

class Coubot:
    def __init__(self):
        rospy.on_shutdown(self.cancel)

        self.state = STATE_STOP
        self.frame = None
        self.frame_processed_time = 0
        self.frame_count = 0
        self.qrData = None
        self.last_qr_scan_time = 0
        self.last_line_detect_time = 0
        self.enable_debug_view = rospy.get_param("~enable_debug_view", False) # Cache param
        self._lock = threading.Lock() # Lock for thread safety on shared resources if needed

        # --- ROS Communication Setup ---
        # Increased queue_size slightly, buff_size often defaults ok, but keep if needed
        self.img_subscriber = rospy.Subscriber("/image", Image, self.image_callback, queue_size=2, buff_size=52428800)
        self.auto_subscriber = rospy.Subscriber("/start_auto", String, self.auto_cb)
        self.srv_Buzzer = rospy.Service("/Buzzer", Buzzer, self.buzzer_cb)
        self.srv_LEDBLUE = rospy.Service("/LEDBLUE", LEDBLUE, self.led_blue_cb)
        self.srv_speed = rospy.Service("/set_speed", SetSpeed, self.set_speed_cb) # Keep for compatibility? Manual control preferred.
        self.srv_dir = rospy.Service("/key_Controll", KeyControll, self.key_controll_cb)
        self.qr_publisher = rospy.Publisher("/data", String, queue_size=1) # Publish latest QR data
        self.volPublisher = rospy.Publisher("/voltage", Battery, queue_size=1) # Publish latest voltage

        # --- Start Background Threads ---
        self.stop_event = threading.Event() # Event to signal threads to stop

        # QR Decode thread runs independently at its own pace
        self.decode_thread = threading.Thread(target=self.decode_qr_loop)
        self.decode_thread.daemon = True
        self.decode_thread.start()

        self.battery_thread = threading.Thread(target=self.battery_monitor_loop)
        self.battery_thread.daemon = True
        self.battery_thread.start()

        rospy.loginfo("Coubot Initialized.")
        rospy.loginfo(f"Debug View Enabled: {self.enable_debug_view}")
        rospy.loginfo(f"Processing 1 in {FRAME_PROCESS_RATE} frames for line following.")
        rospy.loginfo(f"Scanning QR codes every {QR_DECODE_INTERVAL} seconds.")

    def cancel(self):
        rospy.loginfo("Shutting down Coubot...")
        self.stop_event.set() # Signal threads to stop
        self.stop_motors()    # Ensure motors are stopped
        rospy.sleep(0.1)      # Short delay before cleanup

        # Close OpenCV windows *before* joining threads that might use CV
        if self.enable_debug_view:
            cv2.destroyAllWindows()

        # Unregister ROS subscribers/publishers/services explicitly
        try:
            self.img_subscriber.unregister()
            self.auto_subscriber.unregister()
            self.qr_publisher.unregister()
            self.volPublisher.unregister()
            # Services shutdown automatically, but explicit is cleaner if needed
            # self.srv_Buzzer.shutdown()
            # ... etc ...
        except Exception as e:
            rospy.logwarn(f"Error during ROS unregistration: {e}")

        # Wait for threads to finish
        rospy.loginfo("Waiting for threads to join...")
        self.battery_thread.join(timeout=1.0)
        self.decode_thread.join(timeout=1.0)
        rospy.loginfo("Threads joined.")

        # Cleanup GPIO
        try:
            GPIO.output(Led_B_pin, GPIO.HIGH) # Turn off LED
            GPIO.cleanup()
            rospy.loginfo("GPIO cleaned up.")
        except Exception as e:
            rospy.logwarn(f"Error during GPIO cleanup: {e}")

        rospy.loginfo("Coubot shutdown complete.")
        # rospy.sleep(1) # Usually not needed after proper cleanup

    def set_state(self, new_state):
        with self._lock: # Use lock if state changes trigger complex actions
            if self.state != new_state:
                old_state_name = self.get_state_name(self.state)
                self.state = new_state
                rospy.loginfo(f"State changed from {old_state_name} to: {self.get_state_name(self.state)}")
                # If entering a non-moving state, ensure motors are stopped
                if new_state in [STATE_STOP, STATE_MANUAL]: # Manual handles its own stop via 'q'
                     if new_state == STATE_STOP:
                         self.stop_motors()

    def get_state_name(self, state_enum):
        return {
            STATE_STOP: "STOP",
            STATE_DRIVE: "DRIVE",
            STATE_LEFT: "LEFT",
            STATE_RIGHT: "RIGHT",
            STATE_MANUAL: "MANUAL"
        }.get(state_enum, "UNKNOWN")

    def auto_cb(self, msg):
        rospy.loginfo(f"Received auto command: {msg.data}")
        if msg.data.lower() == "on":
            rospy.loginfo("Switching to autonomous line driving mode.")
            # Reset last line detected time to avoid immediate stop
            self.last_line_detect_time = time()
            self.set_state(STATE_DRIVE) # Start in DRIVE state
        elif msg.data.lower() == "off":
            rospy.loginfo("Stopping autonomous driving.")
            self.set_state(STATE_STOP)
            # stop_motors() called by set_state(STATE_STOP)

    def battery_monitor_loop(self):
        """Continuously monitors battery voltage and publishes it."""
        global bus
        while not self.stop_event.is_set() and not rospy.is_shutdown():
            if bus is None:
                rospy.logwarn_throttle(10, "I2C bus not available for battery check.")
                self.stop_event.wait(5.0) # Wait longer if bus is not ready
                continue
            try:
                # Read 2 bytes from the specified register
                AD_value = bus.read_i2c_block_data(I2C_ADDRESS, VOLTAGE_REG, 2)
                # Combine bytes (assuming high byte first - VERIFY THIS!)
                raw_adc = (AD_value[0] << 8) + AD_value[1]
                # Convert to voltage - ** ADJUST THE FORMULA BASED ON YOUR HARDWARE **
                # Example: V = raw_adc * (Vref / ADC_resolution) * Voltage_Divider_Ratio
                # Assuming your formula V = raw * 13.3 / 1023.0 is correct:
                voltage_actual = raw_adc * 13.3 / 1023.0 # Check 1023 (10-bit) or 4095 (12-bit)

                battery_msg = Battery()
                battery_msg.Voltage = round(voltage_actual, 2) # Publish rounded voltage
                self.volPublisher.publish(battery_msg)

            except IOError as e:
                rospy.logwarn(f"I2C read error during battery check: {e}. Retrying connection?")
                # Optional: Try to re-initialize bus here? Be careful about loops.
                # bus = None # Mark bus as invalid
            except Exception as e:
                rospy.logerr(f"Error in battery monitor loop: {e}")

            # Sleep for 30 seconds OR until stop event is set
            self.stop_event.wait(30.0)

    def led_blue_cb(self, request):
        """Handles the LED control service."""
        response = LEDBLUEResponse(result=False)
        try:
            if request.ledblue == 1: # Blink
                rospy.loginfo("Blinking BLUE LED")
                def blink():
                    for _ in range(3): # Blink fewer times
                        if self.stop_event.is_set(): break
                        GPIO.output(Led_B_pin, GPIO.LOW) # LED On
                        sleep(0.3)
                        if self.stop_event.is_set(): break
                        GPIO.output(Led_B_pin, GPIO.HIGH) # LED Off
                        sleep(0.3)
                    if not self.stop_event.is_set():
                         GPIO.output(Led_B_pin, GPIO.HIGH)
                # No need for a separate thread if blink is short
                blink()
                response.result = True
            elif request.ledblue == 0: # Turn Off
                rospy.loginfo("Turning BLUE LED OFF")
                GPIO.output(Led_B_pin, GPIO.HIGH)
                response.result = True
            else: # Turn On Solid
                 rospy.loginfo("Turning BLUE LED ON (Solid)")
                 GPIO.output(Led_B_pin, GPIO.LOW) # LED On
                 response.result = True
        except Exception as e:
            rospy.logerr(f"Error in LEDBLUEcallback: {e}")
            response.result = False
        return response

    def buzzer_cb(self, request):
        """Handles the Buzzer control service."""
        global bus
        response = BuzzerResponse(result=False)
        if bus is None:
            rospy.logwarn("I2C bus not available for buzzer control.")
            return response
        try:
            # Assuming 1 = ON (for a short duration?), 0 = OFF. Needs clarification.
            # Let's make 1 beep briefly, 0 turn off.
            value_to_write = 1 if request.buzzer > 0 else 0
            bus.write_byte_data(I2C_ADDRESS, BUZZER_REG, value_to_write)
            rospy.loginfo(f"Buzzer command sent: {value_to_write}")
            # If '1' means 'start buzzing', you might need to send '0' after a delay
            if value_to_write == 1:
                # Simple non-blocking timer to turn buzzer off after ~0.2s
                rospy.Timer(rospy.Duration(0.2), self._turn_buzzer_off, oneshot=True)
            response.result = True
        except IOError as e:
            rospy.logwarn(f"I2C write error during buzzer control: {e}")
        except Exception as e:
            rospy.logerr(f"Error in buzzer callback: {e}")
        return response

    def _turn_buzzer_off(self, event=None):
        """Internal helper to turn buzzer off after a delay."""
        global bus
        if bus:
            try:
                bus.write_byte_data(I2C_ADDRESS, BUZZER_REG, 0)
                # rospy.logdebug("Buzzer turned off automatically.")
            except IOError as e:
                rospy.logwarn(f"I2C write error turning buzzer off: {e}")
            except Exception as e:
                rospy.logerr(f"Error turning buzzer off: {e}")


    # --- Motor Control using I2C ---
    def set_motors_i2c(self, left_speed, right_speed):
        """Sends speed commands to motors via I2C. Speeds are -255 to 255."""
        global bus
        if bus is None:
            # rospy.logwarn_throttle(5, "I2C bus not available for motor control.")
            return # Don't try to send if bus isn't working

        # Clamp speeds to -255 to 255 range
        left_speed = max(-255, min(255, int(left_speed)))
        right_speed = max(-255, min(255, int(right_speed)))

        # Determine direction and absolute speed (0-255)
        # *** Assumes DIR_F=1, DIR_B=0. VERIFY! ***
        left_dir = DIR_F if left_speed >= 0 else DIR_B
        left_val = abs(left_speed)

        right_dir = DIR_F if right_speed >= 0 else DIR_B
        right_val = abs(right_speed)

        # Create I2C command: [DirL, SpeedL, DirR, SpeedR]
        cmd = [left_dir, left_val, right_dir, right_val]

        try:
            bus.write_i2c_block_data(I2C_ADDRESS, MOTOR_REG, cmd)
            # rospy.logdebug(f"Motors cmd: {cmd}") # Debug if needed
        except IOError as e:
            rospy.logwarn(f"I2C write error during motor control: {e}")
            # Consider attempting to re-initialize bus here after repeated failures
        except Exception as e:
            rospy.logerr(f"Error setting motors via I2C: {e}")

    def go_forward(self):
        self.set_motors_i2c(BASE_SPEED, BASE_SPEED)

    def turn_left(self):
        # Outer wheel (right) faster, inner wheel (left) slower
        self.set_motors_i2c(int(BASE_SPEED * TURN_FACTOR), BASE_SPEED)

    def turn_right(self):
        # Outer wheel (left) faster, inner wheel (right) slower
        self.set_motors_i2c(BASE_SPEED, int(BASE_SPEED * TURN_FACTOR))

    def stop_motors(self):
        self.set_motors_i2c(0, 0)

    # --- QR Code Decoding ---
    def decode_qr_loop(self):
        """Continuously decodes QR codes from the latest frame at a fixed interval."""
        last_qr_data = None
        last_qr_publish_time = rospy.Time(0)

        while not self.stop_event.is_set() and not rospy.is_shutdown():
            current_time = time()
            # Check if enough time has passed and if a frame is available
            if current_time - self.last_qr_scan_time > QR_DECODE_INTERVAL and self.frame is not None:
                self.last_qr_scan_time = current_time
                try:
                    # Create a local copy to avoid race conditions if frame updates mid-decode
                    with self._lock: # Lock if self.frame access needs sync with image_callback
                        local_frame = self.frame.copy()

                    # --- Performance: Optionally resize image before decoding ---
                    # scale_percent = 50 # percent of original size
                    # width = int(local_frame.shape[1] * scale_percent / 100)
                    # height = int(local_frame.shape[0] * scale_percent / 100)
                    # dim = (width, height)
                    # resized_frame = cv2.resize(local_frame, dim, interpolation = cv2.INTER_AREA)
                    # gray = cv2.cvtColor(resized_frame, cv2.COLOR_BGR2GRAY)
                    # --- End optional resize ---

                    # Decode from full-res grayscale
                    gray = cv2.cvtColor(local_frame, cv2.COLOR_BGR2GRAY)
                    qrcodes = pyzbar.decode(gray)

                    detected_data_this_scan = None
                    if qrcodes:
                        # Process the first detected QR code
                        qrcode = qrcodes[0]
                        try:
                            data = qrcode.data.decode('utf-8')
                            detected_data_this_scan = data

                            # Only act or publish if it's different from the last *published* data
                            if data != last_qr_data:
                                self.qrData = data # Update internal cache
                                last_qr_data = data
                                last_qr_publish_time = rospy.Time.now()
                                rospy.loginfo(f"QR CODE DETECTED: {self.qrData}")
                                self.qr_publisher.publish(self.qrData)

                                # --- QR Code Actions ---
                                # Ensure actions are safe and don't conflict with current state machine
                                qr_lower = self.qrData.lower()
                                if qr_lower == "stop" and self.state != STATE_MANUAL:
                                    rospy.loginfo("QR Code 'stop' detected, stopping robot.")
                                    self.set_state(STATE_STOP)
                                elif qr_lower in ["left", "right", "pause"] and self.state not in [STATE_STOP, STATE_MANUAL]:
                                     rospy.loginfo(f"QR Code '{qr_lower}' detected, pausing...")
                                     original_state = self.state # Store state *before* stopping
                                     self.set_state(STATE_STOP) # Stop first
                                     # Use ROS Timer for non-blocking delay before resuming
                                     def resume_state(event, state_to_resume):
                                         rospy.loginfo("...resuming state after pause.")
                                         # Only resume if still in STOP (didn't receive another command)
                                         if self.state == STATE_STOP:
                                             self.last_line_detect_time = time() # Reset line timer
                                             self.set_state(state_to_resume)
                                     rospy.Timer(rospy.Duration(2), lambda e: resume_state(e, original_state), oneshot=True)
                                # Add more QR code commands here

                        except Exception as decode_err:
                            rospy.logwarn(f"Error decoding or processing QR data: {decode_err}")

                    # Optional: Clear internal cache if no QR seen for a while?
                    # if detected_data_this_scan is None and (rospy.Time.now() - last_qr_publish_time).to_sec() > 15.0:
                    #      if last_qr_data is not None:
                    #         rospy.loginfo("Clearing cached QR data.")
                    #         last_qr_data = None
                    #         self.qrData = None # Clear internal cache too

                except Exception as e:
                    rospy.logerr(f"Error in QR decode loop: {e}", exc_info=True) # Log traceback

            # Sleep briefly to prevent busy-waiting, but rely on interval check
            self.stop_event.wait(0.1) # Small wait


    # --- Service Callbacks using I2C ---
    def set_speed_cb(self, req):
        """Handles the set speed service. Note: Manual control via key_Controll is preferred."""
        # This service seems ambiguous with the new I2C control scheme.
        # It expects 0-255, but set_motors_i2c uses signed speeds.
        # Let's assume it's for setting speeds while already going forward?
        rospy.logwarn("Received call to /set_speed service. This is deprecated by /key_Controll. Setting state to MANUAL.")
        self.set_state(STATE_MANUAL) # Switch to manual state
        # Assume positive speeds mean forward
        left = max(0, min(255, req.left_speed))
        right = max(0, min(255, req.right_speed))
        self.set_motors_i2c(left, right)
        return SetSpeedResponse(success=True, message="Switched to MANUAL and set speed via I2C. Use /key_Controll.")

    def key_controll_cb(self, req):
        """Handles manual key control service using I2C."""
        # Speeds defined for manual control
        moveBindings = {
            # key: [left_speed, right_speed] using signed values (-255 to 255)
            "w": [ MANUAL_SPEED,  MANUAL_SPEED],  # Forward
            "s": [-MANUAL_SPEED, -MANUAL_SPEED],  # Backward
            "a": [-MANUAL_SPEED,  MANUAL_SPEED],  # Turn Left (Rotate in place)
            "d": [ MANUAL_SPEED, -MANUAL_SPEED],  # Turn Right (Rotate in place)
            "q": [0, 0]                           # Stop
        }
        key = req.keyval.lower() # Make case-insensitive

        if key in moveBindings:
            speeds = moveBindings[key]
            rospy.loginfo(f"Manual Key Control: '{key}' -> speeds {speeds}")

            # If any movement key is pressed, ensure we are in MANUAL state
            if key != 'q':
                if self.state != STATE_MANUAL:
                    rospy.loginfo("Manual control taking over, setting state to MANUAL.")
                    self.set_state(STATE_MANUAL)
            # If 'q' (stop) is pressed while in MANUAL, stay in MANUAL but stop motors
            elif self.state == STATE_MANUAL:
                 rospy.loginfo("Manual stop command received.")
            # If 'q' is pressed while in AUTO, switch to STOP state
            elif self.state != STATE_STOP:
                 rospy.loginfo("Stop key pressed, switching from AUTO to STOP state.")
                 self.set_state(STATE_STOP) # set_state handles motor stop

            # Send motor command regardless (if 'q', speeds are [0,0])
            self.set_motors_i2c(speeds[0], speeds[1])
            return KeyControllResponse(success=True, message=f"Executed command: {key}")
        else:
            rospy.logwarn(f"Invalid key control value: {req.keyval}")
            return KeyControllResponse(success=False, message="Invalid key value")


    # --- Image Processing and Line Following ---
    def image_callback(self, msg):
        """Processes incoming images for line following and QR detection."""
        current_callback_time = time()
        # Basic check to prevent processing excessively faster than intended
        # Note: This relies on callback timing, which isn't perfectly reliable. Frame skipping below is better.
        # if current_callback_time - self.frame_processed_time < (1.0 / 30.0): # Limit to ~30fps processing
        #      return

        try:
            # Convert ROS Image message to OpenCV format
            cv_image = ros_numpy.numpify(msg)
            # Make frame available for QR decoding thread (lock if needed)
            with self._lock:
                self.frame = cv_image # Assign directly, QR loop copies
                # Note: If debug view draws on self.frame later, copy here:
                # self.frame = cv_image.copy()

        except (ros_numpy.registry.ROSInitException, TypeError) as e:
            # Catch specific errors during conversion, often seen during shutdown or malformed messages
            rospy.logwarn_throttle(5, f"ros_numpy conversion issue, skipping frame: {e}")
            return
        except Exception as e:
            rospy.logerr(f"Error converting image in image_callback: {e}", exc_info=True)
            return # Skip frame on conversion error

        # --- Frame Skipping for Line Following ---
        self.frame_count += 1
        if self.frame_count % FRAME_PROCESS_RATE != 0 and self.state != STATE_STOP:
            # Skip processing for line following unless stopped (to allow QR code update)
            # Or if debug view is enabled, process for display? Maybe not.
            return

        # --- Decide whether to process for line following ---
        # Only process line if in an autonomous movement state
        process_for_line = self.state in [STATE_DRIVE, STATE_LEFT, STATE_RIGHT]

        line_detected_this_frame = False
        debug_image = None # Only create if debug view is enabled

        if self.enable_debug_view:
            # Copy image for drawing if debug is enabled
            debug_image = cv_image.copy()

        # ROI calculation
        img_h, img_w = cv_image.shape[:2]
        if ROI_PERCENT:
            roi_y_start = int(img_h * ROI_PERCENT[0])
            roi_y_end = int(img_h * ROI_PERCENT[1])
            roi_x_start = int(img_w * ROI_PERCENT[2])
            roi_x_end = int(img_w * ROI_PERCENT[3])
            roi = cv_image[roi_y_start:roi_y_end, roi_x_start:roi_x_end]
            # Adjust center calculation for ROI
            center_x_roi = (roi_x_end - roi_x_start) // 2
            roi_offset_x = roi_x_start
            roi_offset_y = roi_y_start
            if self.enable_debug_view:
                 # Draw ROI box on the debug image
                 cv2.rectangle(debug_image, (roi_x_start, roi_y_start), (roi_x_end, roi_y_end), (255, 255, 0), 1)
        else:
            roi = cv_image
            center_x_roi = img_w // 2
            roi_offset_x = 0
            roi_offset_y = 0


        if process_for_line:
            try:
                # --- Line Detection (Process the ROI) ---
                # Apply Gaussian blur
                blurred = cv2.GaussianBlur(roi, (5, 5), 0)
                # Convert to HSV color space
                hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
                # Create a mask for the blue color
                mask = cv2.inRange(hsv, BLUE_LOWER, BLUE_UPPER)
                # Morphological operations (Tune kernel size and iterations)
                # Smaller kernel might be faster
                kernel = np.ones((3,3), np.uint8) # Smaller kernel
                mask = cv2.erode(mask, kernel, iterations=1)
                mask = cv2.dilate(mask, kernel, iterations=2) # Dilate more?

                # Find contours in the mask
                contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

                if contours:
                    # Filter small contours first (more efficient than just max)
                    valid_contours = [c for c in contours if cv2.contourArea(c) > MIN_CONTOUR_AREA]

                    if valid_contours:
                        # Find the largest valid contour
                        c = max(valid_contours, key=cv2.contourArea)
                        # Calculate moments to find centroid
                        M = cv2.moments(c)
                        if M["m00"] != 0:
                            # Centroid relative to ROI
                            cX_roi = int(M["m10"] / M["m00"])
                            cY_roi = int(M["m01"] / M["m00"])
                            # Centroid relative to full image (for drawing/debug)
                            cX_full = cX_roi + roi_offset_x
                            cY_full = cY_roi + roi_offset_y

                            line_detected_this_frame = True
                            self.last_line_detect_time = current_callback_time

                            # --- Line Following Decision Logic ---
                            error = center_x_roi - cX_roi # Error within ROI
                            if abs(error) < STEERING_THRESHOLD:
                                if self.state != STATE_DRIVE: self.set_state(STATE_DRIVE)
                                self.go_forward()
                            elif error > 0: # Line is to the left (cX_roi is smaller)
                                if self.state != STATE_LEFT: self.set_state(STATE_LEFT)
                                self.turn_left()
                            else: # Line is to the right (cX_roi is larger)
                                if self.state != STATE_RIGHT: self.set_state(STATE_RIGHT)
                                self.turn_right()

                            # --- Draw Debug Visuals (if enabled) ---
                            if self.enable_debug_view and debug_image is not None:
                                cv2.circle(debug_image, (cX_full, cY_full), 5, (0, 0, 255), -1) # Centroid (full img)
                                # Optional: Draw contour on full image
                                cv2.drawContours(debug_image, [c + (roi_offset_x, roi_offset_y)], -1, (0, 255, 0), 2)
                        # else: M["m00"] == 0, invalid moment

            except Exception as e:
                rospy.logerr(f"Error during line processing: {e}", exc_info=True)

        # --- Handle Line Lost (Outside line processing block) ---
        # If we are in an auto state AND line hasn't been detected recently
        if self.state in [STATE_DRIVE, STATE_LEFT, STATE_RIGHT] and not line_detected_this_frame:
             time_since_last_detect = current_callback_time - self.last_line_detect_time
             if time_since_last_detect > LINE_LOST_STOP_DELAY:
                 rospy.logwarn(f"Line lost for {time_since_last_detect:.2f}s! Stopping.")
                 self.set_state(STATE_STOP) # Change state to stop

        # --- Display Debug Window (if enabled) ---
        if self.enable_debug_view and debug_image is not None:
             try:
                 # Draw state and center line on debug image
                 cv2.line(debug_image, (img_w // 2, 0), (img_w // 2, img_h), (255, 0, 0), 1) # Center line (full img)
                 cv2.putText(debug_image, f"State: {self.get_state_name(self.state)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                 cv2.imshow("Line Following View", debug_image)
                 # cv2.imshow("Mask", mask) # Show mask if line processing happened
                 key = cv2.waitKey(1) & 0xFF
                 if key == ord('z'): # Exit
                     rospy.signal_shutdown("User pressed 'z' key")
                 elif key == ord('k'): # Toggle auto mode
                     if self.state == STATE_STOP:
                         rospy.loginfo("Debug key 'k': Enabling DRIVE")
                         self.auto_cb(String(data='on')) # Use the callback logic
                     else:
                         rospy.loginfo("Debug key 'k': Disabling AUTO (STOP)")
                         self.auto_cb(String(data='off')) # Use the callback logic
             except Exception as e:
                 rospy.logwarn(f"Error displaying debug view: {e}")


        # Update processed time
        self.frame_processed_time = current_callback_time


if __name__ == '__main__':
    rospy.init_node("coubot_driver", anonymous=False)
    try:
        # Set default param if not set
        if not rospy.has_param("~enable_debug_view"):
             rospy.set_param("~enable_debug_view", False) # Default to False for performance

        coubot_node = Coubot()
        rospy.loginfo("Coubot node spinning.")
        rospy.spin() # Handles callbacks

    except rospy.ROSInterruptException:
        rospy.loginfo("ROS interrupt received. Shutting down.")
    except Exception as e:
        rospy.logfatal(f"Unhandled exception in main: {e}", exc_info=True) # Log traceback
    finally:
        # Cleanup should be handled by the Coubot.cancel() via rospy.on_shutdown
        rospy.loginfo("Main loop finished or interrupted.")
