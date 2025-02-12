import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  likes: number;
  comments: string[];
  description: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedComments, setSelectedComments] = useState<string[] | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 갤러리 아이템 추가
  const handleAddImage = () => {
    if (newImage) {
      const newItem: GalleryItem = {
        id: galleryItems.length + 1,
        src: URL.createObjectURL(newImage),
        alt: newImage.name,
        likes: 0,
        comments: [],
        description,
      };
      setGalleryItems([...galleryItems, newItem]);
      setNewImage(null);
      setPreviewImage(null);
      setDescription('');
      setShowUploadModal(false); // 업로드 후 모달 닫기
    }
  };

  // 댓글 추가
  const handleAddComment = (id: number) => {
    if (newComments[id]) {
      setGalleryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, comments: [...item.comments, newComments[id]] }
            : item
        )
      );
      setNewComments((prev) => ({ ...prev, [id]: '' }));
    }
  };

  // 댓글 보기 모달
  const handleShowCommentsModal = (comments: string[], id: number) => {
    setSelectedImageId(id);
    setSelectedComments(comments);
  };


  // 댓글 삭제
  const handleDeleteComment = (imageId: number, commentIndex: number) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      setGalleryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === imageId
            ? {
                ...item,
                comments: item.comments.filter((_, index) => index !== commentIndex),
              }
            : item
        )
      );

      // 선택된 댓글도 업데이트
      if (selectedComments) {
        const updatedComments = selectedComments.filter((_, i) => i !== commentIndex);
        setSelectedComments(updatedComments);
      }
    }
  };


  // 이미지 삭제
  const handleDeleteImage = (id: number) => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      setGalleryItems(galleryItems.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">프로젝트 갤러리</h1>

      {/* 업로드 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowUploadModal(true)}
          className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          사진 업로드
        </button>
      </div>

      {/* 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} // 모달 클릭 시 닫히지 않도록
          >
            <h2 className="text-2xl mb-4">사진 업로드</h2>

            {/* 파일 선택 */}
            <input
              type="file"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {previewImage && (
              <div className="w-48 h-48 border rounded-lg overflow-hidden mb-4">
                <img
                  src={previewImage}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 설명 입력 */}
            <input
              type="text"
              placeholder="이미지 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* 업로드 버튼 */}
            <button
              onClick={handleAddImage}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
            >
              업로드
            </button>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="mt-4 w-full p-2 text-center text-red-500"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 갤러리 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {galleryItems.map((item) => (
          <div key={item.id} className="relative bg-gray-200 rounded-lg overflow-hidden p-4 flex flex-col justify-between h-full">
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDeleteImage(item.id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              삭제
            </button>

            {/* 이미지 클릭 시 확대 */}
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => setSelectedImage(item.src)}
            />

            {/* 설명 부분 */}
            <div className="mt-2 flex flex-col justify-between flex-1">
              <div className="bg-white p-3 rounded-lg max-h-16 overflow-y-auto">
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>

            {/* 좋아요 버튼 */}
            <div>
              <button
                onClick={() => {}}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded-full w-auto flex items-center justify-center"
              >
                <span className="mr-1">♥</span>
                <span>{item.likes}</span>
              </button>
            </div>

            {/* 댓글 보기 버튼 */}
            <div className="mt-4">
              <button
                onClick={() => handleShowCommentsModal(item.comments, item.id)}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                댓글 보기
              </button>
            </div>

            {/* 댓글 입력 */}
            <div className="mt-2 flex">
              <input
                type="text"
                value={newComments[item.id] || ''}
                onChange={(e) => setNewComments((prev) => ({ ...prev, [item.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(item.id);
                  }
                }}
                placeholder="댓글을 입력하세요"
                className="flex-1 p-2 border rounded-l-lg"
              />
              <button
                onClick={() => handleAddComment(item.id)}
                className="px-3 bg-blue-500 text-white rounded-r-lg"
              >
                등록
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 선택한 이미지 창 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white p-4 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
            <button onClick={() => setSelectedImage(null)} className="mt-4 p-2 text-red-500">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 댓글 모달 */}
      {selectedComments && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedComments(null)}
        >
          <div
            className="bg-white p-4 rounded-lg relative w-96 h-90 max-h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="text-gray-700 text-sm mt-2 space-y-1 max-h-48 overflow-y-auto">
              {selectedComments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span>{comment}</span>
                  <button
                    onClick={() => handleDeleteComment(selectedImageId!, index)}
                    className="ml-2 text-red-500"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedComments(null)} className="mt-4 p-2 text-red-500">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
