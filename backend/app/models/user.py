from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    profile_picture= db.Column(db.String(256), nullable=True)
        
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name' : self.name,
            'username' : self.username,
            'email': self.email,
            'phone' : self.phone,
            'descrption' : self.description,
            'profile_picture' : self.profile_picture
        }

# 재고조회 테이블
class Inventory(db.Model):
    __tablename__ = 'inventory'
    
    id = db.Column(db.Integer, primary_key=True)
    bot_id = db.Column(db.Integer, nullable=False)
    item = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    list = db.Column(db.JSON, nullable=True)  # JSON 형식으로 저장 가능
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 갤러리 (관리자) 테이블
class GalleryAdmin(db.Model):
    __tablename__ = 'gallery_admin'
    
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(256), nullable=False)
    username = db.Column(db.String(120), db.ForeignKey('users.username'), nullable=False)  # users 테이블과 연결
    tag = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('gallery_admins', lazy=True))

# 갤러리 (홈) 테이블
class GalleryHome(db.Model):
    __tablename__ = 'gallery_home'
    
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(256), nullable=False)
    contents = db.Column(db.Text, nullable=True)
    comment = db.Column(db.JSON, nullable=True)  # JSON으로 댓글 저장 가능
    like = db.Column(db.Integer, default=0)  # 좋아요 수
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 문의 테이블
class Inquiry(db.Model):
    __tablename__ = 'inquiry'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)