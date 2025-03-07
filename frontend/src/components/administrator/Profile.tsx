import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });
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
        setProfileImage(`http://localhost:5000${data.profile_picture}`)
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
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("토큰없음!");
    
    const updateProfile={
      name: formData.name.trim() || profile?.name,
      email: formData.email.trim() || profile?.email, 
      phone: formData.phone.trim() || profile?.phone,
      description: formData.description.trim() || profile?.description,
    }

    if(
      updateProfile.name===profile?.name &&
      updateProfile.email===profile?.email &&
      updateProfile.phone===profile?.phone &&
      updateProfile.description===profile?.description
    ) {
      alert("변경된 내용이 없습니다.")
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
        fetchProfile();
        setEditMode(false); // 수정 완료 후 보기 모드로 변경
      } else {
        alert("저장 실패");
      }
    } catch (error) {
      console.error("저장 오류:", error);
    }
  };

  //프로필 이미지 변경
  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProfileImage(`http://localhost:5000${data.file_url}`);
        alert("업로드 성공!");
      } else {
        alert(`업로드 실패: ${data.error}`);
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    }
  };

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // 비밀번호 변경 로직 추가
    console.log('Password changed');
  };
  //프로필이미지 제거, DB에서 경로만 비움 서버에서 사진 실제 삭제기능 미구현
  const handleRemoveImage = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    setProfileImage(null);
    try {
      const response = await fetch("http://localhost:5000/api/upload/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //인증토큰을 보냄
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("삭제 성공!");
      } else {
        alert("에러 발생");
      }
    } catch (error) {
      console.error("파일 삭제 오류:", error);
    }
  };

  if(!profile){
    return <p>loading..</p>
  }

  return (
    <div className="container flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">프로필 상세</h2>
        <div className='flex justify-center'>
          <div className="mb-6 border-r-1">
            <h3 className="text-xl font-semibold text-gray-700">프로필 이미지</h3>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-48 h-48 border-4 border-solid rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full border-1 border-solid" />
              )}
            <div className="flex justify-center space-x-2">
              <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md text-sm w-26">
                프로필 변경
                <input type="file" className="hidden" onChange={handleProfileImageChange} />
              </label>
              {profileImage && (
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm w-1/3" 
                >
                  삭제
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 pl-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">이름</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">이메일</label>
                {editMode ? (
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">연락처</label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">소개글</label>
                {editMode ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p>{profile.description || "새로운 소개글을 입력해주세요."}</p>
                )}
              </div>

              {/* 버튼 영역 */}
              {editMode ? (
                <button
                  onClick={handleSaveClick}
                  className="w-1/2 bg-green-500 text-white p-2 rounded-md mt-4"
                >
                  저장
                </button>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="w-1/2 bg-blue-500 text-white p-2 rounded-md mt-4"
                >
                  수정
                </button>
              )}

              {!editMode && (
                <button
                  onClick={() => navigate("/Dashboard")}
                  className="w-1/2 bg-red-500 text-white p-2 rounded-md mt-4"
                >
                  뒤로
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
