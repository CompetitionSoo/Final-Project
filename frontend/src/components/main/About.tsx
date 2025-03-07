import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">제품소개</h1>
        
        <div className="prose lg:prose-xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">제품 개요</h2>
            <p className="text-gray-600 text-left">
              이 제품은 사용자들이 일정을 관리하고, 로봇을 제어하며, 할 일을 체크할 수 있는 대시보드 웹 애플리케이션입니다. 사용자는 로그인 후 대시보드를 통해 다양한 기능을 활용할 수 있습니다.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>실시간 웹캠 모니터링</li>
              <li>로봇 제어 기능</li>
              <li>할 일 목록 관리</li>
              <li>완료된 작업 체크</li>
              <li>자동차 상태 모니터링</li>
              <li>자동차 제어 기능</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">대시보드 기능</h2>
            <p className="text-gray-600 text-left">
              대시보드를 통해 실시간 모니터링을 확인하고, 할 일 목록을 관리하며, 로봇과 자동차를 제어할 수 있습니다.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">사용 사례</h2>
            <p className="text-gray-600 text-left">
              이 제품은 다양한 분야에서 활용될 수 있습니다. 예를 들어, 공장에서는 로봇을 제어하고 실시간으로 모니터링할 수 있으며, 사무실에서는 할 일 목록을 관리하여 업무 효율성을 높일 수 있습니다. 또한, 자동차 상태를 모니터링하고 제어하여 차량 관리의 효율성을 높일 수 있습니다.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">장점</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>사용하기 쉬운 인터페이스</li>
              <li>실시간 모니터링 및 제어 기능</li>
              <li>강력한 관리자 도구</li>
              <li>안전한 데이터 저장 및 관리</li>
              <li>자동차 상태 모니터링 및 제어 기능</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
            <p className="text-gray-600 text-left">
              이 제품은 최신 웹 기술을 사용하여 개발되었습니다. 프론트엔드는 React와 TypeScript를 사용하여 구축되었으며, Tailwind CSS를 사용하여 스타일링되었습니다. 백엔드는 Node.js와 Express를 사용하여 구축되었으며, 데이터베이스는 MongoDB를 사용합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">우리는</h3>
              <p className="text-gray-600 text-left">
                사용자 경험을 최우선으로 생각하며, 지속적으로 제품을 개선하고 있습니다.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">그래서</h3>
              <p className="text-gray-600 text-left">
                고객의 피드백을 반영하여 더 나은 서비스를 제공하기 위해 노력하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;