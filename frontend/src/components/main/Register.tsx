import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { FaUser, FaIdCard, FaEnvelope, FaPhoneAlt, FaKey, FaLock } from "react-icons/fa";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

    if (!name || !username || !email || !phone || !password || !confirmPassword) {
      setError("모든 정보를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, username, email, phone, password });
      setSuccess("회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.");
      setName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      // 로그인 화면으로 이동
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err)
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-600">
      <div className="bg-white p-20 rounded-2xl shadow-lg w-[600px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">회원가입</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col">
          {/* 이름 입력 필드 */}
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 아이디 입력 필드 */}
          <div className="relative mb-4">
            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* 이메일 입력 필드 */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="이메일을을 입력하세요"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 전화번호 입력 필드 */}
          <div className="relative mb-4">
            <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="전화번호를 입력하세요"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className="relative mb-4">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition-all mt-4"
            disabled={isLoading}
          >
            {isLoading ? "처리중..." : "회원가입"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
            disabled={isLoading}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
