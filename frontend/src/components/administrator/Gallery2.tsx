import React from 'react';
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
];

const Gallery2: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Gallery</h1>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            onClick={() => setSelectedImage(src)}
          >
            <img src={src} alt={`Gallery ${index}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>

      {/* 모달 (이미지 클릭 시 확대) */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-black text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              <HiOutlineX />
            </button>
            <img src={selectedImage} alt="Selected" className="max-w-[90vw] max-h-[80vh] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery2;