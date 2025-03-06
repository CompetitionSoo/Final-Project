from flask import Blueprint, jsonify, request, send_from_directory
from app.extensions import mail
from flask_mail import Message

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
        contact = data.get('contact')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, contact, email, subject, message]):
            return jsonify({"error": "모든 필드를 입력해주세요."}), 400

        # 이메일 전송
        msg = Message(subject=f"문의사항: {subject}",
                    sender=email,
                    recipients=['fpteam1234@gmail.com'])
        msg.body = f"""
        이름: {name}
        연락처: {contact}
        이메일: {email}
        
        내용:
        {message}
        """
        mail.send(msg)

        return jsonify({"message": "문의가 성공적으로 접수되었습니다."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/api/contact2', methods=['POST'])
def contact2():
    try:
        data = request.json
        subject = data.get('subject')
        message = data.get('message')

        if not all([subject, message]):
            return jsonify({"error": "모든 필드를 입력해주세요."}), 400

        # 이메일 전송
        msg = Message(subject=f"문의사항: {subject}",
                        recipients=['fpteam1234@gmail.com'])
        msg.body = f"""
        내용:
        {message}
        """
        mail.send(msg)

        return jsonify({"message": "문의가 성공적으로 접수되었습니다."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main_bp.route('/api/products')
def get_products():
    # TODO: Implement products API
    return jsonify({'products': []}), 200

@main_bp.route('/video/<path:filename>')
def serve_video(filename):
    return send_from_directory('../frontend/public/videos', filename) 

