import React, { useState, useEffect, useRef } from "react";

const Monitoring: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(4).fill(null));
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameras, setSelectedCameras] = useState<string[]>(["", "", "", ""]);

  
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((device) => device.kind === "videoinput");
      setCameraDevices(videoInputs);

      //  첫 번째 카메라 자동 실행
      if (videoInputs.length > 0) {
        startCameraStream(0, videoInputs[0].deviceId); 
        setSelectedCameras((prev) => [videoInputs[0].deviceId, "", "", ""]);
      }
    });
  }, []);


  const startCameraStream = (index: number, deviceId: string) => {
    if (!deviceId) {
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.srcObject = null;
      }
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: { exact: deviceId } } })
      .then((stream) => {
        if (videoRefs.current[index]) {
          videoRefs.current[index]!.srcObject = stream;
        }
      })
      .catch((err) => console.error(`웹캠 ${index + 1} 오류:`, err));
  };

  
  const handleCameraChange = (index: number, deviceId: string) => {
    const updatedCameras = [...selectedCameras];
    updatedCameras[index] = deviceId;
    setSelectedCameras(updatedCameras);
    startCameraStream(index, deviceId);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📡 웹캠 모니터링</h2>

      
      <div className="grid grid-cols-2 gap-4 h-screen">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">카메라 {index + 1}</h3>

            
            <select
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={selectedCameras[index]}
              onChange={(e) => handleCameraChange(index, e.target.value)}
            >
              <option value="">카메라 선택</option>
              {cameraDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `카메라 ${device.deviceId}`}
                </option>
              ))}
            </select>

            
            <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                autoPlay
                playsInline
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
