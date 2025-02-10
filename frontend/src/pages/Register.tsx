import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // 회원가입 성공 메시지
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("이메일, 비밀번호를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 서버에 회원가입 요청 
    console.log("회원가입 시도:", { email, password });

    setSuccess("회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.");
    setError(""); // 에러 초기화
    setEmail(""); // 입력 필드 초기화
    setPassword(""); // 입력 필드 초기화
    setConfirmPassword(""); // 입력 필드 초기화

    // 로그인 화면으로 이동
    setTimeout(() => {
      navigate("/login");
    });
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleRegister} className="flex flex-col">
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

          <label className="mb-2 text-sm font-semibold">비밀번호 확인</label>
          <input
            type="password"
            className="p-2 mb-4 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 확인하세요"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
