from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
import jwt
from datetime import datetime, timedelta
from .. import db
from ..models.user import User
from decouple import config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    user = User()
    user.username=data['username'] #비우면안됨
    user.email = data['email']
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
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    #email로 쿼리 검색해야해서 id가아닌 email로 로그인해야함
    user = User.query.filter_by(email=data['email']).first()        
    
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