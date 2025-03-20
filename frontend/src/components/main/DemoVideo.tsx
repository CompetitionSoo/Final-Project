import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";

const videoList = [
  "/videos/login.mp4",
  "/videos/과일,채소.mp4",
  "/videos/라인트레이싱영상.mp4",
];

const DemoVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // 다음 동영상으로 변경하는 함수
  const goToNextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  // 이전 동영상으로 변경하는 함수
  const goToPreviousVideo = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoList.length - 1 : prevIndex - 1
    );
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    goToNextVideo(); // 동영상이 끝나면 다음 동영상으로 변경
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <section
      id="view"
      className="relative min-h-screen bg-gray-900 pb-4 pt-8 scroll-mt-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            프로젝트 영상
          </h2>

          <div
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <video
              key={videoList[currentIndex]} // 동영상이 변경될 때 새로 로드되도록 설정
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              onEnded={handleVideoEnded}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              aria-label="Project demonstration video"
            >
              <source src={videoList[currentIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* 재생/일시정지 버튼 */}
            <AnimatePresence>
              {(isHovering || !isPlaying) && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handlePlayPause}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-white/20 hover:bg-white/30 rounded-full p-4 backdrop-blur-sm
                           transition-all duration-300 ease-in-out"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  tabIndex={0}
                >
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isPlaying ? (
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* 이전/다음 버튼 추가 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToPreviousVideo}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              이전 영상
            </button>
            <button
              onClick={goToNextVideo}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              다음 영상
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mt-8 text-center"
          >
            실제 작동하는 물류 로봇의 데모 영상입니다.
            자율 주행 및 물품 운반 과정을 확인하실 수 있습니다.
          </motion.p>
        </motion.div>
      </div>

      <div>
        <ScrollIndicator target="#hero" />
      </div>
    </section>
  );
};

export default DemoVideo;
