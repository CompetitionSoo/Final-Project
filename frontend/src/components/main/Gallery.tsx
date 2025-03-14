import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaEdit, FaTrash, FaComments } from "react-icons/fa";

// 댓글 타입 (작성자 정보 추가)
interface Comment {
  text: string;
  author: string;
}

// 갤러리 아이템 인터페이스 (업로더 정보 추가)
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  likes: number;
  comments: Comment[];
  description: string;
  liked: boolean;
  uploadedBy: string; // 업로드한 사용자의 ID
}

// 로그인 여부 확인 함수
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// 현재 사용자 정보 반환
const getCurrentUser = () => {
  // 실제 환경에서는 컨텍스트나 전역 상태 관리에서 가져올 수 있음
  return { id: localStorage.getItem("userId") || "", name: "User" };
};

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedComments, setSelectedComments] = useState<Comment[] | null>(
    null
  );
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 댓글 수정 관련 상태: 갤러리 아이템별로 수정 중인 댓글의 인덱스와 편집 텍스트 저장
  const [editingComment, setEditingComment] = useState<{
    [key: number]: { index: number; text: string } | null;
  }>({});

  const navigate = useNavigate();

  // 로컬 스토리지에서 갤러리 아이템 불러오기
  useEffect(() => {
    const savedGalleryItems = localStorage.getItem("galleryItems");
    const galleryArray = savedGalleryItems ? JSON.parse(savedGalleryItems) : [];
    if (galleryArray.length > 0) {
      setGalleryItems(galleryArray);
    } else {
      // 기본 게시글 생성
      const defaultItem: GalleryItem = {
        id: 1,
        src: "/images/image1.png",
        alt: "default image",
        likes: 0,
        comments: [],
        description: "게시글",
        liked: false,
        uploadedBy: "defaultUser",
      };
      setGalleryItems([defaultItem]);
      saveGalleryItemsToLocalStorage([defaultItem]);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 갤러리 아이템을 로컬 스토리지에 저장
  const saveGalleryItemsToLocalStorage = (items: GalleryItem[]) => {
    localStorage.setItem("galleryItems", JSON.stringify(items));
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewImage(reader.result as string);
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // 갤러리 아이템 추가 (업로드 시 로그인한 사용자 정보 추가)
  const handleAddImage = () => {
    if (isAuthenticated()) {
      const newItem: GalleryItem = {
        id: galleryItems.length + 1,
        src: newImage || "",
        alt: newImage ? "Uploaded Image" : "",
        likes: 0,
        comments: [],
        description,
        liked: false,
        uploadedBy: getCurrentUser().id,
      };
      const updatedGalleryItems = [...galleryItems, newItem];
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      setNewImage(null);
      setPreviewImage(null);
      setDescription("");
      setShowUploadModal(false);
    }
  };

  // 댓글 추가 (로그인한 사용자만 작성 가능)
  const handleAddComment = (id: number) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (newComments[id]) {
      const comment: Comment = {
        text: newComments[id],
        author: getCurrentUser().id,
      };
      const updatedGalleryItems = galleryItems.map((item) =>
        item.id === id
          ? { ...item, comments: [...item.comments, comment] }
          : item
      );
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      setNewComments((prev) => ({ ...prev, [id]: "" }));
    }
  };

  // 댓글 보기 모달 열기
  const handleShowCommentsModal = (comments: Comment[], id: number) => {
    setSelectedImageId(id);
    setSelectedComments(comments);
    // 해당 갤러리 아이템의 댓글 수정 상태 초기화
    setEditingComment((prev) => ({ ...prev, [id]: null }));
  };

  // 댓글 삭제 (자신의 댓글만 삭제 가능)
  const handleDeleteComment = (imageId: number, commentIndex: number) => {
    const item = galleryItems.find((item) => item.id === imageId);
    if (!item) return;
    const comment = item.comments[commentIndex];
    if (!isAuthenticated() || comment.author !== getCurrentUser().id) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const updatedGalleryItems = galleryItems.map((item) =>
        item.id === imageId
          ? {
              ...item,
              comments: item.comments.filter(
                (_, index) => index !== commentIndex
              ),
            }
          : item
      );
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
      if (selectedComments && selectedImageId === imageId) {
        const updatedSelectedComments = selectedComments.filter(
          (_, index) => index !== commentIndex
        );
        setSelectedComments(updatedSelectedComments);
      }
    }
  };

  // 댓글 수정 (저장) - 자신이 작성한 댓글만 수정 가능
  const handleSaveCommentEdit = (
    imageId: number,
    commentIndex: number,
    newComment: string
  ) => {
    const item = galleryItems.find((item) => item.id === imageId);
    if (!item) return;
    const comment = item.comments[commentIndex];
    if (!isAuthenticated() || comment.author !== getCurrentUser().id) {
      alert("수정 권한이 없습니다.");
      return;
    }
    const updatedGalleryItems = galleryItems.map((item) =>
      item.id === imageId
        ? {
            ...item,
            comments: item.comments.map((comment, index) =>
              index === commentIndex
                ? { ...comment, text: newComment }
                : comment
            ),
          }
        : item
    );
    setGalleryItems(updatedGalleryItems);
    saveGalleryItemsToLocalStorage(updatedGalleryItems);
    if (selectedComments && selectedImageId === imageId) {
      const updatedSelectedComments = selectedComments.map((comment, index) =>
        index === commentIndex ? { ...comment, text: newComment } : comment
      );
      setSelectedComments(updatedSelectedComments);
    }
    // 편집 상태 초기화
    setEditingComment((prev) => ({ ...prev, [imageId]: null }));
  };

  // 좋아요 증가 함수 (로그인한 사용자만 가능)
  const handleLike = (id: number) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    const updatedGalleryItems = galleryItems.map((item) =>
      item.id === id
        ? {
            ...item,
            likes: item.liked ? item.likes - 1 : item.likes + 1,
            liked: !item.liked,
          }
        : item
    );
    setGalleryItems(updatedGalleryItems);
    saveGalleryItemsToLocalStorage(updatedGalleryItems);
  };

  // 이미지 삭제 (자신이 업로드한 이미지만 삭제 가능)
  const handleDeleteImage = (id: number) => {
    const item = galleryItems.find((item) => item.id === id);
    if (!item) return;
    if (!isAuthenticated() || item.uploadedBy !== getCurrentUser().id) {
      alert("삭제 권한이 없습니다.");
      return;
    }
    if (window.confirm("삭제하시겠습니까?")) {
      const updatedGalleryItems = galleryItems.filter((item) => item.id !== id);
      setGalleryItems(updatedGalleryItems);
      saveGalleryItemsToLocalStorage(updatedGalleryItems);
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  // 수정 모달 열기
  const handleShowEditModal = (
    id: number,
    currentDescription: string,
    currentSrc: string
  ) => {
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
        setEditImage(reader.result as string);
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
              src: editImage || item.src,
              alt: editImage ? "Edited Image" : item.alt,
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
      {/* 업로드 버튼 */}
      <div className="flex justify-end mb-6">
        {isAuthenticated() ? (
          <button
            onClick={() => setShowUploadModal(true)}
            className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            업로드
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            로그인 후 업로드
          </button>
        )}
      </div>

      {/* 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg relative shadow-xl transform flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "800px",
              maxHeight: "800px",
            }}
          >
            <div className="flex-shrink-0">
              <input
                type="file"
                onChange={handleImageUpload}
                className="mb-4"
              />
            </div>

            {/* 본문: 이미지 미리보기 및 텍스트 영역 (스크롤 가능) */}
            <div className="flex-grow overflow-y-auto">
              {previewImage && (
                <div className="w-full h-64 object-contain cursor-pointer rounded-md mb-4">
                  <img
                    src={previewImage}
                    alt="미리보기"
                    className="w-full h-full object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              )}
              <textarea
                placeholder="이미지 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full h-80 resize-none"
                style={{ minHeight: "120px" }} // 최소 높이 설정
              />
            </div>

            {/* 푸터: 업로드, 닫기 버튼 (항상 하단 고정) */}
            <div className="flex-shrink-0 mt-4 flex space-x-4">
              <button
                onClick={handleAddImage}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow"
              >
                업로드
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full p-3 text-center text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 갤러리 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-[#F2F6F8] rounded-lg overflow-hidden p-4 flex flex-col justify-between w-full h-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {/* 오른쪽 상단 메뉴 (로그인 상태이며 업로더인 경우에만 표시) */}
            {isAuthenticated() && getCurrentUser().id === item.uploadedBy && (
              <div className="absolute top-2 right-2">
                {/* 세로 점 아이콘 버튼 */}
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="flex items-center bg-transparent text-gray-700 p-2 rounded-full transition-colors"
                >
                  <FaEllipsisV className="w-5 h-5" />
                </button>

                {/* 드롭다운 메뉴 */}
                {openMenu === item.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-10"
                  >
                    <button
                      onClick={() => {
                        handleShowEditModal(
                          item.id,
                          item.description,
                          item.src
                        );
                        closeMenu();
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg"
                    >
                      <FaEdit className="w-4 h-4 mr-2" /> 수정하기
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteImage(item.id);
                        closeMenu();
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 last:rounded-b-lg"
                    >
                      <FaTrash className="w-4 h-4 mr-2" /> 삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 이미지 */}
            {item.src && (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-48 object-contain cursor-pointer rounded-md mb-4"
                onClick={() => setSelectedImage(item.src)}
              />
            )}

            {/* 설명 */}
            <div className="mb-4">
              <div
                className={`bg-white p-3 rounded-lg shadow-inner overflow-y-auto text-left ${
                  item.src ? "h-28" : "h-80"
                }`}
              >
                <p
                  className="text-gray-700 whitespace-pre-wrap"
                  style={{ textAlign: "justify" }}
                >
                  {item.description}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow-inner mb-4">
              <h3 className="font-semibold mb-2">댓글</h3>
              {/* 댓글 리스트 컨테이너에 고정 높이 설정 */}
              <div className="h-20 overflow-y-auto">
                {item.comments.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {item.comments.map((comment, index) => {
                      const isEditing =
                        editingComment[item.id] &&
                        editingComment[item.id]!.index === index;
                      return (
                        <li
                          key={index}
                          className="text-gray-700 flex justify-between items-center"
                        >
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={editingComment[item.id]!.text}
                                onChange={(e) =>
                                  setEditingComment((prev) => ({
                                    ...prev,
                                    [item.id]: { index, text: e.target.value },
                                  }))
                                }
                                className="flex-1 p-2 border rounded"
                              />
                              <button
                                onClick={() =>
                                  handleSaveCommentEdit(
                                    item.id,
                                    index,
                                    editingComment[item.id]!.text
                                  )
                                }
                                className="ml-2 text-blue-500 hover:underline"
                              >
                                저장
                              </button>
                              <button
                                onClick={() =>
                                  setEditingComment((prev) => ({
                                    ...prev,
                                    [item.id]: null,
                                  }))
                                }
                                className="ml-2 text-gray-500 hover:underline"
                              >
                                취소
                              </button>
                            </>
                          ) : (
                            <>
                              <span>{comment.text}</span>
                              {isAuthenticated() &&
                                comment.author === getCurrentUser().id && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() =>
                                        setEditingComment((prev) => ({
                                          ...prev,
                                          [item.id]: {
                                            index,
                                            text: comment.text,
                                          },
                                        }))
                                      }
                                      className="text-blue-500 hover:underline"
                                    >
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteComment(item.id, index)
                                      }
                                      className="text-red-500 hover:underline"
                                    >
                                      삭제
                                    </button>
                                  </div>
                                )}
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  // 댓글이 없을 경우에도 고정된 영역 내에 안내 메시지 표시
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm">
                      작성된 댓글이 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 좋아요 버튼 및 댓글 보기 버튼 */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  isAuthenticated() ? handleLike(item.id) : navigate("/login")
                }
                className={`flex items-center px-3 py-1 rounded-full transition duration-300 shadow ${
                  item.liked ? "bg-gray-400" : "bg-red-500"
                } text-white hover:bg-red-400`}
              >
                <span className="mr-1">♥</span>
                <span>{item.likes}</span>
              </button>
              <button
                onClick={() => handleShowCommentsModal(item.comments, item.id)}
                className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300 shadow flex items-center"
              >
                <FaComments className="w-5 h-5" />
              </button>
            </div>

            {/* 댓글 입력 (비로그인 사용자는 비활성화) */}
            {isAuthenticated() && (
              <div className="mt-4 flex">
                <input
                  type="text"
                  value={newComments[item.id] || ""}
                  onChange={(e) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment(item.id);
                    }
                  }}
                  placeholder="댓글을 입력하세요"
                  className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleAddComment(item.id)}
                  className="px-3 bg-gray-900 text-white rounded-r-lg hover:bg-gray-700 transition duration-300 font-bold"
                >
                  등록
                </button>
              </div>
            )}
          </div>
        ))}
        {galleryItems.length % 2 !== 0 && (
          <div className="w-[calc(50%-16px)] h-0"></div>
        )}
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
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "1500px",
              maxHeight: "800px",
            }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
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
            className="bg-white p-6 rounded-lg relative overflow-y-auto shadow-xl transform flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "800px",
              maxHeight: "800px",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">댓글</h2>
            <ul className="text-gray-700 text-sm space-y-3 flex-grow overflow-y-auto">
              {selectedComments.map((comment, index) => {
                const isEditing =
                  editingComment[selectedImageId] &&
                  editingComment[selectedImageId]!.index === index;
                return (
                  <li
                    key={index}
                    className="bg-gray-100 p-3 rounded flex justify-between items-center"
                  >
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={editingComment[selectedImageId]!.text}
                          onChange={(e) =>
                            setEditingComment((prev) => ({
                              ...prev,
                              [selectedImageId]: {
                                index,
                                text: e.target.value,
                              },
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
                            setEditingComment((prev) => ({
                              ...prev,
                              [selectedImageId]: null,
                            }))
                          }
                          className="ml-2 text-gray-500 hover:underline"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{comment.text}</span>
                        <div>
                          {/* 댓글 수정/삭제 버튼은 댓글 작성자에게만 표시 */}
                          {isAuthenticated() &&
                            comment.author === getCurrentUser().id && (
                              <>
                                <button
                                  onClick={() =>
                                    setEditingComment((prev) => ({
                                      ...prev,
                                      [selectedImageId]: {
                                        index,
                                        text: comment.text,
                                      },
                                    }))
                                  }
                                  className="ml-2 text-blue-500 hover:underline"
                                >
                                  수정
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(selectedImageId, index)
                                  }
                                  className="ml-2 text-red-500 hover:underline"
                                >
                                  삭제
                                </button>
                              </>
                            )}
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
          <div
            className="bg-white p-6 rounded-lg relative shadow-xl transform flex flex-col"
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "800px",
              maxHeight: "800px",
            }}
          >
            <div className="flex-shrink-0">
              <input
                type="file"
                onChange={handleEditImageUpload}
                className="mb-4"
              />
            </div>

            {/* 본문: 이미지 미리보기 및 텍스트 영역 (스크롤 가능) */}
            <div className="flex-grow overflow-y-auto">
              {editPreviewImage && (
                <div className="w-full h-64 object-contain cursor-pointer rounded-md mb-4">
                  <img
                    src={editPreviewImage}
                    alt="미리보기"
                    className="w-full h-full object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              )}
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg mb-4 w-full h-80 resize-none"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>

            {/* 푸터: 저장, 닫기 버튼 (항상 하단 고정) */}
            <div className="flex-shrink-0 mt-4 flex space-x-4">
              <button
                onClick={handleSaveEdit}
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow"
              >
                저장
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full p-3 text-center text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
