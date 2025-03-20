import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content?: string;
  thumbnail?: string;
  authorId: number;
}

interface Comment {
  id: number;
  postId: number;
  text: string;
  authorId: number;
}

interface User {
  id: number;
  username: string;
}

const Gallery: React.FC = () => {
  // 현재 로그인한 사용자 정보 (localStorage에서 "user"로 저장되어 있다고 가정)
  const currentUser: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [createPostModal, setCreatePostModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 글쓰기 모달 데이터
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  // 게시글 수정 데이터
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 댓글 상태
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>("");

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    const savedComments = localStorage.getItem("comments");
    if (savedComments) setComments(JSON.parse(savedComments));
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setEditTitle(selectedPost.title);
      setEditContent(selectedPost.content || "");
      setImage(selectedPost.thumbnail || null);
    }
  }, [selectedPost]);

  // Disable background scroll when detail modal is open
  useEffect(() => {
    if (showDetailModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [showDetailModal]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
  };

  const handleUpload = () => {
    if (!title.trim()) {
      alert("제목은 필수 입력입니다.");
      return;
    }
    if (!content.trim() && !image) {
      alert("내용 또는 이미지 중 최소 한 가지 이상 입력되어야 합니다.");
      return;
    }
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      thumbnail: image || "",
      authorId: currentUser ? currentUser.id : -1,
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setTitle("");
    setContent("");
    setImage(null);
    setCreatePostModal(false);
  };

  const handleUpdatePost = () => {
    const updatedPosts = posts.map((post) =>
      post.id === selectedPost!.id
        ? { ...post, title: editTitle, content: editContent, thumbnail: image || post.thumbnail }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    const updatedPost = updatedPosts.find((post) => post.id === selectedPost!.id);
    setSelectedPost(updatedPost || null);
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    const updatedPosts = posts.filter((post) => post.id !== selectedPost!.id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setShowDetailModal(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = {
      id: Date.now(),
      postId: selectedPost!.id,
      text: newComment,
      authorId: currentUser ? currentUser.id : -1,
    };
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleUpdateComment = (id: number, newText: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleDeleteComment = (id: number) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleCloseCreateModal = () => {
    resetForm();
    setCreatePostModal(false);
  };

  const handleOpenDetailModal = (post: Post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedPost(null);
    setShowDetailModal(false);
    setIsEditing(false);
    setEditingCommentId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      if (showDetailModal) {
        handleCloseDetailModal(); // 모달 닫기
        navigate("/gallery"); // 갤러리 화면으로 이동
      }
    };

    if (showDetailModal) {
      window.history.pushState(null, "", window.location.pathname); // 현재 상태 저장
      window.addEventListener("popstate", handleBack);
    }

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [showDetailModal, navigate]);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* 글쓰기 버튼 */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            resetForm();
            setCreatePostModal(true);
          }}
          className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg"
        >
          글쓰기
        </button>
      </div>

      {/* 글쓰기 모달 */}
      {createPostModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 mb-2 rounded"
            />
            <textarea
              placeholder="내용을 입력하세요 (선택 사항)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 border p-2 mb-2 rounded resize-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {image && (
              <div className="relative mb-2">
                <img
                  src={image}
                  alt="미리보기"
                  className="w-full h-full object-contain rounded-md mb-4 max-h-[40vh] overflow-y-auto"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 p-1"
                >
                  <AiOutlineClose className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                업로드
              </button>
              <button
                onClick={handleCloseCreateModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleOpenDetailModal(post)}
            className="bg-[#F2F6F8] shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 hover:scale-105"
          >
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className={`p-4 ${!post.thumbnail ? "min-h-72" : ""}`}>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-left">
                {post.content
                  ? post.content.length > 50
                    ? post.content.slice(0, 50) + "..."
                    : post.content
                  : "(내용 없음)"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 게시글 모달 */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 w-full h-full max-w-none relative overflow-auto">
            <button
              onClick={handleCloseDetailModal}
              className="fixed top-4 right-4 p-2 bg-gray-300 rounded-full"
            >
              <AiOutlineClose className="w-6 h-6 text-gray-700" />
            </button>
            {isEditing ? (
              <>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border p-2 mb-2 rounded"
                  
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
                {image && (
                  <div className="relative mb-2">
                    <img
                      src={image}
                      alt="미리보기"
                      className="w-full h-full object-contain rounded-md mb-4 max-h-[40vh] overflow-y-auto"
                    />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute top-1 right-1 p-1"
                    >
                      <AiOutlineClose className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
                <textarea
                  placeholder="내용을 입력하세요 (선택 사항)"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full min-h-[60vh] overflow-y-auto border p-2 mb-2 rounded resize-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleUpdatePost}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    수정 완료
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedPost.title}
                </h2>
                {selectedPost.thumbnail && (
                  <div className="mb-4 flex justify-center items-center">
                    <img
                      src={selectedPost.thumbnail}
                      alt={selectedPost.title}
                      className="w-full h-auto object-contain mb-4 rounded max-h-[60vh] overflow-y-auto"
                    />
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 whitespace-pre-line text-lg text-left overflow-y-auto">
                    {selectedPost.content}
                  </p>
                </div>
                <div className="flex justify-end gap-2 mb-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">댓글</h3>
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border p-2 rounded"
                  placeholder="댓글 입력..."
                />
                <button
                  onClick={handleAddComment}
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  댓글 작성
                </button>
              </div>
              <ul className="mt-4">
                {comments
                  .filter((c) => c.postId === selectedPost.id)
                  .map((c) => (
                    <li
                      key={c.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      {editingCommentId === c.id ? (
                        <>
                          <input
                            type="text"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="border p-1 flex-1 mr-2"
                          />
                          <button
                            onClick={() => {
                              handleUpdateComment(c.id, editCommentText);
                              setEditingCommentId(null);
                            }}
                            className="bg-blue-500 text-white px-2 py-1"
                          >
                            완료
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="bg-gray-500 text-white px-2 py-1 ml-2"
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{c.text}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingCommentId(c.id);
                                setEditCommentText(c.text);
                              }}
                              className="text-blue-500 hover:underline"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDeleteComment(c.id)}
                              className="text-red-500 hover:underline"
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
