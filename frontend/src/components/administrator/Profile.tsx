import React from 'react';
import { useState, useEffect } from 'react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string | null;
}

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription]=useState("안녕하세요~^^")
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // 페이지가 로드될 때 로컬 스토리지에서 프로필 이미지를 불러오기
  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchProfile();
    
  }, []);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl); // 로컬 스토리지에 이미지 저장
      };
      reader.readAsDataURL(file);
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

  const handleRemoveImage = () => {
    setProfileImage(null);
  };
  if(!profile){
    return <p>loading..</p>
  }

  return (
    <div className="container flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">프로필 상세</h2>
        <div className='flex justify-center'>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">프로필 이미지</h3>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-60 h-48 rounded-full" />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
              )}
            <div className="flex space-x-2">
              <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md text-sm w-1/2">
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

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">가제</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">이름</label>
                <p>{profile.name}</p>
                {/* <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                /> */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">이메일</label>
                <p>{profile.email}</p>
                {/* <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                /> */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">비밀번호</label>
                <p>****</p>
                {/* <input
                  type="passeword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                /> */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">연락처</label>
                <p>{profile.phone}</p>
                {/* <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                /> */}
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">소개글</label>
                <p>{profile.description || "X"}</p>
                {/* <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                /> */}
              </div>
             
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
