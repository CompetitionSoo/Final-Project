import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';
import Webcam from './Webcam';
import Todolist from './Todolist';
import "./Dashboard.css";

const Dashboard2: React.FC = () => {
  const navigate = useNavigate();

  // Protect this route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          대시보드에 온것을 환영합니다.
        </h1>
        <h2 className="text-gray-600 mb-4">
        여기는 여러분의 일정을 관리하고, 로봇을 제어하며, 할 일을 체크하는 공간입니다. 필요한 기능을 선택하여 시작해 보세요.
        </h2>
        <p className="text-gray-600 mb-4">
            웹캠을 통해 실시간 모니터링을 확인하고, 할 일 목록을 관리하며, 로봇을 제어할 수 있습니다. 오늘의 할 일 목록을 추가하고 완료된 작업에 체크하여 더 효율적으로 하루를 관리하세요!
        </p>
      </div>
    
      <div className="card-container">
        {/* 카드 1: 웹캠 (1행에 2개의 카드 중 첫 번째 카드, 2개의 열을 차지) */}
        <div className="card webcam" onClick={() => navigate('/dashboard/monitoring')} >
          <div className='card-title'/>
            <Webcam /> 
        </div>

        {/* 카드 2: 로봇 제어 (1행에 2개의 카드 중 두 번째 카드, 1열에 위치) */}
        <div className="card-1" onClick={() => navigate('/dashboard/control_robot')}>

          <div className="card-inner">
            <div className="card-front-3">
              <img src="/images/로봇.png" alt="로봇 이미지" />
            </div>
            <div className="card-back-3">
              {/* 카드 뒷면 내용 */}
            </div>
          </div>
        </div>

        {/* 카드 3: 할 일 목록 (2행에 3개의 카드 중 첫 번째 카드, 1열에 위치) */}
        <div className="card-1">
          <div className="card-inner">
            <div className="card-front-3">
              <Todolist />  {/* 할 일 목록 컴포넌트 추가 */}
            </div>
            <div className="card-back-3">
              {/* 카드 뒷면 내용 */}
            </div>
          </div>
        </div>

        {/* 카드 4: 할 일 목록 (2행에 3개의 카드 중 두 번째 카드, 2열에 위치) */}
        <div className="card-1">
          <div className="card-inner">
            <div className="card-front-3">
              <Todolist />  {/* 할 일 목록 컴포넌트 추가 */}
            </div>
            <div className="card-back-3">
              {/* 카드 뒷면 내용 */}
            </div>
          </div>
        </div>

        {/* 카드 5: 할 일 목록 (2행에 3개의 카드 중 세 번째 카드, 3열에 위치) */}
        <div className="card-1">
          <div className="card-inner">
            <div className="card-front-3">
              <Todolist />  {/* 할 일 목록 컴포넌트 추가 */}
            </div>
            <div className="card-back-3">
              {/* 카드 뒷면 내용 */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard2;
