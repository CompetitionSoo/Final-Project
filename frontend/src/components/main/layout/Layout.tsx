import React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout:React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16" >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 