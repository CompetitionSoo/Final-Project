import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Control_robot.css";
import YoloStream from './YoloStream';
import Webcam from './Webcam';

const ControlRobot: React.FC = () => {
  const [battery, setBattery] = useState(85); // 배터리 상태 (%)
  const [speed, setSpeed] = useState(30); // 속도 조절
  const [isAutoMode, setIsAutoMode] = useState(false); // 자율주행 모드 여부
  const [currentAction, setCurrentAction] = useState('대기 중'); // 현재 동작 상태
  const navigate = useNavigate();


  // ✅ 키보드 이벤트 리스너 추가 (W, A, S, D 키 추가)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) { // 소문자로 변환하여 비교 (대소문자 대응)
        case 'arrowup':
        case 'w':
          
          setCurrentAction('⬆ 앞으로 이동');
          break;
        case 'arrowdown':
        case 's':
          setCurrentAction('⬇ 뒤로 이동');
          break;
        case 'arrowleft':
        case 'a':
          setCurrentAction('⬅ 왼쪽으로 이동');
          break;
        case 'arrowright':
        case 'd':
          setCurrentAction('➡ 오른쪽으로 이동');
          break;
        case ' ':
          setCurrentAction('🛑 정지');
          break;
        default:
          break;
      }
      console.log(`현재 동작: ${currentAction}`);
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAction]); // currentAction이 변경될 때마다 effect 실행

  return (
    <div className="h-auto max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">🤖 로봇 컨트롤</h2>

      {/* 배터리 상태 */}
      <div className="mb-6">
        <p className="text-gray-700 font-medium">🔋 배터리 상태: {battery}%</p>
        <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden mt-2">
          <div
            className={`h-full ${battery > 50 ? 'bg-green-500' : battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${battery}%` }}
          />
        </div>
      </div>

      <div className="flex mb-6">
        {/* 왼쪽: 웹캠 화면 */}
        <div className="flex-1 flex flex-col mr-4">
          {/* YOLO 감지 화면 (상단) */}
          <div className="relative h-80 bg-black rounded-lg overflow-hidden mb-4">
            <h3 className="absolute top-2 left-2 text-white font-bold z-10">📷 YOLO 감지 화면</h3>
            <YoloStream/>
          </div>

          {/* 실시간 웹캠 화면 (하단) */}
          <div className="relative h-80 bg-black rounded-lg overflow-hidden">
            <h3 className="absolute top-2 left-2 text-white font-bold z-10">🎥 실시간 웹캠</h3>
            <Webcam />
          </div>
        </div>

        {/* 오른쪽: 방향키 및 버튼 */}
        <div className="flex-1">
        {/* YOLO 모델 선택 */}
          <div className="bg-white p-1 rounded-lg shadow-md w-full text-center mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">모델 선택</h3>
            <div className="grid grid-cols-2 gap-4 my-6">
              <button className="bg-amber-500 text-white py-3 rounded-md hov" >과일&채소</button>
              <button className="bg-green-400 text-white py-3 rounded-md">신선도</button>
            </div>
          </div>
  


            
            <div className="bg-white p-4 rounded-lg shadow-md w-full text-center mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">🔍 검출된 객체</h3>
              <p id="detection-text" className="text-gray-600">현재 검출된 객체 없음</p>
            </div>
            <div className="text-center mb-6">
            {/* 방향키 조작 */}
            <div className="grid grid-container">
              <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 forward">▲ 앞으로</button>
              <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 left">◀ 왼쪽</button>
              <button className="bg-red-500 p-6 rounded-md text-xl text-white font-bold col-span-1 row-span-1 stop">■ 정지</button>
              <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 right">오른쪽 ▶</button>
              <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 backward">▼ 후진</button>
            </div>

            {/* 버튼들 */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <button className="bg-blue-500 text-white py-3 rounded-md">저장하기</button>
              <button className="bg-red-500 text-white py-3 rounded-md">삭제하기</button>
            </div>
          </div>

          {/* 모드 전환 */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700 font-medium text-lg">🛠 모드: {isAutoMode ? '자율주행' : '수동 조작'}</span>
            <button
              className={`px-6 py-3 rounded-md text-lg ${isAutoMode ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}
              onClick={() => setIsAutoMode(!isAutoMode)}
            >
              {isAutoMode ? '수동전환' : '자율주행'}
            </button>
          </div>

          {/* 속도 조절 (슬라이더 사용) */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium text-center">🚀 속도 조절: {speed}</p>
            <div className="grid grid-cols-5 gap-2 mt-3">
              {[10, 30, 50, 70, 100].map((value) => (
                <button
                  key={value}
                  className={`py-2 px-4 rounded-md text-white font-bold ${
                    speed === value ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  onClick={() => setSpeed(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          
          {/* 현재 동작 상태 출력 */}
          <div className="w-full  mt-4 gap-x-3 text-center font-semibold text-lg flex justify-center items-center">
              <div className="w-1/2 text-center px-4 rounded-lg">현재 동작</div>
              <div className="w-1/2 bg-orange-300 text-center px-4 rounded-lg">{currentAction}</div>
            </div>

          {/* 뒤로 가기 */}
          <button className="w-full bg-gray-600 text-white py-3 rounded-md mt-6 text-xl"
          onClick={() => navigate('/dashboard')}>
            ⬅ 뒤로 가기
          </button>
            
        </div>
      </div>

      
      
    </div>
  );
};

export default ControlRobot;
