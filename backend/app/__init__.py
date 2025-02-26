from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from decouple import config
from flask_migrate import Migrate
from flask_mail import Message
from app.extensions import mail

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    
    # Enable CORS
    CORS(app)

    
    # Configuration
    app.config['SECRET_KEY'] = config('SECRET_KEY', default='1234')
    app.config['SQLALCHEMY_DATABASE_URI'] = config('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['MAIL_SERVER'] = config('MAIL_SERVER')  # SMTP 서버
    app.config['MAIL_PORT'] = config('MAIL_PORT')  # 포트번호
    app.config['MAIL_USE_TLS'] = config('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = config('MAIL_USERNAME')  # 이메일 계정
    app.config['MAIL_PASSWORD'] = config('MAIL_PASSWORD')  # 앱 비밀번호 또는 이메일 비밀번호
    app.config['MAIL_DEFAULT_SENDER'] = config('MAIL_DEFAULT_SENDER')
    
    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    mail.init_app(app)
        
    # Register blueprints
    from .routes.main import main_bp
    from .routes.auth import auth_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    
    # Import models to ensure they're known to Flask-SQLAlchemy
    from .models import user
    
    return app 