import React, { useState, useEffect } from 'react';
import { HiOutlineX, HiTrash } from "react-icons/hi";

const Gallery2: React.FC = () => {

  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);


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

  const handleDelete = async (imageName: string) => {
    if (!window.confirm(`"${imageName}" 파일을 삭제하시겠습니까?`)) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: imageName }),
      });

      if (response.ok) {
        setImages(images.filter((img) => img.name !== imageName));
        setSelectedImage(null);
      } else {
        console.error("Error deleting image");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Gallery</h1>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.url} alt={img.name} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>

    {/* 모달 */}
    {selectedImage && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="relative bg-white px-4 pb-4 rounded-lg shadow-lg">
          {/* 닫기 버튼 (우측 상단) */}
          <button className="absolute top-2 right-2 text-black text-2xl" onClick={() => setSelectedImage(null)}>
            <HiOutlineX />
          </button>

          {/* 파일명 + 삭제 버튼 (가운데 정렬) */}
          <div className="flex items-center justify-start gap-1 mb-1 px-4">
            <p className="text-lg font-semibold">{selectedImage.name}</p>
            <button onClick={() => handleDelete(selectedImage.name)} className="text-red-500 text-xl hover:text-red-600">
              <HiTrash />
            </button>
          </div>

          {/* 이미지 */}
          <img src={selectedImage.url} alt="Selected" className="max-w-[90vw] max-h-[60vh] rounded-lg" />
        </div>
      </div>
    )}
  </div>
);
};

export default Gallery2;