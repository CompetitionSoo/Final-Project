import React from 'react';
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { IoGameController } from "react-icons/io5";
import { VscVm } from "react-icons/vsc";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { logout } from '../../../services/auth';

import { 
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineLogout
} from 'react-icons/hi';

interface DashboardSidebarProps {
  isOpen: boolean;
  user: { name: string; profile_picture: string } | null;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-3 text-gray-600 transition-colors duration-200
      hover:bg-gray-100 hover:text-gray-900
      ${isActive ? 'bg-cyan-300 text-gray-900' : ''}
    `}
  >
    <span className="h-5 w-5">{icon}</span>
    <span className="ml-3">{label}</span>
  </NavLink>
);

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, user}) => {
  const navigate = useNavigate();
  const navItems = [
    { to: '/dashboard/home', icon: <HiOutlineHome />, label: '메인' },
    { to: '/dashboard/Monitoring', icon: <VscVm />, label: '모니터링' },
    { to: '/dashboard/control_robot', icon: <IoGameController />, label: '컨트롤러' },
    { to: '/dashboard/check_list', icon: <MdOutlineContentPasteSearch  />, label: '항목조회' },
    { to: '/dashboard/gallery', icon: <HiOutlinePhotograph />, label: '갤러리' },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white shadow-md
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* 유저 프로필 섹션 */}
        <div className="flex flex-col items-center p-4 border-b">
          <img
            src={user?.profile_picture}
            alt="User Profile"
            className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
          />
          <h3 className="mt-2 text-gray-700 font-semibold">{user?.name}</h3>
          <div className="flex gap-4 mt-3">
            {/* 프로필 상세 */}
            <Link to="/dashboard/profile" className="relative group">
              <VscAccount size={20} className="text-gray-600 hover:text-cyan-500" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-6 px-3 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                프로필 상세
              </span>
            </Link>

            {/* 문의하기 */}
            <Link to="/dashboard/documents" className="relative group">
              <HiOutlineMail size={20} className="text-gray-600 hover:text-cyan-500" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-6 px-3 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                문의하기
              </span>
            </Link>

            {/* 로그아웃 */}
            <button className="relative group" onClick={() => {
              logout(); // Clear authentication state
              navigate('/login');}}>
              <HiOutlineLogout size={20} className="text-gray-600 hover:text-red-500" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-6 px-3 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                로그아웃
              </span>
            </button>
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar; 