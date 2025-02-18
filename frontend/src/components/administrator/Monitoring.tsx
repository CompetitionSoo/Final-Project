import React, { useState, useRef, useEffect } from "react";


const Monitoring: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 웹캠 연결 코드
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing webcam:", error));
  }, []);

  return (
    
      <div className="grid grid-cols-2 gap-4 p-6">
        {/* 좌측: 웹캠 및 로봇 카메라 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Camera Feed</h2>
          <div className="grid grid-cols-2 gap-2">
            {/* 현재 컴퓨터 웹캠 */}
            <div className="bg-gray-200 p-2 rounded">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Computer Webcam</h3>
              <video ref={webcamRef} autoPlay playsInline className="w-full h-48 rounded" />
            </div>

            {/* 로봇 카메라 (추후 연결) */}
            <div className="bg-gray-200 p-2 rounded flex items-center justify-center">
              <h3 className="text-lg font-medium text-gray-700">Robot Camera (Coming Soon)</h3>
            </div>
          </div>
        </div>

        {/* 우측: 인식된 이미지 및 분석 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Object Recognition</h2>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Detected image will appear here</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Recognition Result</h3>
            <p className="text-gray-600">No data available</p>
          </div>
        </div>
      </div>

  );
};

export default Monitoring;
