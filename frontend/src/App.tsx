import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/main/layout/Layout';
import Hero from './components/main/Hero';
import Team from './components/main/Team';
import Gallery from './components/main/Gallery';
import Process from './components/main/Process';
import About from './components/main/About';
import ProjectIntro from './components/main/ProjectIntro';
import DemoVideo from './components/main/DemoVideo';
import Login from "./components/main/Login";
import Contact from './components/main/Contact'; 
import Register from './components/main/Register';



import Monitoring from './components/administrator/Monitoring';
import Control_robot from './components/administrator/Control_robot';
import Check_list from './components/administrator/Check_list';


import Profile from './components/administrator/Profile';
import Documents from './components/administrator/Documents';
import Settings from './components/administrator/Settings';
import Gallery2 from './components/administrator/Gallery2';
import DashboardLayout from './components/administrator/layout/DashboardLayout';
import Dashboard from './components/administrator/Dashboard';

// Temporary page component until we implement it
//const Login = () => <div>Login Page</div>;

const HomePage = () => (
  <div className="snap-y snap-mandatory">
    <Hero />
    <ProjectIntro />
    <DemoVideo />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Page 라우트 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
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
          <Route path="/dashboard/control_robot" element={<Control_robot/>} />
          <Route path="/dashboard/check_list" element={<Check_list/>} />

          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/gallery" element={<Gallery2 />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>

  );
};

export default App;