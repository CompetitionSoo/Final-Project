import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
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
    "/videos/login.mp4",
    "/videos/과일,채소.mp4",
    "/videos/라인트레이싱영상.mp4",
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

  // 애니메이션 변수
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 상단: 로고와 타이틀 */}

 
      
        {/* 제품 소개 섹션 */}
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg mb-12 border-l-4 border-blue-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">제품 소개</h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                Coubot은 최첨단 인공지능 기술을 활용하여 물류 및 재고 관리를
                혁신하는 솔루션입니다. 실시간 데이터 분석과 예측 모델링을 통해 운영
                효율성을 극대화하고 비용을 절감합니다.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                이 도구는 사용자의 업무 환경에 맞춰 유연하게 커스터마이즈할 수
                있으며, 직관적인 대시보드를 제공하여 복잡한 물류 흐름도 쉽게 파악할
                수 있도록 돕습니다.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                최신 보안 기술과 지속적인 업데이트로 데이터를 안전하게 보호하며,
                고객 맞춤형 지원 서비스를 통해 언제나 최상의 성능을 유지할 수
                있습니다.
              </p>
            </div>
          </motion.div>

        {/* 왼쪽 이미지, 오른쪽 설명 */}
        <motion.div 
        className="flex flex-col md:flex-row items-center mb-16 gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
          >
        {/* 왼쪽: 이미지 영역 */}
        <motion.div 
          className="md:w-1/2"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
            >
          <div className="w-full  h-[580px] bg-gray-200 rounded-lg shadow-md">
          <img
          src="/images/로봇.png"
          alt="로봇 이미지"
          className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* 오른쪽: 텍스트 영역 */}
        <motion.div 
          className="md:w-1/2 space-y-8"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          >
        <motion.div 
          className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 transform hover:-translate-y-1 transition-transform duration-300"
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
          >
            <div className="flex items-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FaTruck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">통합 물류 관리</h3>
            </div>
              <p className="text-gray-700 text-lg leading-relaxed">
              AI 기반 실시간 물류 위치 추적, 자동 재고 관리 및 최적의 배송 경로
              추천을 제공하여 물류 운영을 효율적으로 지원합니다.
              </p>
        </motion.div>

        <motion.div 
          className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 transform hover:-translate-y-1 transition-transform duration-300"
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1)" }}
          >
          <div className="flex items-center mb-3">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
            <FaUsers className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">협업 및 데이터 분석</h3>
          </div>
            <p className="text-gray-700 text-lg leading-relaxed">
            팀 협업 지원과 물류 데이터를 기반으로 한 인사이트 제공을 통해
            의사결정과 업무 효율성을 극대화합니다.
            </p>
        </motion.div>

        <motion.div 
        className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 transform hover:-translate-y-1 transition-transform duration-300"
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
        >
        <div className="flex items-center mb-3">
        <div className="p-3 bg-green-100 rounded-full mr-4">
        <FaShieldAlt className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">보안 및 안정성</h3>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
        최신 보안 기술을 적용하여 안전한 데이터 보호와 안정적인 시스템
        운영을 보장합니다.
        </p>
        </motion.div>
        </motion.div>
        </motion.div>
        {/* 하단 이미지 3개 (가로 배치) */}
        <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        >
        <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-lg"
        variants={fadeIn}
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
        >
        <div className="h-48 overflow-hidden">
        <img
        src="/images/머신러닝학습_2.jpg"
        alt="머신러닝 학습"
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        </div>
        <div className="p-4">
        <h4 className="font-bold text-lg mb-1">머신러닝 기술</h4>
        <p className="text-gray-600 text-sm">첨단 머신러닝 기술로 데이터를 분석하고 예측합니다</p>
        </div>
        </motion.div>

        <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-lg"
        variants={fadeIn}
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
        >
        <div className="h-48 overflow-hidden">
        <img
        src="/images/Ros_1.jpg"
        alt="ROS 시스템"
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        </div>
        <div className="p-4">
        <h4 className="font-bold text-lg mb-1">ROS 시스템</h4>
        <p className="text-gray-600 text-sm">로봇 운영 체제를 통한 효율적인 자원 관리</p>
        </div>
        </motion.div>

        <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-lg"
        variants={fadeIn}
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
        >
        <div className="h-48 overflow-hidden">
        <img
        src="/images/과일신선도.jpg"
        alt="로봇 제어 시스템"
        className="w-full h-full object-fill transform hover:scale-110 transition-transform duration-500"
        />
        </div>
        <div className="p-4">
        <h4 className="font-bold text-lg mb-1">로봇 제어 시스템</h4>
        <p className="text-gray-600 text-sm">정밀한 로봇 제어로 물류 자동화 실현</p>
        </div>
        </motion.div>
        </motion.div>


        {/* 하단: 동영상 (자동 전환 + 양쪽 버튼) */}
        <motion.div 
        className="relative w-full flex justify-center items-center mt-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        >
        {/* 이전 버튼 (왼쪽) */}
        <motion.button
        className="absolute left-2 z-10 bg-stone-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        onClick={goToPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
        <FaChevronLeft size={24} />
        </motion.button>

        {/* 동영상 컨테이너 */}
        <div className="relative w-full md:w-[1200px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        {/* 진행 표시기 */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center space-x-2 p-4">
        {videoList.map((_, idx) => (
        <div 
        key={idx} 
        className={`h-2 w-12  max-w-14 rounded-full ${currentIndex === idx ? 'bg-blue-500' : 'bg-gray-300'}`}
        />
        ))}
        </div>

        <motion.video
        key={currentIndex}
        src={videoList[currentIndex]}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        />

        {/* 오버레이 텍스트 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Coubot 기술 시연</h3>
        <p className="text-lg">혁신적인 물류 관리 시스템을 경험해보세요</p>
        </div>
        </div>

        {/* 다음 버튼 (오른쪽) */}
        <motion.button
        className="absolute right-2 z-10 bg-stone-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
        <FaChevronRight size={24} />
        </motion.button>
        </motion.div>
        </div>
        </div>

        );
        };
export default About;