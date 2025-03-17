import React from 'react';
import "./Team.css";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaChessKing } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";

const teamMembers = [
  {
    name: "강 영 수",
    role: "프론트엔드, 백엔드",
    phone: "010-6679-5780",
    email: "geem1282@gmail.com",
    home: "대전 서구 둔산동",
    image: "./images/강영수.jpg",
    icon: <FaChessKing />
  },
  {
    name: "이 희 성",
    role: "프론트엔드, 백엔드",
    phone: "010-6638-5438",
    email: "lstar216@naver.com",
    home: "대전 서구 월평동",
    image: "./images/이희성.jpg"
  },
  {
    name: "김 희 선",
    role: "프론트엔드, 백엔드",
    phone: "010-2960-7801",
    email: "1209khs51@gmail.com",
    home: "대전 동구 삼성동 ",
    image: "./images/김희선.png"
  },
  {
    name: "이 정 희",
    role: "머신러닝, 딥러닝, 프론트엔드",
    phone: "010-2742-2352",
    email: "ggp05158@naver.com",
    home: "대전 유성구 노은동",
    image: "./images/이정희.jpg",
    icon: <IoIosStar />
  },
  {
    name: "정 성 민",
    role: "ROS",
    phone: "010-5090-3039",
    email: "smjeong5090@naver.com",
    home: "대전 서구 만년동",
    image: "./images/정성민.png"
  }
];



const Team: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8"  >
      <h1 className="text-3xl font-bold text-center mb-8">강영수와 아이들</h1>
      <h1 className='text-4xl font-bold text-center mb-8'>로봇과 함께하는 미래형 물류 시스템</h1>

      <div className='cubot_info'>
        <div className='border border-indigo-800' style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{fontSize: '40px', color: '#333', animation: 'slideIn 2s ease-out'}}>
            물류분류 로봇 <span style={{ color: '#FF6347', fontWeight: 'bold' }}>쿠봇</span>이 대신 옮겨 드리겠습니다!
          </p>
        </div>
      </div>
      
      {teamMembers.map((member, index) => (
        <div key={index} className="team_member_card flex flex-col md:flex-row items-center mt-9 mb-8 p-6 border border-gray-300 rounded-lg shadow-lg">
          {/* 왼쪽 - 이미지 */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img src={member.image} alt={member.name} className="w-60 object-top rounded-lg" />
          </div>
          
          {/* 중간 구분선 */}
          <div className="hidden md:block w-px bg-gray-400 h-40 mx-6"></div>
          
          {/* 오른쪽 - 정보 */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center">
            {member.name === "이 정 희" && <IoIosStar className="mr-2 text-yellow-500" />}
            {member.name === "강 영 수" && <FaChessKing className="mr-2 text-black" />}
            {member.name}
            </h2>
              
            <p className="text-xl text-gray-700 mb-4">{member.role}</p>
            <hr className="mb-4" />
            <p className="flex items-center mb-2"><MdOutlinePhoneIphone className="mr-2" />{member.phone}</p>
            <p className="flex items-center mb-2"><MdEmail className="mr-2" />{member.email}</p>
            <p className="flex items-center"><IoIosHome className="mr-2" />{member.home}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
