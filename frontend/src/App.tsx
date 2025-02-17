import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/common/Hero';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Process from './pages/Process';
import About from './pages/About';
import ProjectIntro from './components/sections/ProjectIntro';
import DemoVideo from './components/sections/DemoVideo';
import Login from "./pages/Login";
import Contact from './pages/Contact'; 
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/dashboard/Profile';
import Documents from './pages/dashboard/Documents';
import Settings from './pages/dashboard/Settings';
import Gallery2 from './pages/dashboard/Gallery2';

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
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/gallery" element={<Gallery2 />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;