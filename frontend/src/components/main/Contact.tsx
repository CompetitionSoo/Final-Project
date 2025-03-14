import React, { useState } from "react";
import swal from 'sweetalert';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//npm install sweetalert --save
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors = { name: '', phone: '', email: '', subject: '', message: '' };
    let isValid = true;
  
    // Validation checks
    if (!formData.name) {
      formErrors.name = '성함을 입력해주세요.';
      isValid = false;
    }
    if (!formData.phone) {
      formErrors.phone = '연락처를 입력해주세요.';
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
      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          swal({
            title: "문의가 접수되었습니다!",
            text: "빠른 시일 내에 답변드리겠습니다.",
            icon: "success",
          });
  
          setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        } else {
          throw new Error(result.error || '문의 접수 중 오류가 발생했습니다.');
        }
      } catch (error: any) {
        swal({
          title: "오류 발생",
          text: error.message,
          icon: "error",
        });
      }
    }
  };


  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      {/* Form container with Flexbox */}
      <div className="border-2 border-gray-300 p-6 rounded-lg shadow-lg flex max-w-4xl w-full">
        {/* Form Content Section */}
        <div className="flex-1 pr-6">
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                연락처 *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="연락처를 입력해주세요."
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
                placeholder="제목을 입력해주세요."
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                내용 *
              </label>
              <textarea
                rows={4}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500  resize-none"
                placeholder="문의하실 내용을 자유롭게 입력해주세요."
                
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                문의하기
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>■ 문의하기 클릭후, 다음화면으로 이동할때 까지 잠시만 기다려주세요</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            src='/images/support.png' 
            alt="Inquiry Image"
            className="w-30 h-80 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
