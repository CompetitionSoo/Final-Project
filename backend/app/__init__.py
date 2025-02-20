from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from decouple import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    
    # Enable CORS
    CORS(app)
    
    # Configuration
    app.config['SECRET_KEY'] = config('SECRET_KEY', default='1234')
    app.config['SQLALCHEMY_DATABASE_URI'] = config('DATABASE_URL', default='sqlite:///site.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from .routes.main import main_bp
    from .routes.auth import auth_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    
    # Import models to ensure they're known to Flask-SQLAlchemy
    from .models import user
    
    # Create database tables
    with app.app_context():
        db.drop_all()       #백엔드 서버 킬때마다 데이터베이스 지우고 다시 만듬
        db.create_all()
    
    return app 