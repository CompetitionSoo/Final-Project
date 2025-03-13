import React, { useState, useEffect } from "react";

const Monitoring: React.FC = () => {
  // 카메라 스트리밍 URL 리스트 (서버에서 제공)
  const cameraStreams = [
    "http://127.0.0.1:5000/video_feed",
    "http://127.0.0.1:5000/video_gray",
    "http://127.0.0.1:5000/video_yolo",
    "http://127.0.0.1:5000/camera4",
  ];

  // 선택된 카메라 URL을 저장하는 상태
  const [selectedCameras, setSelectedCameras] = useState<string[]>([
    cameraStreams[0], // 기본 카메라 1번
    cameraStreams[1],
    cameraStreams[2],
    cameraStreams[3],
  ]);

  // 카메라 변경 핸들러
  const handleCameraChange = (index: number, streamUrl: string) => {
    const updatedCameras = [...selectedCameras];
    updatedCameras[index] = streamUrl;
    setSelectedCameras(updatedCameras);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📡 웹캠 모니터링</h2>

      {/* 2x2 그리드 형태로 카메라 모니터링 */}
      <div className="grid grid-cols-2 gap-4 h-screen">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">CCTV {index + 1}</h3>

            {/* 카메라 선택 드롭다운 */}
            <select
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={selectedCameras[index]}
              onChange={(e) => handleCameraChange(index, e.target.value)}
            >
              {cameraStreams.map((streamUrl, i) => (
                <option key={i} value={streamUrl}>
                  카메라 {i + 1}
                </option>
              ))}
            </select>

            {/* MJPEG 이미지 스트리밍 */}
            <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={selectedCameras[index]}
                alt={`Camera ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitoring;
