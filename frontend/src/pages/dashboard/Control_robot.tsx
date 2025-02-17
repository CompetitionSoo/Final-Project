import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const ControlRobot: React.FC = () => {
  const [speed, setSpeed] = useState(50);
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  const [battery, setBattery] = useState(); // 배터리 상태 (예제 값)

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">로봇 컨트롤</h2>
        
        {/* 배터리 상태 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">배터리 상태:</span>
          <div className="flex items-center">
            <div className="w-20 h-5 bg-gray-200 rounded-lg overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: `${battery}%` }}></div>
            </div>
            <span className="ml-2 text-gray-700">{battery}%</span>
          </div>
        </div>
        
        {/* 웹캠 화면 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">실시간 송출 화면</h3>
          <div className="w-full h-56 bg-gray-300 flex items-center justify-center rounded-md">
            <span className="text-gray-600">(웹캠 스트리밍 자리)</span>
          </div>
        </div>``
        
        {/* 방향 컨트롤러 */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button className="p-2 bg-blue-500 text-white rounded">▲</button>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button className="p-2 bg-blue-500 text-white rounded">◀</button>
          <button className="p-2 bg-red-500 text-white rounded">■</button>
          <button className="p-2 bg-blue-500 text-white rounded">▶</button>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button className="p-2 bg-blue-500 text-white rounded">▼</button>
        </div>
        
        {/* 모드 전환 */}
        <div className="flex justify-between mb-4">
          <button onClick={() => setMode('auto')} className={`p-2 rounded ${mode === 'auto' ? 'bg-yellow-500' : 'bg-gray-300'}`}>자율주행 모드</button>
          <button onClick={() => setMode('manual')} className={`p-2 rounded ${mode === 'manual' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>수동전환 모드</button>
        </div>
        
        {/* 속도 조절 */}
        <div className="mb-4">
          <label className="block text-gray-700">속도 조절:</label>
          <input type="range" min="10" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>10</span><span>30</span><span>50</span><span>70</span><span>100</span>
          </div>
        </div>
        
        {/* 뒤로 가기 버튼 */}
        <div className="text-right">
          <button className="p-2 bg-gray-400 text-white rounded">뒤로 가기</button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ControlRobot;
