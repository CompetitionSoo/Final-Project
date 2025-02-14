import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("문의 내용:", formData);
    alert("문의가 정상적으로 제출되었습니다!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto my-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">문의하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">문의 내용</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            style={{ resize: 'none' }}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default Contact;
