import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import Hero from "./components/main/Hero";
import Team from "./components/main/Team";
import Gallery from "./components/main/Gallery";
import Process from "./components/main/Process";
import About from "./components/main/About";
import ProjectIntro from "./components/main/ProjectIntro";
import DemoVideo from "./components/main/DemoVideo";
import Login from "./components/main/Login";
import Contact from "./components/main/Contact";
import Register from "./components/main/Register";
import Monitoring from "./components/administrator/Monitoring";
import Control_robot from "./components/administrator/Control_robot";
import Check_list from "./components/administrator/Check_list";
import Profile from "./components/administrator/Profile";
import Documents from "./components/administrator/Documents";
import Settings from "./components/administrator/Settings";
import Gallery2 from "./components/administrator/Gallery2";
import DashboardLayout from "./components/administrator/layout/DashboardLayout";
import Dashboard from "./components/administrator/Dashboard";
import PostDetail from "./components/main/PostDetail";

// Temporary page component until we implement it
//const Login = () => <div>Login Page</div>;
import ROSLIB from "roslib";
import { UserProvider } from "./components/administrator/UserContext";

const HomePage = () => (
  <div className="snap-y snap-mandatory">
    <Hero />
    <ProjectIntro />
    <DemoVideo />
  </div>
);

const App = () => {
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);

  useEffect(() => {
    // ROS 연결 설정
    console.log("App is mounted!");
    const rosInstance = new ROSLIB.Ros({
      url: "ws://192.168.137.132:9090", // ROSBridge WebSocket 주소
    });

    rosInstance.on("connection", () => {
      console.log("Connected to ROSBridge!");
    });

    rosInstance.on("error", (error: any) => {
      console.error("Connection error:", error);
    });

    rosInstance.on("close", () => {
      console.log("Disconnected from ROSBridge.");
    });

    setRos(rosInstance);
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Main Page 라우트 */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Administrator 라우트 */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/home" element={<Dashboard />} />
            <Route path="/dashboard/monitoring" element={<Monitoring />} />
            <Route
              path="/dashboard/control_robot"
              element={<Control_robot ros={ros} />}
            />
            <Route path="/dashboard/check_list" element={<Check_list />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/gallery" element={<Gallery2 />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
