from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from urllib.request import urlopen
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # React와 CORS 문제 해결

IP = "192.168.137.220"  # 아두이노 자동차의 IP
STREAM_URL = f"http://{IP}:81/stream"  # ESP32 CAM의 영상 스트리밍 URL

# 자동차 이동 컨트롤 API
@app.route('/move', methods=['POST'])
def move():
    data = request.json
    direction = data.get("direction", "")

    if direction in ["forward", "backward", "left", "right", "turn_left", "turn_right", "stop"]:
        url = f"http://{IP}/action?go={direction}"
        urlopen(url)
        return jsonify({"status": "success", "message": f"Moved {direction}"})
    
    return jsonify({"status": "error", "message": "Invalid direction"})

# 속도 변경 API
@app.route('/speed', methods=['POST'])
def speed():
    data = request.json
    speed = data.get("speed", "")

    if speed in ["speed40", "speed50", "speed60", "speed80", "speed100"]:
        url = f"http://{IP}/action?go={speed}"
        urlopen(url)
        return jsonify({"status": "success", "message": f"Speed set to {speed}"})

    return jsonify({"status": "error", "message": "Invalid speed"})

# 자율주행 모드 API
@app.route('/autodrive', methods=['POST'])
def autodrive():
    data = request.json
    auto_mode = data.get("auto_mode", False)

    if auto_mode:
        urlopen(f"http://{IP}/action?go=auto_on")  # 자율주행 ON
    else:
        urlopen(f"http://{IP}/action?go=stop")  # 정지 (수동모드)

    return jsonify({"status": "success", "message": f"Auto mode {'enabled' if auto_mode else 'disabled'}"})

# 실시간 영상 스트리밍 API
def generate_frames():
    stream = urlopen(STREAM_URL)
    buffer = b""

    while True:
        buffer += stream.read(4096)
        start = buffer.find(b'\xff\xd8')  # JPEG 시작
        end = buffer.find(b'\xff\xd9')    # JPEG 끝

        if start > -1 and end > -1:
            jpg = buffer[start:end+2]
            buffer = buffer[end+2:]

            frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_UNCHANGED)
            _, encoded_frame = cv2.imencode('.jpg', frame)

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + encoded_frame.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# 서버 실행
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
