import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center items-center justify-center mb-8">
          <img src="/images/logo.png" alt="Coubot Logo" className="w-20 h-20 mr-4" />
          <h1 className="text-4xl font-bold">Coubot</h1>
        </div>
        
        
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-2">제품 소개</h2>
          <p className="text-gray-600">이 제품은 물류 자동화를 돕는 AI 기반 협업 도구입니다.</p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">실시간 물류 추적</h3>
            <p className="text-gray-600">AI 기반 실시간 물류 위치 확인</p>
          </div>
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">자동 재고 관리</h3>
            <p className="text-gray-600">인공지능이 실시간으로 재고를 분석</p>
          </div>
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">효율적인 경로 추천</h3>
            <p className="text-gray-600">최적의 배송 경로를 AI가 자동 분석</p>
          </div>
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">팀 협업 지원</h3>
            <p className="text-gray-600">실시간 채팅 및 작업 관리 기능 제공</p>
          </div>
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">데이터 분석</h3>
            <p className="text-gray-600">물류 데이터를 기반으로 인사이트 제공</p>
          </div>
          <div className="bg-white p-6 border border-blue-200 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">보안 및 안정성</h3>
            <p className="text-gray-600">안전한 데이터 보호 및 보안 강화</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
