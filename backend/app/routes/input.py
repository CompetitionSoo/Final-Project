import sys
import os
from datetime import datetime, timedelta
import random

# 프로젝트 루트 경로를 sys.path에 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app import create_app
from app.extensions import db
from app.models.user import Inventory  # Inventory 모델이 있는 경로

# Flask 앱 생성
app = create_app()

# 애플리케이션 컨텍스트 활성화
with app.app_context():
    # 더미 데이터 생성
    inventory_data = {
        "A": {"아몬드": 95, "사과": 68, "아스파라거스": 37, "아보카도": 47},
        "B": {"바나나": 45, "블루베리": 17, "브로콜리": 25},
        "C": {"당근": 93, "콜리플라워": 59, "체리": 91, "샐러리": 38},
        "D": {"마늘": 5, "딸기": 95, "생강": 15, "토마토": 68}
    }

    generated_data = []
    current_time = datetime.utcnow()

    for _ in range(50):
        bot_id = random.randint(1, 10)
        section = random.choice(list(inventory_data.keys()))
        item = random.choice(list(inventory_data[section].keys()))

        # 해당 물품 개수 +1 증가
        inventory_data[section][item] += 1

        # 시간 증가 (이전보다 최소 30초 ~ 최대 3분 증가)
        increment_seconds = random.randint(30, 180)
        current_time += timedelta(seconds=increment_seconds)

        # Inventory 모델 객체 생성 후 DB에 추가
        new_entry = Inventory(
            bot_id=bot_id,
            item=item,
            location=section,
            list=str(inventory_data[section]),
            created_at=current_time
        )
        db.session.add(new_entry)
        generated_data.append(new_entry)

    # DB에 저장
    db.session.commit()
    print("데이터 50개가 성공적으로 추가되었습니다!")