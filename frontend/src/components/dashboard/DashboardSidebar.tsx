import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineCog,
  HiOutlinePhotograph,
  HiOutlineDocumentText
} from 'react-icons/hi';

interface DashboardSidebarProps {
  isOpen: boolean;
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
      ${isActive ? 'bg-gray-100 text-gray-900' : ''}
    `}
  >
    <span className="h-5 w-5">{icon}</span>
    <span className="ml-3">{label}</span>
  </NavLink>
);

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen }) => {
  const navItems = [
    { to: '/dashboard', icon: <HiOutlineHome />, label: 'Overview' },
    { to: '/dashboard/profile', icon: <HiOutlineUserCircle />, label: 'Profile' },
    { to: '/dashboard/gallery', icon: <HiOutlinePhotograph />, label: 'Gallery' },
    { to: '/dashboard/documents', icon: <HiOutlineDocumentText />, label: 'Documents' },
    { to: '/dashboard/settings', icon: <HiOutlineCog />, label: 'Settings' },
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