from flask import Blueprint, jsonify, request, send_from_directory
from flask import Flask, Response
from time import sleep
import cv2
import imutils
from flask_cors import CORS
from ultralytics import YOLO
import os

yolo_bp = Blueprint('yolo', __name__)

# app = Flask(__name__)
# cors = CORS(app, resources={r"/video_feed/*": {"origins": "*"}})

# YOLO 모델 경로 (절대 경로 사용)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "best.pt")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"YOLO 모델 파일을 찾을 수 없습니다: {MODEL_PATH}")

model = YOLO(MODEL_PATH)

capture = cv2.VideoCapture(0)  
sleep(2.0)

def generate():
    while True:
        ret, frame = capture.read()  
        frame = imutils.resize(frame, width=400)
        if ret :
            _, buffer = cv2.imencode('.jpg', frame) 

            # 영상처리 파트 

            frame = buffer.tobytes()  
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    

def generate_gray():
    while True:
        ret, frame = capture.read()  
        frame = imutils.resize(frame, width=400)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        if ret :
            _, buffer = cv2.imencode('.jpg', frame) 

            # 영상처리 파트 

            frame = buffer.tobytes()  
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

def generate_yolo():
    while True:
        ret, frame = capture.read()
        if not ret:
            break  

        frame = imutils.resize(frame, width=400)

        # YOLO 모델에 전달할 때 BGR 형식 그대로 사용
        results = model(frame)
        color = (0, 255, 0)
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = box.conf[0].item()  # 신뢰도
                cls = int(box.cls[0].item())  # 클래스 인덱스
                label = model.names[cls]  # 클래스 이름 가져오기

                # 신뢰도가 높은 경우에만 표시
                if conf > 0.5:
                    if label == "Rotten":
                        color = (0, 0, 255)
                    elif label == "Healthy":
                        color = (0, 255, 0)

                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                    cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
@yolo_bp.route('/video_feed')
def video_feed():
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

@yolo_bp.route('/video_gray')
def video_gray():
    return Response(generate_gray(), mimetype='multipart/x-mixed-replace; boundary=frame')

@yolo_bp.route('/video_yolo')
def video_yolo():
    return Response(generate_yolo(), mimetype='multipart/x-mixed-replace; boundary=frame')

#if __name__ == "__main__":
#    app.run(host="0.0.0.0", port="8001", debug=True)