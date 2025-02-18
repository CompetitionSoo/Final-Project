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
    <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-medium text-gray-800 mb-2"></h3>
    <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full rounded-lg"
    ></video>
    </div>
    );
};

export default Webcam;
