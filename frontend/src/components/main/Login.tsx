import React, { useState } from "react";
import { register } from "../../services/auth";
import { motion } from "framer-motion";

import { FaUser } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { login , isAuthenticated} from "../../services/auth";

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      
      if (!name || !username || !email || !phone || !password) {
        setError("모든 정보를 입력하세요.");
        return;
      }
        
  
      setIsLoading(true);
      try {
        const userData = { name, username, email, phone, password };
        console.log("회원가입 요청 데이터:", userData); // 🔍 요청 데이터 확인

        await register(userData );
        setSuccess("회원가입이 완료되었습니다! 로그인 화면으로 이동합니다.");
        setName("");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
  
        // 로그인 화면으로 이동
        setTimeout(() => {
          navigate(0);
        }, 1000);
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative w-[850px] h-[750px] bg-white border-2 border-black rounded-lg shadow-xl overflow-hidden flex">

          {/* 배경 애니메이션 */}
          <motion.div
            animate={{
            rotate: isRegister ? -10 : 0, // 회원가입 시 반대 방향 회전
            skewY: isRegister ? -40 : 0,
            scale: isRegister ? 1.2 : 1,
            x: isRegister ? "0%" : "50%",  // 로그인 <-> 회원가입 위치 전환
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-[100%] left-[250px] w-[850px] h-[700px] bg-white origin-bottom-left"
        />

        {/* 로그인 설명 (왼쪽) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isRegister ? 0 : 1, x: isRegister ? "-100%" : "0%" }}
          transition={{ duration: 0.7 }}
          className="w-1/2 h-full flex flex-col justify-center items-center bg-black text-white px-10 text-center">
          <motion.h2 className="text-3xl font-bold">Cubot 개발자 여러분 <br/>환영합니다!</motion.h2>
          <motion.p className="text-md mt-3">로그인 해주시기 바랍니다!</motion.p>
        </motion.div>

        {/* 로그인 폼 (오른쪽) */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isRegister ? 0 : 1, x: isRegister ? "100%" : "0%", scale: isRegister ? 0.95 : 1 }}
          transition={{ duration: 0.7 }}
          className="absolute w-1/2 h-full flex flex-col justify-center px-10 text-black bg-white right-0"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">로그인</h2>
          <form onSubmit={handleLogin}>
            {/* 아이디 입력 필드 */}
            <div className="relative mb-6">
              <input 
                type="text" 
                className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                
                disabled={isLoading}
                required
              />
              <label 
                className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all  flex items-center gap-x-3
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] 
                peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600"
              >
                <FaUser />아이디 
              </label>
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="relative mb-6">
              <input 
                type="password" 
                className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                disabled={isLoading}
                required 
                onInvalid={(e) => e.preventDefault()}
              />
              <label 
                className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] 
                peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600"
              >
              <RiLockPasswordFill/> 비밀번호
              </label>
            </div>

            {error && (
            <p className="text-red-600 text-center font-semibold mt-2">
            {error}</p>
            )}

            <button 
            type="submit"
            className="w-full h-[50px] bg-black text-white rounded-lg text-lg font-semibold 
            hover: hover:bg-amber-400 hover:scale-105 transition"
            disabled={isLoading}
            >
              {isLoading ? "로그인중...": "로그인"}
            </button>

            <p className="text-center text-sm mt-4">
              아이디가 없으신가요? {" "}
              <span className="text-blue-600 font-semibold cursor-pointer  hover:bg-slate-300 hover:shadow-xl "  onClick={() => setIsRegister(true)}>
                회원가입
              </span>
            </p>
          </form>
        </motion.div>

        
        {/* 회원가입 설명 (오른쪽) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isRegister ? 1 : 0, x: isRegister ? "0%" : "100%" }}
          transition={{ duration: 0.7 }}
          className="w-1/2 h-full flex flex-col justify-center items-center bg-black text-white px-10 text-center"
        >
          <motion.h2 className="text-3xl font-bold">Cubot!</motion.h2>
          <motion.p className="text-md mt-3">Cubot 프로젝트를 참여해 주셔서 감사합니다</motion.p>
        </motion.div>


        {/* 회원가입 폼 (왼쪽) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isRegister ? 1 : 0, x: isRegister ? "0%" : "-100%", scale: isRegister ? 1 : 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute w-1/2 h-full flex flex-col justify-center px-10 text-black bg-white left-0"
        >
          <h2 className="text-2xl font-semibold text-center mb-10">회원가입</h2>
          <form onSubmit={handleRegister}>
            <div className="relative mb-6">
              <input type="text" required className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600">
                <FaUser /> 아이디
              </label>
            </div>

            <div className="relative mb-6">
              <input type="password" required className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600">
                <RiLockPasswordFill/> 비밀번호
              </label>
            </div>

            <div className="relative mb-6">
              <input type="text" required className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600">
                <MdOutlineDriveFileRenameOutline/> 이름
              </label>
            </div>

            <div className="relative mb-6">
              <input type="text" required className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600">
                <IoIosPhonePortrait/> 전화번호
              </label>
            </div>

            <div className="relative mb-6">
              <input type="email" required className="peer w-full border-b-2 border-black focus:border-blue-600 outline-none py-2 text-lg bg-transparent" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-600 transition-all flex items-center gap-x-3
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-10px] peer-focus:text-blue-600 peer-valid:top-[-10px] peer-valid:text-blue-600">
              <MdOutlineMailOutline/> E-mail
              </label>
            </div>

            <button 
            type="submit" 
            className="w-full h-[50px] bg-black text-white rounded-lg text-lg font-semibold
            hover:bg-amber-400 hover:scale-105 transition"
            >
            회원가입
            </button>

            <p className="text-center text-sm mt-4">
              아이디가 있으신가요?{" "}
              <span className="text-blue-600 font-semibold cursor-pointer hover:bg-slate-300 hover:shadow-xl " onClick={() => setIsRegister(false)}>
                로그인하기
              </span>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
