import React from 'react';
import "./YoloStream.css";

    const YoloStream: React.FC = () => {
    return (
        <div className="yolo-container">
        <img alt="yolo 객체인식 스트리밍" src="http://127.0.0.1:5000/video_yolo" className="absolute top-0 left-0 w-full h-full object-cover" />
        </div>
    );
};

export default YoloStream;