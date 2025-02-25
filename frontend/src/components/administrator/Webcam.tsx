import React, { useEffect, useRef } from 'react';

const Webcam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('웹캠에 접근하는 중 오류 발생:', err);
      }
    };

    startWebcam();

    // 컴포넌트가 unmount 될 때 스트림을 멈추기
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="webcam-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"  // 비디오 요소 스타일 추가
      ></video>
    </div>
  );
};

export default Webcam;
