import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from app.extensions import token_required, db

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
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

        # 업로드 폴더가 없으면 생성
        os.makedirs(current_app.config["UPLOAD_FOLDER"], exist_ok=True)
        # 파일 서버에 저장
        file.save(filepath)
        # DB에 이미지파일 경로 저장
        current_user.profile_picture=f"/uploads/{filename}"
        db.session.commit()

        return jsonify({"message": "File uploaded successfully", "file_url": current_user.profile_picture}), 200

    return jsonify({"error": "Invalid file type"}), 400

@upload_bp.route("/uploads/<path:filename>")
def uploaded_file(filename):
    print(current_app.config["UPLOAD_FOLDER"])
    return send_from_directory(os.path.abspath(current_app.config["UPLOAD_FOLDER"]), filename)

@upload_bp.route("/api/upload/delete", methods=["POST"])
@token_required
def delete_profile(current_user):
    #프로필 사진을 DB와 파일 시스템에서 삭제      
    if not current_user.profile_picture:
        return jsonify({"message": "삭제할 프로필 사진이 없습니다."}), 400

    # 절대 경로로 변환
    file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], os.path.basename(current_user.profile_picture))

    print(file_path)
    # 파일이 존재하면 삭제
    if os.path.exists(file_path):
        os.remove(file_path)

    current_user.profile_picture= None
    db.session.commit()

    # 파일 경로를 반환 (DB에 저장 가능)
    return jsonify({"message": "File deleted successfully"}), 200
