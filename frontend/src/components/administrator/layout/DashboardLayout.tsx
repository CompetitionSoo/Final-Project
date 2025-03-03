import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar onToggleSidebar={handleToggleSidebar} />
      <div className="flex pt-16 h-[calc(100vh-64px)]">
        <DashboardSidebar isOpen={isSidebarOpen} />
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