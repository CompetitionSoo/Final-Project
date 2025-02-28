from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
import jwt
from functools import wraps
from datetime import datetime, timedelta
from .. import db
from ..models.user import User
from decouple import config

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
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

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'ID already registered'}), 400
    #회원가입 데이터 추가
    user = User()
    user.name=data['name']
    user.username=data['username'] #비우면안됨
    user.email = data['email']
    user.phone=data['phone']
    user.set_password(data['password'])
    
    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    #ID로 로그인하게 수정
    user = User.query.filter_by(username=data['username']).first()        
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid id or password'}), 401
        
    # Generate JWT token
    token = jwt.encode(
        {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(days=1)
        },
        config('SECRET_KEY'),
        algorithm='HS256'
    )
    
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }), 200 

@auth_bp.route("/api/profile", methods=["GET"])
@token_required
def get_profile(current_user):
    return jsonify({
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "description": current_user.description
    })