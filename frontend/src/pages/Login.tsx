import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../services/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-semibold">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            disabled={isLoading}
            required
          />

          <label htmlFor="password" className="mb-2 text-sm font-semibold">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors duration-200"
            disabled={isLoading}
          >
            계정이 없으신가요? 회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
