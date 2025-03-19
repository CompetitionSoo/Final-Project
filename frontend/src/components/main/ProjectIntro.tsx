import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';
import { FaCarSide } from "react-icons/fa";
import { TbCarCrash } from "react-icons/tb";
import { GiPositionMarker } from "react-icons/gi";
import { TbRouteAltLeft } from "react-icons/tb";

const ProjectIntro: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen bg-gray-50 pb-24 pt-10 scroll-mt-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            프로젝트 소개
          </h2>
          <p className="text-lg text-gray-700 text-left leading-relaxed">
          쿠봇 로봇 프로젝트는 물류 작업의 안전성과 효율성을 높이기 위해 스마트 자동화 시스템을 구축합니다.
          정확한 물체 인식을 통해 물류 프로세스를 최적화하며, 창고 관리부터 운반까지 전 과정을 자동화하여
          보다 빠르고 안전한 물류 환경을 제공합니다.
          </p>
          
        {/* 첫 번째 섹션 */}
        <div className="grid md:grid-cols-2 gap-8 items-center mt-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-auto  flex justify-center"
            > 
              <img
                src="/images/coubot_1.jpg"
                alt="로봇 이미지"
                className="w-auto h-auto object-contain"
              />

            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg h-auto hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-center   text-gray-900 mb-4">목적이 무엇인가</h3>
                <div className="flex flex-col space-y-4 text-2xl text-gray-700">              
                  <p className="text-gray-700 text-2xl" ><FaCarSide />자율 주행 시스템 </p>
                  <p className="text-gray-700 text-2xl"><GiPositionMarker />실시간 위치 추적 </p>
                  <p className="text-gray-700 text-2xl"><TbCarCrash />충돌 방지 알고리즘 </p>
                  <p className="text-gray-700 text-2xl"><TbRouteAltLeft />스마트 경로 최적화 </p>
                </div>
            </motion.div>
          </div>
          
          {/* 두 번째 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-center  text-gray-900 mb-4">로봇 자동화기술</h3>
              <ul className="space-y-4">
                <li className="text-gray-700 text-xl">• <span className="font-bold" >AI 기반 물체 인식</span> <br/>YOLO 모델을 활용한 실시간 물품 판별</li>
                <li className="text-gray-700 text-xl">• <span className="font-bold" >신선도 분석</span> <br/> 품질 평가 알고리즘을 통한 상태 확인</li>
                <li className="text-gray-700 text-xl">• <span className="font-bold" >스마트 데이터 분석</span><br/> 수집된 정보를 바탕으로 최적화 관리 제공</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full h-auto  flex justify-center"
              > 
                <img
                  src="/images/coubot_2.jpg"
                  alt="로봇 이미지"
                  className="w-auto h-auto object-contain"
              />
            </motion.div>
          </div>
          
          {/* 세 번째 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-auto  flex justify-center"
            >
              
              <img
                src="/images/coubot_3.jpg"
                alt="로봇 이미지"
                className="w-full h-auto object-cover"
              />  
              
          
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-2 rounded-xl shadow-lg hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold  text-center text-gray-900 mb-4">기대 효과</h3>
              <ul className="space-y-4">
                <li className="text-gray-700 text-lg">• <span className='font-bold'>운영 비용 & 작업 속도 향상</span> <br/> 자동화된 시스템을 통해 인건비 및 물류 비용 감소,<br/> 물류 처리 속도 증가</li>
                <li className="text-gray-700 text-lg">• <span className='font-bold'>정확도 및 품질 개선</span> <br/>YOLO 모델과 품질 평가 알고리즘으로 오류 감소 및 신선도 유지</li>
                <li className="text-gray-700 text-lg">• <span className='font-bold'>지속적인 운영 가능</span> <br/>자동 충전 시스템과 IoT 기반 원격 모니터링을 통해 유지보수 최소화</li>

              </ul>
            </motion.div>
          </div>
        </motion.div>

      </div>

      

      <div>
          <ScrollIndicator target="#view" />
          </div>
    </section>
    
  );
};

export default ProjectIntro;
