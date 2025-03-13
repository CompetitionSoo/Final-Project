from flask import Blueprint, jsonify, request, send_from_directory, Response
from time import sleep
import cv2
import imutils
from flask_cors import CORS
from ultralytics import YOLO
import os

yolo_bp = Blueprint('yolo', __name__)

# 기본 디렉토리 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 모델 파일 경로 설정
DEFAULT_MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "yolotraffic.pt")
BEST_MODEL_PATH    = os.path.join(BASE_DIR, "..", "models", "best.pt")
ROTTEN_MODEL_PATH  = os.path.join(BASE_DIR, "..", "models", "totten.pt")

# 파일 존재 여부 확인
for path in [DEFAULT_MODEL_PATH, BEST_MODEL_PATH, ROTTEN_MODEL_PATH]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"YOLO 모델 파일을 찾을 수 없습니다: {path}")

# 모델 미리 로드
default_model = YOLO(DEFAULT_MODEL_PATH)
best_model    = YOLO(BEST_MODEL_PATH)
rotten_model  = YOLO(ROTTEN_MODEL_PATH)

# 프론트엔드 선택 값에 따른 모델 매핑
# "fruits" -> best.pt, "fresh" -> rotten.pt, 그 외엔 기본 모델 사용
models = {
    "default": default_model,
    "fruits": best_model,
    "fresh": rotten_model
}

# 카메라 캡처 초기화
capture = cv2.VideoCapture(0)
sleep(2.0)

def generate():
    while True:
        ret, frame = capture.read()  
        frame = imutils.resize(frame, width=400)
        if ret:
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

def generate_yolo_dynamic(selected_model):
    # 선택된 모델이 없으면 기본 모델 사용
    chosen_model = models.get(selected_model, default_model)
    while True:
        ret, frame = capture.read()
        if not ret:
            break
        frame = imutils.resize(frame, width=400)
        # default일 경우에만 predict 메서드와 클래스 제한을 사용
        if selected_model == "default":
            results = chosen_model.predict(source=frame, classes=[0, 1, 2, 3, 5, 7, 11])
        else:
            results = chosen_model(frame)
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = box.conf[0].item()
                cls = int(box.cls[0].item())
                label = chosen_model.names[cls]
                if conf > 0.5:
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# 동적 스트림 엔드포인트: 프론트엔드에서 URL 쿼리 파라미터 'model'로 전달됨.
@yolo_bp.route('/video_yolo_dynamic')
def video_yolo_dynamic():
    selected = request.args.get('model', 'default')  # 기본값은 'default'
    return Response(generate_yolo_dynamic(selected), mimetype='multipart/x-mixed-replace; boundary=frame')
