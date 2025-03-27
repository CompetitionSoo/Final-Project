import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from './UserContext';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string | null;
  profile_picture: string | null;
}

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
  const {user, fetchUser} = useUser();
  const navigate = useNavigate();
  
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try { //fetch로 해당 엔드포인트에 데이터 요청
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
      });

      const data = await response.json(); //받아온 JSON data에 저장
      if (response.ok) {
        setProfile(data);
        setProfileImage(data.profile_picture);
      } else {
        console.error("Error fetching profile:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  // 컴포넌트가 렌더링될 때 DB에서 프로필 이미지, 상세정보 불러오기
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        description: profile.description || "",
      });
    }
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("토큰이 없습니다!");

    if (!profile) return;

    const updateProfile = {
      name: formData.name.trim() || profile.name,
      email: formData.email.trim() || profile.email,
      phone: formData.phone.trim() || profile.phone,
      description: formData.description.trim() || profile.description,
    };

    // 변경 사항이 없으면 저장 X
    if (
      updateProfile.name === profile.name &&
      updateProfile.email === profile.email &&
      updateProfile.phone === profile.phone &&
      updateProfile.description === profile.description
    ) {
      alert("변경된 내용이 없습니다.");
      setEditMode(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateProfile),
      });

      if (response.ok) {
        alert("프로필이 저장되었습니다.");
        // 저장 후 프로필 재조회
        fetchProfile();
        fetchUser();
        setEditMode(false);
      } else {
        alert("저장 실패");
      }
    } catch (error) {
      console.error("저장 오류:", error);
    }
  };

  //프로필 이미지 변경
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const token = localStorage.getItem("token");
    if (!token || !file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/uploadprofile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProfileImage(data.file_url);
        fetchUser();
        alert("업로드 성공!");
      } else {
        alert(`업로드 실패: ${data.error}`);
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  // 프로필 이미지 제거
  const handleRemoveImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    setProfileImage(null);
    try {
      const response = await fetch("http://localhost:5000/api/deleteprofile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
      });

      const data = await response.json();
      if (response.ok) {
        fetchUser();
        alert("삭제 성공!");
      } else {
        alert("에러 발생");
      }
    } catch (error) {
      console.error("파일 삭제 오류:", error);
    }
  };

  if(!profile){
    return <p>loading..</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* 카드 컨테이너 */}
      <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* 상단 영역 (프로필 이미지, 이름, 연락처) */}
        <div className="flex flex-col items-center p-4 bg-white">
          {/* 프로필 이미지 */}
          <div className="relative w-24 h-24 mb-2">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            {/* 이미지 업로드 버튼 */}
            <label className="absolute bottom-0 right-0 text-white rounded-full p-1 cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
          </div>

          {/* 이미지 삭제 버튼 */}
          {profileImage && (
            <button
              onClick={handleRemoveImage}
              className="text-xs text-red-500 hover:text-red-700 mb-2"
            >
              프로필 제거
            </button>
          )}

          {/* 이름 */}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
              className="w-full text-center border-b border-gray-200 focus:outline-none"
            />
          ) : (
            <h2 className="text-xl font-bold">{profile.name}</h2>
          )}

          {/* 연락처 */}
          <div className="mt-2 text-gray-600 flex items-center gap-x-2 w-1/2">
          <span className="w-6 text-center">📱</span>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처"
                className="flex-1 border-b border-gray-200 focus:outline-none text-left"
              />
            ) : (
              <p>{profile.phone || "연락처가 없습니다."}</p>
            )}
          </div>

          <div className="mt-2 text-gray-600 flex items-center gap-x-2 w-1/2">
          <span className="w-6 text-center">✉️</span>
            {editMode ? (
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="flex-1 border-b border-gray-200 focus:outline-none text-left"
              />
            ) : (
              <p>{profile.email || "이메일이 없습니다."}</p>
            )}
          </div>
        </div>

        {/* 중단 영역 (소개글을 Send your message 위치에서 편집) */}
        <div className="bg-yellow-200 p-4">
          {editMode ? (
            <textarea
              name="description"
              className="w-full p-2 rounded-md outline-none"
              placeholder="Send your message"
              value={formData.description}
              onChange={handleChange}
            />
          ) : (
            <p className="text-gray-700">
              {profile.description || "새로운 소개글을 입력해주세요."}
            </p>
          )}
        </div>

        {/* 하단 영역 (SNS 아이콘 + 수정/저장/뒤로 버튼) */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
          {/* SNS 아이콘 (예시) */}
          <div className="flex space-x-3">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          {/* 수정/저장/뒤로 버튼 */}
          <div className='flex items-center gap-2'>
            {editMode ? (
              <button 
                onClick={handleSaveClick}
                className="inline-flex items-center bg-green-500 text-white px-3 py-1 rounded-md mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
                저장
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="inline-flex items-center px-6 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
                수정
              </button>
            )}
            {!editMode && (
              <button
                onClick={() => navigate("/Dashboard")}
                className="inline-flex items-center px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                뒤로
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;