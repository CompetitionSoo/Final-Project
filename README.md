# 프로젝트 웹사이트

React와 Flask로 구축된 현대적인 웹 애플리케이션으로, 비디오 배경의 히어로 섹션과 반응형 디자인을 특징으로 합니다.


## 프로젝트 구조

```
project/
├── frontend/          # React 애플리케이션
│   └── src/
│       ├── components/
│       ├── services/
│       └── ...
│   └── public/        # 이미지,비디오 등 파일 저장공간
└── backend/           # Flask 애플리케이션
    └── app/
        ├── routes/
        ├── models/
        └── ...
    └── uploads/       # 백엔드 데이터 업로드
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
   *********************************************
    
    
    https://naver.me/xMjVb6QL Mybox에 올라가있음

    backend.env 받아서 backend 지우고 사용


   *********************************************
    
   ```
   
### 프론트엔드 설정

1. Node.js 의존성 패키지 설치:
   ```bash
   cd frontend
   npm install
   ```

## ROS에서 터미널 실행 방법
```bash
# 1. 노드간 연결하는 기초 명령어
roscore

# 2. 다른 웹 서버와 9090포트로 연결
roslaunch rosbridge_server rosbridge_websocket.launch

# 3. 카메라 활성화
roslaunch jetbot_ros opencv_apps.launch

# 4. usb 카메라 활성화 (usb 카메라 사용시에만)
roslaunch usb_cam usb_cam-test.launch

# 5. 실시간 영상 서버
rosrun web_video_server web_video_server

# 6. 코드 실행
rosrun jetbot_ros coubot.py
```

## 애플리케이션 실행

1. 새 터미널에서 React 개발 서버 시작:
   ```bash
   # frontend 디렉토리에서
   npm start
   ```
   프론트엔드는 http://localhost:3000 에서 실행됩니다

2. Flask 백엔드 서버 시작:
   ```bash
   # backend 디렉토리에서
   python run.py
   ```
   백엔드는 http://localhost:5000 에서 실행됩니다



## 개발

- 프론트엔드 코드는 `frontend/src` 디렉토리에서 수정 가능
- 백엔드 코드는 `backend/app` 디렉토리에서 수정 가능
- Flask 서버는 변경사항 발생 시 자동으로 재시작됨
- React 개발 서버는 핫 리로딩을 지원함

## 백엔드-프론트엔드 데이터 통신방식 
- 프론트엔드에서 async함수를 통해 백엔드에 요청하고 Promise형태의 데이터를 반환받습니다. 
- fetch를 통해 해당 백엔드의 엔드포인트에서 데이터를 전달받습니다.
- method에는 POST,GET 어떤 방식으로 데이터를 전해주는지,
  headers에는 전달하는 데이터의 유형을 정의하는데 일반적으로 application/json을 주고받습니다. 이미지의 경우 multipart/form-data 형식으로 보내야 합니다.
  body안에는 백엔드에 보낼 데이터(함수인자,이미지...등)를 입력합니다.
- response를 통해 백엔드에서 데이터를 전달받고 데이터를 처리하는 부분을 구현합니다.

## 현재 로그인 인증 과정 설명
- 프론트엔드에서는 services/auth.ts, 백엔드에서는 routes/auth.py에 로그인함수가 작성되어있음
- auth.ts에서는 fetch에서 username(아이디)와 password를 인자로 요청을 보내고, 백엔드에서 LoginResponse로 정의된 데이터를 반환함
- response 안에 token으로 정의된 데이터를 로컬스토리지에 저장하고 이 토큰(JWT:JSON Web Token)을 통해서 인증기능을 구현하게됨
- 현재 Profile에만 인증이 유효한지 검증하게 되어있고 auth.ts의 isAuthenticated함수는 토큰이 있나 없나만 검사하여 실제 인증기능을 구현하고 있지는 않음
- fetchProfile을 보면 프로필을 가져올때 백엔드에 요청할때 토큰을 전달하고, 백엔드에서는 token_required 데코레이터를 통해 토큰 유효성 검증을 진행하고 이를 통과하면 Profile 데이터를 반환하게 되어있음
- 현재 토큰은 user_id(데이터베이스 기본저장되는 숫자,Primary Key), email, 만료시간으로 인코딩하고 있고, token_required에서는 디코딩을 한후, 만료시간이 지났나 안지났나 검증을 하게됨
- 인증기능이 필요하게 되면 fetch요청을 할 때 token을 포함해서 요청을 보내고, 해당 엔드포인트 수행할 때 token_required데코레이터를 적용하면 됨.
- 전체적으로 인증기능을 구현해야할 부분을 가려서 백엔드 코드 수정할 예정.

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
