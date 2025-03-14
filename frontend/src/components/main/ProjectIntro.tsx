import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

const ProjectIntro: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen bg-gray-50 pb-24 pt-14 scroll-mt-10">
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
          
        {/* 첫 번째 섹션 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                본 프로젝트는 물류 자동화를 위한 혁신적인 로봇 시스템을 개발하는 것을 목표로 합니다. 
                최신 기술을 활용하여 효율적이고 안전한 물류 처리 솔루션을 제공합니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                인공지능과 로보틱스 기술을 결합하여, 창고 관리부터 물품 운반까지 
                전 과정을 자동화하는 시스템을 구축했습니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">주요 특징</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">• 자율 주행 시스템</li>
                <li className="text-gray-700">• 실시간 위치 추적</li>
                <li className="text-gray-700">• 충돌 방지 알고리즘</li>
                <li className="text-gray-700">• 스마트 경로 최적화</li>
              </ul>
            </motion.div>
          </div>
          
          {/* 두 번째 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">주요 특징</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">• 로봇 암 컨트롤</li>
                <li className="text-gray-700">• 이미지 인식 기술</li>
                <li className="text-gray-700">• 자동 보관 시스템</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                로봇 암과 AI 기반 이미지 인식 기술을 결합하여 
                물품을 자동으로 분류하고 적재할 수 있습니다.
              </p>
            </motion.div>
          </div>
          
          {/* 세 번째 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                자동 충전 시스템과 IoT 기술을 활용하여 로봇의 유지보수를 최소화하고, 
                지속적인 운영이 가능합니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">주요 특징</h3>
              <ul className="space-y-4">
                <li className="text-gray-700">• 자동 충전 시스템</li>
                <li className="text-gray-700">• IoT 기반 원격 모니터링</li>
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
