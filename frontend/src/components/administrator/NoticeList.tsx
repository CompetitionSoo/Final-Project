import React from 'react';

interface Notice {
  id: number;
  title: string;
  date: string;     // YYYY-MM-DD 등
  content: string;
}

const NoticeList: React.FC = () => {
  // 예시용 공지 목록 (실제론 서버에서 받아오기 등 가능)
  const notices: Notice[] = [
    {
      id: 1,
      title: '새로운 세미나 일정 안내',
      date: '2025-03-17',
      content: '3월 10일(월) 14:00 ~ 16:00, 미래융합교육원 222층 대강당'
    },
    {
      id: 2,
      title: '프로젝트 팀원 모집',
      date: '2025-03-17',
      content: 'ROS 를 터트리겠다.'
    },
    {
      id: 3,
      title: '장비 점검 안내',
      date: '2025-03-75',
      content: '3D coffee, yolo coffee 등 장비 정기점검이 진행됩니다.'
    },
  ];

  return (
    <div className="notice-list">
      <h2>공지사항</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id} className="notice-item">
            <h4>{notice.title}</h4>
            <p>{notice.content}</p>
            <span className="notice-date">{notice.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;