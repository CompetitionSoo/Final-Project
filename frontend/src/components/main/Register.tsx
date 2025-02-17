import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("이메일, 비밀번호를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      setSuccess("회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // 로그인 화면으로 이동
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-500 p-3 rounded mb-4" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col">
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

          <label htmlFor="confirmPassword" className="mb-2 text-sm font-semibold">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 확인하세요"
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "처리중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            이미 계정이 있으신가요? 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;