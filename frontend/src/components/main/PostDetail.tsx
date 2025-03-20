import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

interface Comment {
  id: number;
  text: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  // 게시글 정보 가져오기
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("게시글 불러오기 실패:", err));
  
    fetch(`http://localhost:5000/post/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("댓글 불러오기 실패:", err));
  }, [id]);
  

  // 게시글 삭제
  const handleDelete = () => {
    fetch(`http://localhost:5000/post/${id}`, { method: "DELETE" })
      .then(() => {
        alert("게시글이 삭제되었습니다.");
        navigate("/gallery");
      })
      .catch((err) => console.error("삭제 실패:", err));
  };
  
  const handleAddComment = () => {
    if (newComment.trim() === "") return;
  
    fetch(`http://localhost:5000/post/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newComment }),
    })
      .then((res) => res.json())
      .then((data) => setComments([...comments, data]))
      .catch((err) => console.error("댓글 추가 실패:", err));
  
    setNewComment("");
  };
  
  

  // 댓글 수정
  const handleEditComment = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, text: editCommentText } : comment
    ));
    setEditingComment(null);
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      {post ? (
        <>
          <h2>{post.title}</h2>
          {post.imageUrl && <img src={post.imageUrl} alt="게시글 이미지" />}
          <p>{post.content}</p>
          <button onClick={handleDelete}>삭제</button>

          {/* 댓글 기능 */}
          <h3>댓글</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                {editingComment === comment.id ? (
                  <>
                    <input
                      type="text"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                    />
                    <button onClick={() => handleEditComment(comment.id)}>수정 완료</button>
                  </>
                ) : (
                  <>
                    {comment.text}
                    <button onClick={() => {
                      setEditingComment(comment.id);
                      setEditCommentText(comment.text);
                    }}>수정</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글 입력..."
          />
          <button onClick={handleAddComment}>댓글 추가</button>
        </>
      ) : (
        <p>게시글을 불러오는 중...</p>
      )}
    </div>
  );
};

export default PostDetail;
