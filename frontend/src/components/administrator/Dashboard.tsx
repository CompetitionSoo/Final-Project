import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';


import Webcam from './Webcam';
import Todolist from './Todolist';


const Dashboard: React.FC = () => {
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
          대시보드에 온것을 환영합니다.
          </h2>
          <p className="text-gray-600 mb-4">
            This is your personal dashboard where you can manage your account and access various features.
          </p>
        </div>
            
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-800 mb-2">WEBCAME</h2>
            <p className="text-gray-600">현재 웹캠을 통하여 보이는 화면</p>
            <Webcam />
            
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Ros</h2>
            <p className="text-gray-600">로스 로봇 웹캠이 나오는 부분입니다.</p>
          </div>
          
          {/* 로봇이미지를 누르면 컨트롤러로 이동*/}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Cubot Controller</h2>
            <img
              src='/images/로봇.png' alt='사진을 못불러왔습니다'
              className="w-full h-auto cursor-pointer rounded-lg shadow-md"
              onClick={() => navigate('/dashboard/control_robot')}
            />
          </div>


          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Profile</h3>
            <p className="text-gray-600">View and edit your profile information</p>
          </div>
              
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Todolist</h3>
            <Todolist/>
            <p className="text-gray-600">Manage your account settings and preferences</p>
            
          </div>

        </div>
      </div>
  );
};

export default Dashboard; 