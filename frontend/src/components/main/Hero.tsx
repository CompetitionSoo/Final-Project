import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop 
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src="/videos/robotvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              물류분류 로봇 프로젝트
            </h1>
            <p className="text-xl text-gray-200 mb-8 ml-4">
              Coubot은  물류 로봇을 활용한 자동화 시스템입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#about"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center"
              >
                프로젝트 소개
              </a>
              <a
                href="#view"
                className="inline-block px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors duration-200 text-center"
              >
                영상 보기
              </a>
            </div>
          </motion.div>
        </div>
      </div>

          <div>
          <ScrollIndicator target="#about" />
          </div>
    </div>
  );
};

export default Hero; 