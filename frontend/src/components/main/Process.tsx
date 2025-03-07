import React from "react";

const Process: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">개발과정</h1>

      <div className="space-y-12">

        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
              <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
                <img src="" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2"> 
                <h2 className="text-2xl text-center font-semibold mb-2">아이디어 기획 및 목표 설정</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4"> 
                  <li>웹캠을 통해 사물을 인식하여 확인할 목록을 확인합니다.</li>
                  <li>학습 모델에 따라 웹캠이 인식하는 정확도를 확인합니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
              <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
                <img src="" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2"> 
                <h2 className="text-2xl text-center font-semibold mb-2">프론트엔드 및 백엔드 개발과정</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4"> 
                  <li>로그인화면을 구현합니다.</li>
                  <li>갤러리 화면을 구현합니다.</li>
                </ol>
              </div>
            </div>



        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
            <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
              <img src="/images/머신러닝학습_2.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
              <img src="/images/머신러닝학습_1.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2"> 
              <h2 className="text-2xl text-center font-semibold mb-2">머신러닝 및 딥러닝</h2>
              <ol className="list-decimal list-inside text-gray-600 space-y-2"> 
                <li>Yolov8n 모델으로 과일 과 채소를 학습 모델제작 </li>
                <li>CNN 모델으로 과일 과 채소를 학습 </li>
                <li>새로운 모델을 추가로 만들어서 기존에 과일과 야채의 신선도를 체크하는 모델을 학습시켰다. </li>
                <li>Yolov8n 모델으로 다양한 시도를 해보았고 그중 배치 사이즈 와 이미지 계수 및 라벨링에서 문제점을 발견하고 수정하는 부분이 미흡 </li>
                <li>CNN 모델으로 신선도를 학습시켰지만 너무 낮은 정확도로 인해 폐기 </li>
                <li>Yolov8s & Yolov8m, 기타 yolov10, yolov5 등 다양한 모델을 실험했고 컴퓨터 성능에 부족으로 인해 nano 버전을 사용한 대가로 정확도가 희생됨</li>
              </ol>
            </div>
          </div>



        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
            <img src="/images/웹페이지기능확인_1.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
            <img src="/images/웹페이지기능확인_2.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col space-y-6"> 
            <h2 className="text-2xl text-center font-semibold mb-2">웹페이지 기능 구현 확인</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-lg font-medium text-gray-700 mb-2">웹캠을 활용한 AI 사물 인식 테스트</p>
            <p className="text-gray-600 leading-relaxed">
              이 기능은 웹캠을 통해 사물을 인식하고, 선택한 학습 모델에 따라 인식 정확도를 검증하는 테스트 페이지입니다.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-2">기능 확인 절차</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2"> 
                <li>웹캠을 통해 사물을 인식하여 확인할 목록을 확인합니다.</li>
                <li>학습 모델에 따라 웹캠이 인식하는 정확도를 확인합니다.</li>
                <li>학습 모델(과일&채소, 신선도)을 변경할 때마다 객체의 정확도를 확인합니다.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
            <img src="/images/아두이노_1.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
            <img src="/images/아두이노_2.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2"> 
            <h2 className="text-2xl text-center font-semibold mb-2">Arduino AI 자율주행자동차</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4"> 
              <li>PyQT5 를 이용해 버튼을 활용해서 화면 밑에 배치를 해 보았다. </li>
              <li>화면의 배치를 처음에는 그리드를 배치하여 구현을 해보았는데 화면의 여백의 너비가 일정하게 배치는 되지만 어색하게
                배치가 되어 BOX형식으로 수정하였음</li>
              <li>자율주행기능을 활용하여 아두이노 자동차로봇이 검은색선을 따라 최종목적지에 도착하게 만들었다.</li>
              <li>Haar기능을 활용하여 얼굴을 인식하는 기능을 구현하였다.</li>
              <li>화면을 저장하는 기능을 구현하여 원하는 폴더를 생성하여 해당위치로 저장하게 구현하였다.</li>
            </ol>
          </div>
        </div>



        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
            <img src="/images/Ros_1.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
            <img src="/images/Ros_2.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2"> 
            <h2 className="text-2xl text-center font-semibold mb-2">ROS</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4"> 
              <li>ROS와 관제PC Topic과 Service 통신으로 Streaming합니다.</li>
              <li>특정 색상을 따라 라인자율주행을 합니다.</li>
              <li>웹 인터페이스에서 수동주행이 가능합니다.</li>
              <li>QR CODE를 보면 멈추고 인식합니다.</li>
              <li>캡처 이미지 저장하고 DB로 보냅니다. </li>
              <li>자율주행 중 사람보면 버저를 울립니다,</li>
            </ol>
          </div>
        </div>


      <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
            <img src="" alt="사진1" className="w-1/2 h-full object-cover" />
            <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2"> 
            <h2 className="text-2xl text-center font-semibold mb-2">아두이노 OR ROS 로봇 컨트롤</h2>
            <ol className="list-decimal list-inside text-gray-600 space-y-4">
              <li>아두이노 자동차 로봇을 사용하여 키보드 입력을 통해 동작과 학습 모델 적용을 확인합니다.</li>
              <li>쿠봇을 통해 (ROS) 연결 후 최종적으로 원하는 기능을 수행하는지 확인합니다.</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 border p-6 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 h-64 border rounded-lg overflow-hidden flex">
            <img src="" alt="사진준비중1" className="w-1/2 h-full object-cover" />
            <img src="" alt="사진준비중2" className="w-1/2 h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 text-left"> 
            <h2 className="text-2xl font-semibold mb-2">배포하기</h2>
            <p className="text-gray-600">쿠봇을 활용하여 다양한 환경에서 실험하고 최적의 로봇 동작을 확인합니다.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Process;


