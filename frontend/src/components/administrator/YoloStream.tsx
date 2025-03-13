import React from 'react';

interface YoloStreamProps {
  model: string;
}

const YoloStream: React.FC<YoloStreamProps> = ({ model }) => {
  return (
    <img
      alt="YOLO Streaming"
      src={`http://127.0.0.1:5000/video_yolo_dynamic?model=${model}`}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
};

export default YoloStream;