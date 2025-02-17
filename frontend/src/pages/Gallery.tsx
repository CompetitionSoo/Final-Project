import React from 'react';

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
  // 좋아요 증가 함수 추가
  const handleLike = (id: number) => {
    setGalleryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Gallery items will go here */}
        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-300 hover:opacity-75 transition-opacity duration-300">
            {/* Image placeholder */}
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
                onClick={() => handleLike(item.id)}
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
    </div>
  );
};

export default Gallery; 