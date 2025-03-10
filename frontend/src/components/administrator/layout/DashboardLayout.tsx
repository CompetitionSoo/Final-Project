import React, { useState , useEffect} from 'react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; profile_picture: string } | null>(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({ name: data.name, profile_picture: data.profile_picture });
        } else {
          console.error("사용자 정보를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchUser();
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