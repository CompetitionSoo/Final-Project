import React, { useState } from 'react';
import swal from 'sweetalert';
//npm install sweetalert --save
const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formErrors = { name: '', contact: '', email: '', subject: '', message: '' };
    let isValid = true;

    // Validation checks
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
      swal({
        title: "문의가 접수되었습니다!",
        text: "빠른 시일 내에 답변드리겠습니다.",
        icon: "success",
        
      }).then(() => {
        // 실제 폼 제출 (추후 API 요청 or 서버 전송 가능)
        console.log("폼 제출됨:", formData);
      });
    }
  };


  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      {/* Form container with Flexbox */}
      <div className="border-2 border-red-700 bg-white p-6 rounded-lg shadow-lg flex max-w-4xl w-full">
        {/* Form Content Section */}
        <div className="flex-1 pr-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-6">문의내용</h2>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                제목
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
                내용
              </label>
              <textarea
                rows={10}
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

export default InquiryForm;
