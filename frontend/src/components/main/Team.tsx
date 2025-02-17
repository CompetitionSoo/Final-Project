import React from 'react';

const Team: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">강영수와 아이들</h1>
      <h2>팀에 대한 슬로건을 넣을예정</h2>  

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Team member cards will go here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">강 영 수</h2>
            <p className="text-gray-600 mb-4">프론트엔드,백엔드</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">이 희 성</h2>
            <p className="text-gray-600 mb-4">프론트엔드,백엔드</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">김 희 선</h2>
            <p className="text-gray-600 mb-4">프론트엔드,백엔드</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">김 정 훈</h2>
            <p className="text-gray-600 mb-4">ROS</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">정 성 민</h2>
            <p className="text-gray-600 mb-4">ROS</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" />
            <h2 className="text-xl font-semibold mb-2">이 정 희</h2>
            <p className="text-gray-600 mb-4"> 머신러닝, 딥러닝</p>
            <p className="text-gray-500">
              누구는 뭐를했고 누구는 어쩌고저쩌고.
            </p>
          </div>
        </div>



        {/* Add more team member cards as needed */}
      </div>
    </div>
  );
};

export default Team; 