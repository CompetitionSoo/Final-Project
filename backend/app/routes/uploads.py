import os
from urllib.parse import urlparse
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from app.extensions import token_required, db
from decouple import config
import boto3

AWS_BUCKET_NAME = "coubot-images"
AWS_REGION = "us-east-1"
AWS_ACCESS_KEY = config('AWS_ACCESS_KEY')
AWS_SECRET_KEY = config('AWS_SECRET_KEY')

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION,
)

upload_bp = Blueprint("upload", __name__)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "mp4", "mov"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/api/upload", methods=["POST"])
@token_required
def upload_file(current_user):
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = f"profile/{secure_filename(file.filename)}"
        try:
            # S3에 파일 업로드
            s3.upload_fileobj(file, AWS_BUCKET_NAME, filename)

            # 업로드된 파일의 S3 URL
            file_url = f"https://{AWS_BUCKET_NAME}.s3.amazonaws.com/{filename}"

            current_user.profile_picture= file_url
            db.session.commit()

            return jsonify({"message": "File uploaded successfully", "file_url": file_url}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file type"}), 400

@upload_bp.route("/api/delete", methods=["POST"])
@token_required
def delete_profile(current_user):
    #프로필 사진을 DB와 파일 시스템에서 삭제      
    if not current_user.profile_picture:
        return jsonify({"message": "삭제할 프로필 사진이 없습니다."}), 400

    file_url = current_user.profile_picture  # 예: https://coubot-images.s3.amazonaws.com/profile/avatar2.jpg
   # URL에서 파일 키(파일 경로)만 추출
    parsed_url = urlparse(file_url) # "/profile/avatar2.jpg"
    file_key = parsed_url.path.lstrip("/")  # "profile/avatar2.jpg"
    print(f"file_url:{file_url}, file_key:{file_key}")
    try:
        # S3에서 파일 삭제 요청
        s3.delete_object(Bucket=AWS_BUCKET_NAME, Key=file_key)
        print(f"Deleted from S3: {file_key}")

        # DB 업데이트: profile_picture 필드 초기화
        current_user.profile_picture = None
        db.session.commit()

        return jsonify({"message": "File deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@upload_bp.route("/uploads/<path:filename>")
def uploaded_file(filename):
    print(current_app.config["UPLOAD_FOLDER"])
    return send_from_directory(os.path.abspath(current_app.config["UPLOAD_FOLDER"]), filename)

@upload_bp.route("/api/admingallery")
@token_required
def get_gallery_images(current_user):
    try:
        response = s3.list_objects_v2(Bucket=AWS_BUCKET_NAME, Prefix="admingallery/")
        if "Contents" not in response:
            return jsonify({"images": []})  # 버킷이 비어 있는 경우

        # S3 URL을 생성
        image_urls = [
            f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{obj['Key']}"
            for obj in response["Contents"]
            if not obj["Key"].endswith("/")  # 폴더(디렉터리) 제외
        ]

        return jsonify({"images": image_urls})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    