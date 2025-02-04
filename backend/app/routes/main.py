from flask import Blueprint, jsonify, request, send_from_directory
import os

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/test')
def test():
    return jsonify({'message': 'Backend is working!'}), 200

@main_bp.route('/')
def serve():
    return jsonify({'message': 'Welcome to Yujin Robot API'}), 200
    ### return send_from_directory('../frontend/build', 'index.html') once react app is built

@main_bp.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    # TODO: Implement contact form logic
    return jsonify({'message': 'Message received successfully'}), 200

@main_bp.route('/api/products')
def get_products():
    # TODO: Implement products API
    return jsonify({'products': []}), 200

@main_bp.route('/video/<path:filename>')
def serve_video(filename):
    return send_from_directory('../frontend/public/videos', filename) 

