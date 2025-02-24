import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiOutlineLogout, HiOutlineHome } from 'react-icons/hi';
import { logout } from '../../../services/auth';

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md h-16 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Toggle Sidebar"
          >
            <HiMenu className="h-6 w-6 text-gray-600" />
          </button>
          <span className="ml-4 text-xl font-semibold text-gray-800">Dashboard</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleHomeClick}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Go to Home"
          >
            <HiOutlineHome className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Logout"
          >
            <HiOutlineLogout className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 