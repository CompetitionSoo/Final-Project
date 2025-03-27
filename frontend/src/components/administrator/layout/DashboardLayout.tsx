import React, { useState , useEffect} from 'react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { Outlet } from "react-router-dom";
import { useUser } from '../UserContext';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {user,fetchUser} = useUser();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
      fetchUser(); // 로그인 후 즉시 사용자 정보 갱신
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar onToggleSidebar={handleToggleSidebar} user={user} />
      <div className="flex pt-16 h-[calc(100vh-64px)]">
        <DashboardSidebar isOpen={isSidebarOpen} user={user} />
        <main 
          //style={{ backgroundImage: "url('/images/background.avif')" , height: "100vh" }}
          // style={{ backgroundColor: "#000", height: "100vh" }}
          className={`flex-1 overflow-auto transition-all duration-300 bg-zinc-100 h-screen ${
            isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 