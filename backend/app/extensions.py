'''
백엔드에서 전역으로 사용하는 객체,변수, 함수 등을 
여기에다 선언하고 필요할때마다 import하도록한다
'''
from flask import jsonify, request
from flask_mail import Mail
from functools import wraps
from decouple import config
import jwt
from flask_sqlalchemy import SQLAlchemy

mail=Mail()
db = SQLAlchemy()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        from app.models.user import User

        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "토큰이 없습니다."}), 401

        try:
            token = token.split(" ")[1]  # "Bearer <token>" 형태에서 토큰만 추출
            decoded = jwt.decode(token, config('SECRET_KEY'), algorithms=["HS256"])
            current_user = User.query.get(decoded["user_id"])
            if not current_user:
                return jsonify({"message": "사용자를 찾을 수 없습니다."}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "토큰이 만료되었습니다."}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "유효하지 않은 토큰입니다."}), 401

        return f(current_user, *args, **kwargs)

    return decorated