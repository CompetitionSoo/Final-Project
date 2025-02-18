import React from 'react';
import { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 페이지가 로드될 때 로컬 스토리지에서 프로필 이미지를 불러오기
  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
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

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">프로필 설정</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">프로필 이미지</h3>
          <div className="flex items-center space-x-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-30 h-20 rounded-full" />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full" />
            )}
            <input type="file" onChange={handleProfileImageChange} className="file-input" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Current Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
              Change Password
            </button>
          </form>
        </div>
      </div>
  );
};

export default Settings;
