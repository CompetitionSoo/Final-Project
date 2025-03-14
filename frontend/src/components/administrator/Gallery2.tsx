import React, { useState, useEffect } from 'react';
import { HiOutlineX } from "react-icons/hi";

import AWS from 'aws-sdk'

/* const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
]; */

const Gallery2: React.FC = () => {

  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const fetchImages = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try { //fetch로 해당 엔드포인트에 데이터 요청
      const response = await fetch("http://localhost:5000/api/admingallery", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
      });

      const data = await response.json(); //받아온 JSON data에 저장
      if (response.ok) {
        setImages(data.images);
      } else {
        console.error("Error fetching images:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [])

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