import React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout:React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 bg-cover bg-center"   style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 100%, transparent), url(${process.env.PUBLIC_URL}/images/main_background.jpg)`,
        }}>
        
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 