import React from 'react';
import "./YoloStream.css";

    const YoloStream: React.FC = () => {
    return (
        <div className="yolo-container">
        <img
            src="http://localhost:5000/yolo-stream"
            alt="YOLO 감지 화면"
            className="yolo-stream w-full h-full object-cover rounded-lg"
        />
        </div>
    );
};

export default YoloStream;