from flask import Blueprint, jsonify, request, send_from_directory
from app.extensions import mail
from flask_mail import Message
from datetime import datetime
from .. import db
from ..models.user import Inquiry, Inventory
import json
import ast

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/test')
def test():
    return jsonify({'message': 'Backend is working!'}), 200

@main_bp.route('/')
def serve():
    return jsonify({'message': 'Welcome to Coubot API'}), 200
    ### return send_from_directory('../frontend/build', 'index.html') once react app is built

@main_bp.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        created_at= datetime.utcnow()

        if not all([name, phone, email, subject, message]):
            return jsonify({"error": "모든 필드를 입력해주세요."}), 400


        new_inquiry = Inquiry(
            subject=subject,
            message=message,
            name=name,
            phone=phone,
            email=email,
            created_at=created_at
        )
        db.session.add(new_inquiry)
        db.session.commit()


        # 이메일 전송
        msg = Message(subject=f"문의사항: {subject}",
                    sender=email,
                    recipients=['fpteam1234@gmail.com'])
        msg.body = f"""
        이름: {name}
        연락처: {phone}
        이메일: {email}
        
        내용:
        {message}
        """
        mail.send(msg)

        return jsonify({"message": "문의가 성공적으로 접수되었습니다."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main_bp.route('/video/<path:filename>')
def serve_video(filename):
    return send_from_directory('../frontend/public/videos', filename) 

@main_bp.route('/api/inventory', methods=['GET'])
def get_inventory():
    try:
        inventory_data = Inventory.query.order_by(Inventory.created_at).all()
        
        # 변환된 데이터 리스트
        formatted_data = []
        for item in inventory_data:
            # 🔹 item.list가 문자열이면 변환
            if isinstance(item.list, str):
                try:
                    stock_dict = json.loads(item.list)  # JSON 변환 시도
                except json.JSONDecodeError:
                    stock_dict = ast.literal_eval(item.list)  # Python 딕셔너리 문자열 변환
            else:
                stock_dict = item.list
            
            # 🔹 재고 현황 문자열 생성
            stock_list = ", ".join([f"{key}-{value}개" for key, value in stock_dict.items()])
            formatted_data.append({
                "No.": item.id,
                "로봇ID": f"BOT-{item.bot_id}",
                "탐지항목": item.item,
                "위치": f"{item.location}구역",
                "재고현황": stock_list,  
                "시간": item.created_at.strftime("%Y/%m/%d %H시%M분%S초")  # 시간 포맷 변환
            })
  
        
        return jsonify(formatted_data), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
