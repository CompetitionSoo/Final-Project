# 프로젝트 웹사이트

React와 Flask로 구축된 현대적인 웹 애플리케이션으로, 비디오 배경의 히어로 섹션과 반응형 디자인을 특징으로 합니다.

## 프로젝트 구조

```
project/
├── frontend/          # React 애플리케이션
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
└── backend/           # Flask 애플리케이션
    └── app/
        ├── routes/
        ├── models/
        └── ...
```

## 필수 요구사항

- Python 3.8 이상
- Node.js 14.0 이상
- npm 6.0 이상

## 설치 방법

### 백엔드 설정

1. Python 가상환경 생성 및 활성화:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Unix 또는 MacOS
   python -m venv venv
   source venv/bin/activate
   ```

2. Python 의존성 패키지 설치:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. backend 디렉토리에 `.env` 파일 생성 및 다음 내용 추가:
   ```
   SECRET_KEY='1234'
   DATABASE_URL=sqlite:///site.db
   FLASK_ENV=development
   FLASK_APP=run.py
   ```

### 프론트엔드 설정

1. Node.js 의존성 패키지 설치:
   ```bash
   cd frontend
   npm install
   ```

2. frontend 디렉토리에 `.env` 파일 생성 및 다음 내용 추가:
   ```
   SKIP_PREFLIGHT_CHECK=true
   DISABLE_ESLINT_PLUGIN=true
   ```

## 애플리케이션 실행

1. Flask 백엔드 서버 시작:
   ```bash
   # backend 디렉토리에서
   python run.py
   ```
   백엔드는 http://localhost:5000 에서 실행됩니다

2. 새 터미널에서 React 개발 서버 시작:
   ```bash
   # frontend 디렉토리에서
   npm start
   ```
   프론트엔드는 http://localhost:3000 에서 실행됩니다

## 개발

- 프론트엔드 코드는 `frontend/src` 디렉토리에서 수정 가능
- 백엔드 코드는 `backend/app` 디렉토리에서 수정 가능
- Flask 서버는 변경사항 발생 시 자동으로 재시작됨
- React 개발 서버는 핫 리로딩을 지원함

## API 엔드포인트

- `GET /api/test` - 테스트 엔드포인트
- `GET /api/products` - 제품 목록 조회
- `POST /api/contact` - 연락처 양식 제출
- `GET /video/<filename>` - 비디오 파일 제공

## 기여 방법

1. 저장소를 clone 합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/branch-name`)
3. 변경사항을 커밋합니다 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/branch-name`)
5. Pull Request를 생성합니다
