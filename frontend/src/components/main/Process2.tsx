import React, { useEffect, useRef, useState } from "react";
import styles from "./Processjs.module.css";
import { initParallax } from "./Processjs.js";

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const removeParallax = initParallax(container);
    return () => removeParallax();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 상단 배경 영역 */}
      <div
        className={styles.background}
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              transparent 50%,
              rgba(155, 149, 204, 0.95) 100%,
              #020202
            ),
            url(${process.env.PUBLIC_URL}/images/10.png)
          `,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            color: "#fff",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>쿠봇</div>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>ROBOTICS</h1>
          <p style={{ marginBottom: "0.1rem" }}>강영수와 아이들이 제작한</p>
          <p>ros & yolo 서비스를 만나보세요</p>
          <a
            href="#readmore"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "block",
              padding: "10px",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>read more</div>
            <img
              src={`${process.env.PUBLIC_URL}/images/arrow.png`}
              alt="화살표"
              style={{ width: "34px", height: "24px", marginLeft: "17px" }}
            />
          </a>
        </div>
      </div>

      {/* 내용 영역 */}
      <div
        className={styles.content}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 100%, transparent), 
          url(${process.env.PUBLIC_URL}/images/fac2.png)`,
          backgroundSize: "auto 120%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 py-8" id="readmore"></div>

        {/* 개발 과정 (클릭하면 동영상 모달 띄움) */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">개발과정</h1>
          <div className="space-y-12">
            <div
              className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400  
                border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 
                hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)] cursor-pointer"
              onClick={() => setSelectedVideo("/videos/myVideo.mp4")}
            >
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
              <img src="" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2">
                  아이디어 기획 및 목표 설정
                </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li>웹캠을 통해 사물을 인식하여 확인할 목록을 확인합니다.</li>
                  <li>학습 모델에 따라 웹캠이 인식하는 정확도를 확인합니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/로그인화면.jpg" alt="사진1" className="w-1/2 max-w-full max-h-full"/>
                <img src="/images/회원가입화면.jpg" alt="사진2" className="w-1/2 h-full object-cover"/>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-5">프론트엔드 및 백엔드 개발과정 </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>로그인& 회원가입 화면을 구현합니다.</li>
                  <li> 회원가입 시 입력한 정보는 MySQL 데이터베이스(DB)에 저장되며,<br /> &nbsp;&nbsp;&nbsp;해당 정보를 이용해 로그인할 수 있습니다.</li>
                  <li> 일반 사용자는 관리자 대시보드에 접근할 수 없으므로,<br /> &nbsp;&nbsp;&nbsp;먼저 회원가입을 진행해야 합니다.</li>
                  <li>로그인하면 사용자 대시보드로 이동하며, 이후 쿠봇을 조종할 수 있는 컨트롤러 <br /> &nbsp;&nbsp;&nbsp;화면에 접속할 수 있습니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/로그인&회원가입.png" alt="사진1" className="w-1/2 h-full object-cover"/>
                <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2"> 프론트엔드 및 백엔드 개발과정 </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li>갤러리 화면을 구현합니다.</li>
                  <li>갤러리 화면을 구현합니다.</li>
                  <li>갤러리 화면을 구현합니다.</li>
                  <li>갤러리 화면을 구현합니다.</li>
                  <li>갤러리 화면을 구현합니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/머신러닝학습_2.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="/images/머신러닝학습_1.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2">
                  머신러닝 및 딥러닝
                </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li> Yolov8n 모델을 활용하여 과일과 채소를 인식하는 학습 모델을 제작하였습니다.</li>
                  <li>CNN 모델을 사용해 과일과 채소를 학습시켰습니다.</li>
                  <li>추가적으로, 새로운 모델을 개발하여 기존 모델과 함께 과일과 야채의 신선도를 체크하는 기능을 학습시켰습니다.</li>
                  <li>Yolov8n 모델을 다양한 방식으로 실험하는 과정에서 배치 사이즈, 이미지 크기 조정 및 라벨링 과정에서 일부 문제점을 발견하였으나, 수정이 미흡한 부분이 있었습니다.</li>
                  <li>CNN 모델을 활용해 신선도 판별을 시도했으나, 정확도가 너무 낮아 결국 폐기하였습니다.</li>
                  <li>Yolov8s, Yolov8m뿐만 아니라 Yolov10, Yolov5 등 다양한 모델을 실험하였으나, 컴퓨터 성능이 부족하여 최적화된 nano 버전을 사용해야 했습니다. 그 결과, 속도는 개선되었지만 정확도가 다소 희생되었습니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img
                  src="/images/웹페이지기능확인_1.jpg"
                  alt="사진1"
                  className="w-1/2 h-full object-cover"
                />
                <img
                  src="/images/웹페이지기능확인_2.jpg"
                  alt="사진2"
                  className="w-1/2 h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-6">
                <h2 className="text-2xl text-center font-semibold mb-2">
                  웹페이지 기능 구현 확인
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    웹캠을 활용한 AI 사물 인식 테스트
                  </p>
                  <p className="text-left leading-relaxed">
                    이 기능은 웹캠을 통해 사물을 인식하고, 선택한 학습 모델에 따라 인식 정확도를 검증하는 테스트 페이지입니다.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">기능 확인 절차</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>웹캠을 통해 사물을 인식하여 확인할 목록을 확인합니다.</li>
                    <li>학습 모델에 따라 웹캠이 인식하는 정확도를 확인합니다.</li>
                    <li>
                      학습 모델(과일&채소, 신선도)을 변경할 때마다 객체의 정확도를 확인합니다.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/아두이노_1.jpg" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="/images/아두이노_2.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2">
                  Arduino AI 자율주행자동차
                </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li>PyQt5를 활용하여 버튼을 화면 하단에 배치하도록 구현하였습니다.</li>
                  <li> 초기에는 그리드 레이아웃을 사용하여 화면을 배치하였으나, 여백의 너비가 일정하게 유지되었음에도 불구하고 어색한 배치가 발생하여 BOX 형식으로 수정하였습니다.</li>
                  <li> 자율주행 기능을 적용하여 아두이노 자동차 로봇이 검은색 선을 따라 최종 목적지까지 도달하도록 설계하였습니다.</li>
                  <li> Haar Cascade 기능을 활용하여 얼굴 인식 기능을 구현하였습니다.</li>
                  <li> 화면 저장 기능을 추가하여, 사용자가 원하는 폴더를 생성하고 해당 위치에 이미지를 저장할 수 있도록 개발하였습니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/Ros_1.jpg" alt="사진1" className="w-1/2 h-full object-cover"/>
                <img src="/images/Ros_2.jpg" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2">ROS</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li>ROS와 관제PC Topic과 Service 통신으로 Streaming합니다.</li>
                  <li>특정 색상을 따라 라인자율주행을 합니다.</li>
                  <li>웹 인터페이스에서 수동주행이 가능합니다.</li>
                  <li>QR CODE를 보면 멈추고 인식합니다.</li>
                  <li>캡처 이미지 저장하고 DB로 보냅니다.</li>
                  <li>자율주행 중 사람보면 버저를 울립니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="" alt="사진1" className="w-1/2 h-full object-cover" />
                <img src="" alt="사진2" className="w-1/2 h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl text-center font-semibold mb-2"> 아두이노 OR ROS 로봇 컨트롤 </h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                  <li> 아두이노 자동차 로봇을 사용하여 키보드 입력을 통해 동작과 학습 모델 적용을 확인합니다.</li>
                  <li> 쿠봇을 통해 (ROS) 연결 후 최종적으로 원하는 기능을 수행하는지 확인합니다.</li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-sky-50 via-sky-200 to-sky-400 border p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_50px_80px_-20px_rgba(170,247,247,0.5)]">
              <div className="w-full md:w-1/2 h-80 border rounded-lg overflow-hidden flex gap-x-3">
                <img src="/images/사진준비중1" alt="사진준비중1" className="w-1/2 h-full object-cover"/>
                <img src="/images/사진준비중2" alt="사진준비중2" className="w-1/2 h-full object-cover"/>
              </div>
              <div className="w-full md:w-1/2 text-left">
                <h2 className="text-2xl font-semibold mb-2">배포하기</h2>
                <p className="text-gray-600">
                  쿠봇을 활용하여 다양한 환경에서 실험하고 최적의 로봇 동작을 확인합니다.
                </p>
              </div>
            </div>

      {/* ✅ 동영상 모달 */}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-3/4 max-w-4xl relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <video controls autoPlay className="w-full rounded-lg">
              <source src={selectedVideo} type="video/mp4" />
              브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Process;
