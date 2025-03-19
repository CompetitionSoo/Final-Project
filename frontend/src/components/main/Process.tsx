import React, { useEffect, useRef, useState } from 'react';
import { initFullpage } from './fullpageInit'; // JS 초기화 모듈
import 'fullpage.js/dist/fullpage.css'; // fullpage.js CSS 추가
import './FullpagePage.css'; // 사용자 정의 스타일

const FullpagePage: React.FC = () => {
  const fullpageRef = useRef<HTMLDivElement>(null);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
 

  

  useEffect(() => {
    let fpInstance: any;
    if (fullpageRef.current) {
      fpInstance = initFullpage(fullpageRef.current);
    }
    return () => {
      if (fpInstance && typeof fpInstance.destroy === 'function') {
        fpInstance.destroy('all');
      }
    };
  }, []);

  const closeVideo = () => setSelectedVideo(null);

  const videoURLs = {
    frontend: `${process.env.PUBLIC_URL}/videos/login.mp4`,
    web: `${process.env.PUBLIC_URL}/videos/web.mp4`,
    arduino: `${process.env.PUBLIC_URL}/videos/arduino.mp4`,
    ros: `${process.env.PUBLIC_URL}/videos/ros.mp4`,
    robotControl: `${process.env.PUBLIC_URL}/videos/robotControl.mp4`,
    deployment: `${process.env.PUBLIC_URL}/videos/deployment.mp4`,
  };

  return (
    <div ref={fullpageRef} className="fullpage-container">
      <div
  className="section section0"
  style={{
    backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.9) 100%, #020202),
      url(${process.env.PUBLIC_URL}/images/12.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
      padding: '100px 0', // 배경이 잘 보이도록 여백을 추가
  }}
>
  <div className=" pl-20 px-2 py-3 text-left w-screen text-white" >
    <h1 className="text-6xl font-bold mb-16  text-left">Project COUBOT</h1>
    <a
      href="#readmore"
      className="bg-blue-600 text-white py-2 px-6 rounded-full text-2xl font-semibold text-left hover:bg-blue-700 transition duration-300"
      style={{ textDecoration: 'none' }}
    >
      자세히 보기
    </a>
  </div>
</div>
        
          
      <div className="section section1">
        <div className="container mx-auto px-4 py-10" id="readmore"></div>
        <h1 className="text-4xl font-bold text-center mb-8">개발과정</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-2 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 pt-5 pb-10 "> 아이디어 기획 및 목표 설정</h2>
          </div>
  
            <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 "  
                  onClick={() => setSelectedVideo(videoURLs.frontend)} style={{ cursor: 'pointer' }} >
            <img src="/images/idea.png" alt="사진1" className="w-full h-[370px] max-w-full" />
            </div>

            <div className="md:col-span-1 h-full flex flex-col justify-between pr-20">
              <ol className="list-decimal list-inside text-gray-600 bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
                <div className="bg-white p-4 rounded-lg shadow text-left text-2xl space-y-10">
                  <li>MySQL 서버와 연동하여 사용자 접근성을 높이고, Yolo객체 <br/>&nbsp; 검출을 활용한 실시간 데이터 확인 및 장애물 탐지 시스템 구축</li>
                  <li>ROS에 장착된 웹캠을 활용하여 화면 캡처 및 객체 검출수행</li>
                  <li>검출된 객체에 Yolo 학습모델을 적용하여 객체 목록확인</li>
                  <li>QR코드인식, OpenCY-YOLO 기반 장애물 탐지,<br/>&nbsp;&nbsp;&nbsp; AI모델링 및 데이터 분석</li>
                </div>
              </ol>
            </div>
        </div>
      </div>
      
      
      <div className="section section2">
        
        {/* 프론트엔드 및 백엔드 개발과정 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-2 text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 pt-10">  프론트엔드 및 백엔드 개발과정</h2>
          </div>

        <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 "  
          onClick={() => setSelectedVideo(videoURLs.frontend)} style={{ cursor: 'pointer' }} >
          <img src="/images/로그인화면.jpg" alt="사진1" className="w-1/2 h-[370px] max-w-full"/>
          <img src="/images/회원가입화면.jpg" alt="사진2" className="w-1/2 h-[370px] max-w-full"/>
        </div>

          <div className="md:col-span-1 h-full flex flex-col justify-between pr-20">
            <ol className="list-decimal list-inside text-gray-600 bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
              <div className="bg-white p-4 rounded-lg shadow text-left text-2xl space-y-8">
                <li>로그인 & 회원가입 화면을 구현합니다.</li>
                <li>회원가입 시 입력한 정보는 MySQL 데이터베이스(DB)에 <br/>&nbsp;&nbsp; 저장되며, 해당 정보를 이용해 로그인할 수 있습니다.</li>
                <li>일반 사용자는 관리자 대시보드에 접근할 수 없으므로, <br/>&nbsp;&nbsp; 먼저 회원가입을 진행해야 합니다.</li>
                <li>로그인하면 사용자 대시보드로 이동하며, 이후 쿠봇을 조종할<br/>&nbsp;&nbsp; 수 있는 컨트롤러 화면에 접속할 수 있습니다.</li>
              </div>
            </ol>
          </div>
        </div>
        </div>



      <div className="section section3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-2 text-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800 pt-10">  머신러닝 및 딥러닝</h2>
          </div>

        <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 " >
            <img src="/images/머신러닝학습_2.jpg" alt="사진1" className="w-1/2 h-[565px] max-w-full" />
            <img src="/images/머신러닝학습_1.jpg" alt="사진2" className="w-1/2 h-[565px] max-w-full" />
        </div>

          <div className="md:col-span-1 h-full flex flex-col justify-between pr-20">
            <ol className="list-decimal list-inside text-gray-600  bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
              <div className="bg-white p-4 rounded-lg shadow text-left text-xl space-y-12">
                <li> 과일과 채소를 인식하는 학습 모델을 제작.</li>
                <li> CNN 모델을 사용해 과일과 채소를 학습시켰습니다.</li>
                <li> 추가적으로, 새로운 모델을 개발하여 기존 모델과 함께 과일과 야채의 신선도를 체크하는 기능을 학습시켰습니다.</li>
                <li> Yolov8n 모델을 다양한 방식으로 실험하는 과정에서 배치; 사이즈, 이미지 크기 조정 및 라벨링 과정에서 일부 문제점을 &nbsp;&nbsp;&nbsp;발견하였으나, 수정이 미흡한 부분이 있었습니다.</li>
                <li> CNN 모델을 활용해 신선도 판별을 시도했으나, 정확도가 낮아 결국 폐기</li>
                <li> Yolov8s, Yolov8m뿐만 아니라 Yolov10, Yolov5 등 다양한 모델을 실험하였으나, 컴퓨터 성능이 부족하여 최적화된 nano 버전을사용해야 했습니다. 그 결과 속도는 개선되었지만 정확도가 다소 희생되었습니다.</li>
              </div>
            </ol>
          </div>
        </div>
      </div>





      <div className="section section4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-2 text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 pt-10">  웹페이지 기능 구현 확인</h2>
            </div>
              
              <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 " >
                  <img src="/images/웹페이지기능확인_1.jpg" alt="사진1" className="w-1/2 max-w-full max-h-full object-cover" />
                  <img src="/images/웹페이지기능확인_2.jpg" alt="사진2" className="w-1/2 h-70 object-cover" />
              </div>

            <div className="md:col-span-1 h-full flex flex-col justify-between pr-20 ">
              <ol className="list-decimal list-inside text-gray-600  bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-lg font-bold text-gray-700  text-2xl mb-2">웹캠을 활용한 AI 사물 인식 테스트</p>
                    <p className="text-left leading-relaxed text-xl" >이 기능은 웹캠을 통해 사물을 인식하고, 선택한 학습 모델에 따라 인식 정확도를 <br/>검증하는 테스트 페이지입니다.</p>
                  </div>
                  
                  <div className="bg-white p-2 pt-3 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-gray-700 mb-5  text-left">기능 확인 절차</h3>
                    <ol className="list-decimal list-inside text-gray-600 text-xl text-left space-y-2">
                      <li>웹캠을 통해 사물을 인식하여 확인할 목록을 확인합니다.</li>
                      <li>학습 모델에 따라 웹캠이 인식하는 정확도를 확인합니다.</li>
                      <li>학습 모델(과일 & 채소, 신선도)을 변경할 때마다 객체의 정확도를 확인합니다.</li>
                    </ol>
                  </div>
              </ol>
            </div>
        </div>
      </div>





      
      <div className="section section5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-2 text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 pt-10">  Arduino AI 자율주행자동차</h2>
            </div>
              
              <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 " >
                  <img src="/images/아두이노_1.jpg" alt="사진1" className="w-1/2 h-[370px] max-w-full" />
                  <img src="/images/아두이노_2.jpg" alt="사진2" className="w-1/2 h-[370px] max-w-full" />
              </div>

            <div className="md:col-span-1 h-full flex flex-col justify-between pr-20">
              <ol className="list-decimal list-inside text-gray-600  bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ol className="list-decimal list-inside text-gray-600 space-y-6 text-left text-xl">
                      <li> PyQt5를 활용하여 버튼을 화면 하단에 배치하도록 구현.</li>
                      <li> 초기에는 그리드 레이아웃을 사용하여 화면을 배치하였으나, 여백의 너비가 <br/>&nbsp;&nbsp; 일정하게 유지되었음에도 불구하고 어색한 배치가 발생하여 BOX 형식으로 수정.</li>
                      <li> 자율주행 기능을 적용하여 아두이노 자동차 로봇이 검은색선을 따라 최종 <br/>&nbsp;&nbsp; 목적지까지 도달하도록 설계하였습니다.</li>
                      <li> Haar Cascade 기능을 활용하여 얼굴 인식 기능을 구현.</li>
                      <li >화면 저장 기능을 추가하여, 사용자가 원하는 폴더를 생성하고 해당 위치에 <br/>&nbsp;&nbsp; 이미지를 저장할 수 있도록 개발.</li>
                    </ol>
                  </div>
              </ol>
            </div>
        </div>
      </div>



            
      <div className="section section6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-2 text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 pt-10">ROS</h2>
            </div>
              
              <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 " 
                    onClick={() => setSelectedVideo(videoURLs.frontend)} style={{ cursor: 'pointer' }} >
              
                  <img src="/images/Ros_1.jpg" alt="사진1" className="w-1/2 h-[370px] max-w-full" />
                  <img src="/images/Ros_2.jpg" alt="사진2" className="w-1/2 h-[370px] max-w-full" />
              </div>

            <div className="md:col-span-1 h-full flex flex-col justify-between  pr-20">
              <ol className="list-decimal list-inside text-gray-600  bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ol className="list-decimal list-inside text-gray-600 space-y-8 text-left text-xl">
                      <li>ROS와 관제PC Topic과 Service 통신으로 Streaming합니다.</li>
                      <li>특정 색상을 따라 라인자율주행을 합니다.</li>
                      <li>웹 인터페이스에서 수동주행이 가능합니다.</li>
                      <li>QR CODE를 보면 멈추고 인식합니다.</li>
                      <li>캡처 이미지 저장하고 DB로 보냅니다.</li>
                      <li>자율주행 중 사람보면 버저를 울립니다.</li>
                    </ol>
                  </div>
              </ol>
            </div>
        </div>
      </div>


      <div className="section section7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-20">
            <div className="col-span-2 text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 pt-10">서버 배포하기</h2>
            </div>
              
              <div className="flex items-center justify-center h-82 overflow-hidden relative pl-20 " 
                    onClick={() => setSelectedVideo(videoURLs.frontend)} style={{ cursor: 'pointer' }} >
              
                  <img src="/images/" alt="사진1" className="w-1/2 h-[370px] max-w-full" />
                  <img src="/images/" alt="사진2" className="w-1/2 h-[370px] max-w-full" />
              </div>

            <div className="md:col-span-1 h-full flex flex-col justify-between pr-20 ">
              <ol className="list-decimal list-inside text-gray-600  bg-blue-50 h-full flex flex-col justify-between p-2 pl-10 pr-10">
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <ol className="list-decimal list-inside text-gray-600 space-y-8 text-left text-xl">
                      <li>쿠봇을 활용하여 다양한 환경에서 실험하고 최적의 로봇 동작을 확인합니다</li>
                    </ol>
                  </div>
              </ol>
            </div>
          </div>
      </div>


      

            
      {selectedVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeVideo}
          style={{ cursor: 'pointer' }}
        >
          <div
            className="relative w-11/12 md:w-1/2 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeVideo}
            >
              &times;
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>


      )}
    </div>
  );
};

export default FullpagePage;
