import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Control_robot.css";
import YoloStreamProps from './YoloStream';
import Webcam from './Webcam';

import ROSLIB from "roslib";

interface UserProps {
  ros: any // 선택적 (optional) props
}

const ControlRobot: React.FC<UserProps> = ({ ros }) => {
  const [battery, setBattery] = useState(85); // 배터리 상태 (%)
  const [speed, setSpeed] = useState(30); // 속도 조절
  const [isAutoMode, setIsAutoMode] = useState(false); // 자율주행 모드 여부
  const [currentAction, setCurrentAction] = useState('대기 중'); // 현재 동작 상태
  const [checkedModel, setCheckedModel] = useState('default'); // 현재 선택한 모델

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ROS 연결된 듯 :", ros)
  }, [ros])

  const setSpeedService = (left:number, right:number) => {
    if(ros != null){
      const setSpeedClient = new ROSLIB.Service({
        ros: ros,
        name: '/set_speed',
        serviceType: 'jetbotmini_msgs/SetSpeed'
      })
      setSpeedClient.callService(new ROSLIB.ServiceRequest({
        left_speed: left,
        right_speed: right
      }), function(response){
        console.log(response.message)
      })
    }
  }

  // ✅ 키보드 이벤트 리스너 추가 (W, A, S, D 키 추가)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let key = event.key.toLowerCase()
      console.log(key)
      switch (key) { // 소문자로 변환하여 비교 (대소문자 대응)
        case 'q':
          setCurrentAction('좌회전');
          setSpeedService(0, 180)
          break;

        case 'arrowup':
        case 'w':
          setCurrentAction('⬆ 앞으로 이동');
          setSpeedService(250, 250)
          break;

        case 'e':
          setCurrentAction('우회전');
          setSpeedService(180, 0)
          break;

        case 'arrowleft':
        case 'a':
          setCurrentAction('⬅ 왼쪽으로 이동');
          setSpeedService(100, 255)
          break;
        
        case 's':
          setCurrentAction('🛑 정지');
          setSpeedService(0, 0)
          break;

        case 'arrowright':
        case 'd':
          setCurrentAction('➡ 오른쪽으로 이동');
          setSpeedService(255, 100)
          break;

        case 'z':
          setCurrentAction('저장하기');
          break;
        
        case 'c':
          setCurrentAction('화면캡처');
          break;
        
        case 'g':
          setCurrentAction('화면캡처');
          break;
          default:   
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentAction]); // currentAction이 변경될 때마다 effect 실행

  const handleChange = (value: string) => {
    console.log(value)
    setCheckedModel(value)
  }

  useEffect(() => {
    console.log("자율주행 여부:", isAutoMode)

    if(ros != null){
      const lineDrivingTopic = new ROSLIB.Topic({
        ros: ros,
        name: "/start_auto",
        messageType: "std_msgs/String"
      })
      const message = new ROSLIB.Message({
        data : isAutoMode ? "on" : "off"
      })
    
      lineDrivingTopic.publish(message)
    }
  }, [isAutoMode])

  return ros && (
    <div className="h-auto max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
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
          <div className="relative h-1/2 bg-black rounded-lg overflow-hidden mb-4">
            <h3 className="absolute top-2 left-2 text-white font-bold z-10">🎥 실시간 웹캠 화면</h3>
            <Webcam />
          </div>

          {/* 실시간 YOLO 감지 화면 (하단) */}
          <div className="relative h-1/2 bg-black rounded-lg overflow-hidden">
            <h3 className="absolute top-2 left-2 text-white font-bold z-10">📷 YOLO 감지 화면</h3>
            <YoloStreamProps model={checkedModel} />
          </div>
        </div>

        {/* 오른쪽: 방향키 및 버튼 */}
        <div className="flex-1">
          {/* YOLO 모델 선택 */}
          <div className="bg-white p-1 rounded-lg shadow-md w-full text-center mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">모델 선택</h3>
            <div className="grid grid-cols-3 gap-4 my-6">
            <label 
                className="text-white py-3 rounded-md cursor-pointer" 
                style={{ backgroundColor: checkedModel === 'default' ? '#22C55E' : '#AEAEAE' }}
              >
                <input onClick={() => handleChange('default')} type="radio" style={{ display: "none" }} /> 주행시
              </label>
              <label 
                className="text-white py-3 rounded-md cursor-pointer" 
                style={{ backgroundColor: checkedModel === 'fruits' ? '#22C55E' : '#AEAEAE' }}
              >
                <input onClick={() => handleChange('fruits')} type="radio" style={{ display: "none" }} /> 과일&채소
              </label>
              <label 
                className="text-white py-3 rounded-md cursor-pointer" 
                style={{ backgroundColor: checkedModel === 'fresh' ? '#22C55E' : '#AEAEAE' }}
              >
                <input onClick={() => handleChange('fresh')} type="radio" style={{ display: "none" }} /> 신선도
              </label>

            </div>
          </div>
          
            
            <div className="bg-white p-4 rounded-lg shadow-md w-full text-center mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">🔍 검출된 객체</h3>
              <p id="detection-text" className="text-gray-600">현재 검출된 객체 없음</p>
            </div>
            <div className="text-center mb-6">
              {/* 방향키 조작 */}
              <div className="grid grid-cols-3 gap-4 gap-x-2">
                <button className="bg-gray-300 p-6 rounded-md text-xl" onClick={() => {
                  console.log("좌회전 버튼 클릭!");
                  setCurrentAction('좌회전');
                  setSpeedService(0, 180);
                    }}>좌회전</button>

                
                <button className="bg-gray-300 p-6 rounded-md text-xl" onClick={() => {
                  console.log("앞으로 버튼 클릭!");
                  setCurrentAction('앞으로');
                  setSpeedService(250, 250);
                    }}>앞으로</button>
                
                <button className="bg-gray-300 p-6 rounded-md text-xl" onClick={()=>{
                  console.log("우회전 버튼 클릭");
                  setCurrentAction('우회전');
                  setSpeedService(180, 0);
                    }}>우회전</button>
                
                <button className="bg-gray-300 p-6 rounded-md text-xl" onClick={()=>{
                  console.log("왼쪽 버튼 클릭");
                  setCurrentAction('왼쪽');
                  setSpeedService(100, 255);
                    }}>왼쪽</button>
                
                <button className="bg-red-500 p-6 rounded-md text-xl text-white font-bold" onClick={()=>{
                  console.log("정지 버튼 클릭");
                  setCurrentAction('정지');
                  setSpeedService(0, 0);
                    }}>정지</button>
                
                <button className="bg-gray-300 p-6 rounded-md text-xl" onClick={()=>{
                  console.log("오른쪽 버튼 클릭");
                  setCurrentAction('오른쪽');
                  setSpeedService(255, 100);
                    }}>오른쪽</button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md w-full text-center mb-6 grid grid-cols-2 gap-4 my-6">
              <button className="bg-blue-500 text-white py-3 rounded-md"
              onClick={()=>{
                console.log("화면캡처");
                setCurrentAction('화면캡처');}}>
                화면캡처</button>
              
              <button className="bg-red-500 text-white py-3 rounded-md"
              onClick={()=>{
                console.log("저장하기");
                setCurrentAction('저장하기');
              }}>저장하기</button>
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
