import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { isAuthenticated, logout } from '../../../services/auth';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"
const navigation = [
  { name: '팀소개', href: '/team' },
  { name: '제품소개', href: '/about' },
  { name: '개발과정', href: '/process' },
  { name: '갤러리', href: '/gallery' },
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
    <nav className="bg-gray-50 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <div className="h-12 w-12 flex items-center justify-center">
              <img
                className="h-12 w-12 rounded-xl object-cover"
                src="/images/logo.png"
                alt="logo"
              />
            </div>
            <span className="text-gray-800 font-bold ml-2 text-3xl">쿠봇</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-2">
              <div className = "main_nav">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-800 rounded-full
                            transition-all duration-200 group hover:text-gray-900"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-gray-100 rounded-2xl scale-0 transition-transform 
                                duration-200 ease-out group-hover:scale-100 -z-0"></span>
                </Link>
              ))}
              </div>
            </div>
            {isAuthenticated() ? (
              <div className="flex items-center space-x-3 ml-10">
                <Link
                  to="/dashboard"
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm 
                          font-medium transition-all duration-200 hover:shadow-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm 
                          font-medium transition-all duration-200 hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm 
                        font-medium transition-all duration-200 hover:shadow-md ml-10"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 
                      hover:bg-white hover:text-gray-900 transition-all duration-200"
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-base font-medium text-gray-700 rounded-full
                          hover:bg-white hover:text-gray-900 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated() ? (
                <div className="space-y-2 mt-4">
                  <Link
                    to="/dashboard"
                    className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 
                            px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 
                            hover:shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center text-white bg-red-500 hover:bg-red-600 
                            px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 
                            hover:shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 
                          px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 
                          hover:shadow-md mt-4"
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