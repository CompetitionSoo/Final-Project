import { FaIdCard, FaLock } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../../services/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-600">
      <div className="bg-white p-20 rounded-2xl shadow-lg w-[600px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">로그인</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="relative mb-4">
            <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="username"
              type="text"
              className="p-2 pl-10 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디을 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              type="password"
              className="p-2 pl-10 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition-all mt-4"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
            disabled={isLoading}
          >
            회원가입
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 font-semibold hover:underline"
            disabled={isLoading}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;