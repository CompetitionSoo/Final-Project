import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    // 로그인 성공
    console.log("로그인 시도:", { email, password });
    setIsLoggedIn(true);  // 로그인 후 상태 변경
    setError(""); // 에러 초기화
    navigate("/"); // 홈 페이지로 이동
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 처리
    navigate("/login"); // 로그인 화면으로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="flex flex-col">
            <label className="mb-2 text-sm font-semibold">이메일</label>
            <input
              type="email"
              className="p-2 mb-4 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />

            <label className="mb-2 text-sm font-semibold">비밀번호</label>
            <input
              type="password"
              className="p-2 mb-4 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              로그인
            </button>
          </form>
        ) : (
          <div className="text-center">
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              로그아웃
            </button>
          </div>
        )}

        {/* 회원가입 버튼 */}
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/register")}
            className="mt-4 text-blue-600 underline"
          >
            회원가입
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
