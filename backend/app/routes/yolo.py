from flask import Blueprint, jsonify, request, Response
from time import sleep
import cv2
import imutils
from ultralytics import YOLO
import os
from urllib.request import urlopen
import numpy as np

yolo_bp = Blueprint('yolo', __name__)

# 기본 디렉토리 및 모델 파일 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "yolotraffic.pt")
BEST_MODEL_PATH    = os.path.join(BASE_DIR, "..", "models", "best.pt")
ROTTEN_MODEL_PATH  = os.path.join(BASE_DIR, "..", "models", "totten.pt")

for path in [DEFAULT_MODEL_PATH, BEST_MODEL_PATH, ROTTEN_MODEL_PATH]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"YOLO 모델 파일을 찾을 수 없습니다: {path}")

# 모델 미리 로드
default_model = YOLO(DEFAULT_MODEL_PATH)
best_model    = YOLO(BEST_MODEL_PATH)
rotten_model  = YOLO(ROTTEN_MODEL_PATH)

# 모델 선택 매핑
models = {
    "default": default_model,
    "fruits": best_model,
    "fresh": rotten_model
}

# 전역 변수: 현재 검출된 객체들 저장 (set)
detected_labels_global = set()

# 카메라 캡처 초기화
sleep(2.0)

def generate_yolo_dynamic(selected_model):
    global detected_labels_global
    frame_count = 0
    chosen_model = models.get(selected_model, default_model)
    url = "http://192.168.137.52:8080/stream?topic=/usb_cam/image_raw"
    
    
    # url = "http://192.168.137.238:8000/video_feed"
    stream = urlopen(url)
    buffer = b""
    while True:
        buffer += stream.read(4096)
        head = buffer.find(b'\xff\xd8')
        end = buffer.find(b'\xff\xd9')

        try: 
            if head > -1 and end > -1:
                jpg = buffer[head:end+2]
                buffer = buffer[end+2:]
                # frame = np.frombuffer(jpg, dtype=np.uint8)
                frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_UNCHANGED)

                # # 3프레임마다 검출
                if frame_count % 1 == 0:
                    detected_labels = set()  # 이번 프레임의 검출 객체 초기화
                    if selected_model == "default":
                        results = chosen_model.predict(source=frame, classes=[0, 1, 2, 3, 5, 7, 11])
                    elif selected_model == "totten":
                        results = chosen_model(frame)
                    else:
                        results = chosen_model(frame)
                    for result in results:
                        for box in result.boxes:
                            x1, y1, x2, y2 = map(int, box.xyxy[0])
                            conf = box.conf[0].item()
                            cls = int(box.cls[0].item())
                            label = chosen_model.names[cls]
                            if conf > 0.5:
                                percentage = str(int(100 * conf)) + '%'
                                detected_labels.add(label)
                                
                                # 기본 색상 설정 (초록색)
                                box_color = (0, 255, 0)
                                
                                # totten 모델을 사용하고 있을 때 cls에 따라 색상 변경
                                if selected_model == "fresh":
                                    if cls == 0:  # fresh 클래스
                                        box_color = (0, 255, 0)  # 초록색
                                    elif cls == 1:  # rotten 클래스
                                        box_color = (0, 0, 255)  # 빨간색 (BGR 형식에서 빨간색)
                                
                                cv2.rectangle(frame, (x1, y1), (x2, y2), box_color, 3)
                                cv2.putText(frame, f"{label} {percentage}", (x1, y1 - 10),
                                            cv2.FONT_HERSHEY_SIMPLEX, 1, box_color, 3)
                    # 검출된 객체를 전역 변수에 업데이트
                    detected_labels_global = detected_labels
                # 매 프레임마다 카운터 증가
                frame_count += 1

                _, buffer = cv2.imencode('.jpg', frame)
                
                frame = buffer.tobytes()
                
                buffer = b""
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        except Exception as e: 
            # print("Exception:", e)
            pass

def generate():
    url = "http://192.168.137.52:8080/stream?topic=/usb_cam/image_raw"
    # url = "http://192.168.137.238:8000/video_feed"
    stream = urlopen(url)
    buffer = b""
    while True:
        buffer += stream.read(4096)
        head = buffer.find(b'\xff\xd8')
        end = buffer.find(b'\xff\xd9')

        try: 
            if head > -1 and end > -1:
                jpg = buffer[head:end+2]
                buffer = buffer[end+2:]
                frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_UNCHANGED)

                _, buffer = cv2.imencode('.jpg', frame)
                
                frame = buffer.tobytes()
                
                buffer = b""
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        except Exception as e: 
            pass


@yolo_bp.route('/video_feed')
def video_feed():
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')


@yolo_bp.route('/video_yolo_dynamic')
def video_yolo_dynamic():
    selected = request.args.get('model', 'default')  # 기본값은 'default'
    return Response(generate_yolo_dynamic(selected), mimetype='multipart/x-mixed-replace; boundary=frame')

# 새 엔드포인트: 현재 검출된 객체 목록을 JSON으로 반환
@yolo_bp.route('/detected_objects')
def detected_objects():
    global detected_labels_global
    detected_list = list(detected_labels_global)
    return jsonify({"detected": detected_list})

