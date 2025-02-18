import React, { useState } from 'react';

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    contact: '',
    email: '',
    subject: '',
    message: '',
  });

  // 입력 값 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors = { name: '', contact: '', email: '', subject: '', message: '' };
    let isValid = true;

    // 필수 항목 검사
    if (!formData.name) {
      formErrors.name = '성함을 입력해주세요.';
      isValid = false;
    }
    if (!formData.contact) {
      formErrors.contact = '연락처를 입력해주세요.';
      isValid = false;
    }
    if (!formData.email) {
      formErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = '유효한 이메일 주소를 입력해주세요.';
      isValid = false;
    }
    if (!formData.subject) {
      formErrors.subject = '제목을 입력해주세요.';
      isValid = false;
    }
    if (!formData.message) {
      formErrors.message = '문의 내용을 입력해주세요.';
      isValid = false;
    }

    setErrors(formErrors);

    if (isValid) {
      alert('문의가 접수되었습니다!');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* 테두리와 배경이 있는 폼 */}
      <div className="border-2 border-gray-300 p-6 rounded-lg shadow-lg">
        {/* 기본정보 섹션 */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">기본정보</h2>
        <p className="text-sm text-gray-600 mb-4">* 필수 입력항목</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              성함 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="성함을 입력해주세요."
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              연락처 *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="연락처를 입력해주세요."
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일 *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="이메일 주소를 입력해주세요."
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* 문의내용 섹션 */}
          <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-6">문의내용</h2>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              제목 *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="이 문제가 있습니다."
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              내용 *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="문의하실 내용을 자유롭게 입력해주세요."
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* 제출 버튼 */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              문의하기
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>■ 문의하기 클릭후, 다음화면으로 이동할때 까지 잠시만 기다려주세요</p>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
