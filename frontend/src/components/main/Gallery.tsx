import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  likes: number;
  comments: string[];
  description: string;
  liked: boolean;
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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string>('');
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);

  // 댓글 수정 관련 상태: 갤러리 아이템별로 수정 중인 댓글의 인덱스와 편집 텍스트 저장
  const [editingComment, setEditingComment] = useState<{ [key: number]: { index: number; text: string } | null }>({});

  // 로컬 스토리지에서 갤러리 아이템 불러오기
  useEffect(() => {
    const savedGalleryItems = localStorage.getItem('galleryItems');
    if (savedGalleryItems) {
      setGalleryItems(JSON.parse(savedGalleryItems));
    }
  }, []);

  // 갤러리 아이템을 로컬 스토리지에 저장
  const saveGalleryItemsToLocalStorage = (items: GalleryItem[]) => {
    localStorage.setItem('galleryItems', JSON.stringify(items));
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewImage(file);
        setPreviewImage(reader.result as string); 
      };
      
      reader.readAsDataURL(file);
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
        liked: false,
      };
      const updatedGalleryItems = [...galleryItems, newItem];
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      setNewImage(null);
      setPreviewImage(null);
      setDescription('');
      setShowUploadModal(false);
    }
  };

  // 댓글 추가
  const handleAddComment = (id: number) => {
    if (newComments[id]) {
      const updatedGalleryItems = galleryItems.map((item) =>
        item.id === id
          ? { ...item, comments: [...item.comments, newComments[id]] }
          : item
      );
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      setNewComments((prev) => ({ ...prev, [id]: '' }));
    }
  };

  // 댓글 보기 모달 열기
  const handleShowCommentsModal = (comments: string[], id: number) => {
    setSelectedImageId(id);
    setSelectedComments(comments);
    // 해당 갤러리 아이템의 댓글 수정 상태 초기화
    setEditingComment((prev) => ({ ...prev, [id]: null }));
  };

  // 댓글 삭제
  const handleDeleteComment = (imageId: number, commentIndex: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const updatedGalleryItems = galleryItems.map(item =>
        item.id === imageId
          ? { ...item, comments: item.comments.filter((_, index) => index !== commentIndex) }
          : item
      );
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      if (selectedComments && selectedImageId === imageId) {
        const updatedSelectedComments = selectedComments.filter((_, index) => index !== commentIndex);
        setSelectedComments(updatedSelectedComments);
      }
    }
  };

  // 댓글 수정 (저장)
  const handleSaveCommentEdit = (imageId: number, commentIndex: number, newComment: string) => {
    const updatedGalleryItems = galleryItems.map(item =>
      item.id === imageId
        ? { ...item, comments: item.comments.map((comment, index) => index === commentIndex ? newComment : comment) }
        : item
    );
    setGalleryItems(updatedGalleryItems);
    saveGalleryItemsToLocalStorage(updatedGalleryItems);
    if (selectedComments && selectedImageId === imageId) {
      const updatedSelectedComments = selectedComments.map((comment, index) =>
        index === commentIndex ? newComment : comment
      );
      setSelectedComments(updatedSelectedComments);
    }
    // 편집 상태 초기화
    setEditingComment((prev) => ({ ...prev, [imageId]: null }));
  };

  // 좋아요 증가 함수
  const handleLike = (id: number) => {
    const updatedGalleryItems = galleryItems.map((item) =>
      item.id === id
        ? { ...item, likes: item.liked ? item.likes - 1 : item.likes + 1, liked: !item.liked }
        : item
    );
    setGalleryItems(updatedGalleryItems);
    saveGalleryItemsToLocalStorage(updatedGalleryItems);
  };

  // 이미지 삭제
  const handleDeleteImage = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      const updatedGalleryItems = galleryItems.filter((item) => item.id !== id);
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
    }
  };

  // 수정 모달 열기
  const handleShowEditModal = (id: number, currentDescription: string, currentSrc: string) => {
    setSelectedImageId(id);
    setEditDescription(currentDescription);
    setEditPreviewImage(currentSrc);
    setShowEditModal(true);
  };

  // 수정 이미지 업로드 핸들러
  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setEditImage(file);
        setEditPreviewImage(reader.result as string); 
      };
      
      reader.readAsDataURL(file);
    }
  };

  // 설명 및 이미지 수정 저장
  const handleSaveEdit = () => {
    if (selectedImageId !== null) {
      const updatedGalleryItems = galleryItems.map((item) =>
        item.id === selectedImageId
          ? { 
              ...item, 
              description: editDescription,
              src: editImage ? URL.createObjectURL(editImage) : item.src,
              alt: editImage ? editImage.name : item.alt
            }
          : item
      );
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      setShowEditModal(false);
      setEditImage(null);
      setEditPreviewImage(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        프로젝트 갤러리
      </h1>

      {/* 업로드 버튼 */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowUploadModal(true)}
          className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          사진 업로드
        </button>
      </div>

      {/* 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl mb-4 text-gray-800">사진 업로드</h2>
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
            <input
              type="text"
              placeholder="이미지 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4 w-full"
            />
            <button
              onClick={handleAddImage}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 shadow"
            >
              업로드
            </button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg overflow-hidden p-4 flex flex-col justify-between 
              w-full h-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDeleteImage(item.id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full opacity-80 hover:opacity-100 transition-opacity"
            >
              삭제
            </button>

            {/* 이미지 */}
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-48 object-cover cursor-pointer rounded-md mb-4"
              onClick={() => setSelectedImage(item.src)}
            />

            {/* 설명 및 수정 버튼 */}
            <div className="mb-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-inner">
                <p className="text-gray-700">{item.description}</p>
              </div>
              <button
                onClick={() => handleShowEditModal(item.id, item.description, item.src)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition duration-300 shadow"
              >
                수정
              </button>
            </div>

            {/* 댓글 리스트 */}
            {item.comments.length > 0 && (
              <div className="bg-gray-100 p-3 rounded-lg shadow-inner mb-4">
                <h3 className="font-semibold mb-2">댓글</h3>
                <ul className="space-y-2 max-h-28 overflow-y-auto text-sm">
                  {item.comments.map((comment, index) => (
                    <li key={index} className="text-gray-700 flex justify-between items-center">
                      <span>{comment}</span>
                      {/*<button
                        onClick={() => handleDeleteComment(item.id, index)}
                        className="text-red-500 hover:underline"
                      >
                        삭제
                      </button>*/}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 좋아요 버튼 및 댓글 보기 버튼 */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleLike(item.id)}
                className={`flex items-center px-3 py-1 rounded-full transition duration-300 shadow ${
                  item.liked ? 'bg-gray-400' : 'bg-red-500'
                } text-white hover:bg-red-400`}
              >
                <span className="mr-1">♥</span>
                <span>{item.likes}</span>
              </button>
              <button
                onClick={() => handleShowCommentsModal(item.comments, item.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-300 shadow"
              >
                댓글 보기
              </button>
            </div>

            {/* 댓글 입력 */}
            <div className="mt-4 flex">
              <input
                type="text"
                value={newComments[item.id] || ''}
                onChange={(e) =>
                  setNewComments((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(item.id);
                  }
                }}
                placeholder="댓글을 입력하세요"
                className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleAddComment(item.id)}
                className="px-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-400 transition duration-300"
              >
                등록
              </button>
            </div>
          </div>
        ))}
        {galleryItems.length % 2 !== 0 && <div className="w-[calc(50%-16px)] h-0"></div>}
      </div>

      {/* 선택한 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-lg relative shadow-2xl transform"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '800px', height: '600px' }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
      )}

      {/* 댓글 모달 (댓글 수정 기능 포함) */}
      {selectedComments && selectedImageId !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedComments(null)}
        >
          <div
            className="bg-white p-6 rounded-lg relative w-[500px] max-h-full overflow-y-auto shadow-xl transform"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">댓글 목록</h2>
            <ul className="text-gray-700 text-sm space-y-3 max-h-80 overflow-y-auto">
              {selectedComments.map((comment, index) => {
                const isEditing =
                  editingComment[selectedImageId] &&
                  editingComment[selectedImageId]!.index === index;
                return (
                  <li key={index} className="bg-gray-100 p-3 rounded flex justify-between items-center">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editingComment[selectedImageId]!.text}
                          onChange={(e) =>
                            setEditingComment((prev) => ({
                              ...prev,
                              [selectedImageId]: { index, text: e.target.value },
                            }))
                          }
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          onClick={() =>
                            handleSaveCommentEdit(
                              selectedImageId,
                              index,
                              editingComment[selectedImageId]!.text
                            )
                          }
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          저장
                        </button>
                        <button
                          onClick={() =>
                            setEditingComment((prev) => ({ ...prev, [selectedImageId]: null }))
                          }
                          className="ml-2 text-gray-500 hover:underline"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{comment}</span>
                        <div>
                          <button
                            onClick={() =>
                              setEditingComment((prev) => ({
                                ...prev,
                                [selectedImageId]: { index, text: comment },
                              }))
                            }
                            className="ml-2 text-blue-500 hover:underline"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteComment(selectedImageId, index)}
                            className="ml-2 text-red-500 hover:underline"
                          >
                            삭제
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setSelectedComments(null)}
              className="mt-6 w-full p-2 text-center text-red-500 border border-red-500 rounded hover:bg-red-50 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl mb-4 text-gray-800">설명 및 사진 수정</h2>
            <input
              type="file"
              onChange={handleEditImageUpload}
              className="mb-4"
            />
            {editPreviewImage && (
              <div className="w-48 h-48 border rounded-lg overflow-hidden mb-4">
                <img
                  src={editPreviewImage}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            />
            <button
              onClick={handleSaveEdit}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow"
            >
              저장
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="mt-4 w-full p-2 text-center text-red-500"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
