import React, { useState, useEffect } from 'react';
import "./Control_robot.css"

const ControlRobot: React.FC = () => {
  const [battery, setBattery] = useState(85); // 배터리 상태 (%)
  const [speed, setSpeed] = useState(30); // 속도 조절
  const [isAutoMode, setIsAutoMode] = useState(false); // 자율주행 모드 여부
  const [currentAction, setCurrentAction] = useState('대기 중'); // 현재 동작 상태

  // 키보드 이벤트 리스너를 추가하여 방향키 입력 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setCurrentAction('위로 이동');
          break;
        case 'ArrowDown':
          setCurrentAction('아래로 이동');
          break;
        case 'ArrowLeft':
          setCurrentAction('왼쪽으로 이동');
          break;
        case 'ArrowRight':
          setCurrentAction('오른쪽으로 이동');
          break;
        case ' ':
          setCurrentAction('정지');
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
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
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
        <div className="flex-1 mr-4">
          <div className="bg-black h-72 rounded-lg flex items-center justify-center text-white text-lg font-bold mb-4">
            📷 웹캠 스트리밍
          </div>
          {/* 실시간 송출 화면 */}
          <div className="bg-black h-72 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            웹캠 화면
          </div>
        </div>

        {/* 오른쪽: 방향키 및 버튼 */}
        <div className="flex-1">
          <div className="text-center mb-6">
            {/* 방향키 조작 */}
            <div className="grid grid-container">
            {/* ▲ - 첫 번째 행 첫 번째 열 */}
            <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 forward">▲ 앞으로</button>
            {/* ◀ - 두 번째 행 첫 번째 열 */}

            <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 left">◀왼쪽</button>

            {/* ■ - 두 번째 행 두 번째 열 */}
            <button className="bg-red-500 p-6 rounded-md text-xl text-white font-bold col-span-1 row-span-1 stop">■ 정지</button>

            {/* ▶ - 첫 번째 행 세 번째 열 */}
            <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 right">오른쪽▶</button>
          {/* ▼ - 두 번째 행 세 번째 열 */}
            <button className="bg-gray-300 p-6 rounded-md text-xl col-span-1 row-span-1 backward">▼후진</button>
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
              className={`px-6 py-3 rounded-md text-lg ${isAutoMode ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
              onClick={() => setIsAutoMode(!isAutoMode)}
            >
              {isAutoMode ? '수동전환' : '자율주행'}
            </button>
          </div>

          {/* 속도 조절 (슬라이더 사용) */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium">🚀 속도 조절: {speed}</p>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-blue-500 rounded-lg"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>10</span><span>30</span><span>50</span><span>70</span><span>100</span>
            </div>
          </div>

          {/* 뒤로 가기 */}
          <button className="w-full bg-gray-600 text-white py-3 rounded-md mt-6 text-xl">
            ⬅ 뒤로 가기
          </button>
        </div>
      </div>

      {/* 현재 동작 상태 출력 */}
      <div className="w-full bg-gray-200 p-4 rounded-lg mt-4 text-center font-semibold text-lg">
        현재 동작: {currentAction}
      </div>
    </div>
  );
};

export default ControlRobot;
