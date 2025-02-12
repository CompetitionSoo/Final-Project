import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { isAuthenticated, logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: '팀소개', href: '/team' },
  { name: '갤러리', href: '/gallery' },
  { name: '개발과정', href: '/process' },
  { name: '제품소개', href: '/about' },
];
 
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              className="h-8 w-8 rounded-lg object-cover"
              src="/logo.avif"
              alt="logo"
            />
            <span className="text-gray-900 font-medium">강영수와 아이들</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated() ? (
                <div className="space-y-2 mt-4">
                  <Link
                    to="/dashboard"
                    className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 