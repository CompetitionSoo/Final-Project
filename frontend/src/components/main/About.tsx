import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const About: React.FC = () => {
  // 동영상 캐러셀 관련 상태 및 배열
  const videoList = [
    "/videos/aespa.mp4",
    "/videos/login.mp4",
    "/videos/robotvideo.mp4",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
    }, 5000); // 5초마다 자동 전환
    return () => clearInterval(interval);
  }, [videoList.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoList.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 상단: 로고와 타이틀 */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/logo.png"
            alt="Coubot Logo"
            className="w-20 h-20 mr-4"
          />
          <h1 className="text-4xl font-bold">Coubot</h1>
        </div>

        {/* 제품 소개 섹션 */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-2">제품 소개</h2>
          <p className="text-gray-600 mb-4 text-left">
            Coubot은 최첨단 인공지능 기술을 활용하여 물류 및 재고 관리를
            혁신하는 솔루션입니다. 실시간 데이터 분석과 예측 모델링을 통해 운영
            효율성을 극대화하고 비용을 절감합니다.
          </p>
          <p className="text-gray-600 mb-4 text-left">
            이 도구는 사용자의 업무 환경에 맞춰 유연하게 커스터마이즈할 수
            있으며, 직관적인 대시보드를 제공하여 복잡한 물류 흐름도 쉽게 파악할
            수 있도록 돕습니다.
          </p>
          <p className="text-gray-600 text-left">
            최신 보안 기술과 지속적인 업데이트로 데이터를 안전하게 보호하며,
            고객 맞춤형 지원 서비스를 통해 언제나 최상의 성능을 유지할 수
            있습니다.
          </p>
        </div>


        {/* 왼쪽 이미지, 오른쪽 설명 */}
        <div className="flex flex-col md:flex-row items-start mb-8">
          {/* 왼쪽: 이미지 영역 */}
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
            <div className="w-full h-80 bg-gray-200 rounded-lg shadow-md">
              <img
                src="/images/로봇.png"
                alt="로봇 이미지"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* 오른쪽: 텍스트 영역 */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-2">
              <FaTruck className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="text-2xl font-bold">통합 물류 관리</h3>
            </div>
            <p className="mb-4 text-gray-700 text-left">
              AI 기반 실시간 물류 위치 추적, 자동 재고 관리 및 최적의 배송 경로
              추천을 제공하여 물류 운영을 효율적으로 지원합니다.
            </p>

            <div className="flex items-center mb-2">
              <FaUsers className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="text-2xl font-bold">협업 및 데이터 분석</h3>
            </div>
            <p className="mb-4 text-gray-700 text-left">
              팀 협업 지원과 물류 데이터를 기반으로 한 인사이트 제공을 통해
              의사결정과 업무 효율성을 극대화합니다.
            </p>

            <div className="flex items-center mb-2">
              <FaShieldAlt className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="text-2xl font-bold">보안 및 안정성</h3>
            </div>
            <p className="text-gray-600 text-left">
              최신 보안 기술을 적용하여 안전한 데이터 보호와 안정적인 시스템
              운영을 보장합니다.
            </p>
          </div>
        </div>

        {/* 하단 이미지 3개 (가로 배치) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center shadow-md">
            <img
              src="/images/머신러닝학습_2.jpg"
              alt="이미지1"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center shadow-md">
            <img
              src="/images/Ros_1.jpg"
              alt="이미지2"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center shadow-md">
            <img
              src="/images/Ros_2.jpg"
              alt="이미지3"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 하단: 동영상 (자동 전환 + 양쪽 버튼) */}
        <div className="relative w-full flex justify-center items-center mt-8">
          {/* 이전 버튼 (왼쪽) */}
          <button
            className="absolute left-[-60px] bg-gray-800 text-white p-2 rounded-full"
            onClick={goToPrevious}
          >
            <FaChevronLeft size={30} />
          </button>

          {/* 동영상 컨테이너 */}
          <div className="relative w-full md:w-[1200px] h-[256px]">
            <video
              key={currentIndex}
              src={videoList[currentIndex]}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
            />
          </div>

          {/* 다음 버튼 (오른쪽) */}
          <button
            className="absolute right-[-60px] bg-gray-800 text-white p-2 rounded-full"
            onClick={goToNext}
          >
            <FaChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default About;
