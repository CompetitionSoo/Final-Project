import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/common/Hero';

// Temporary page components until we implement them
const Team = () => <div>Team Page</div>;
const Gallery = () => <div>Gallery Page</div>;
const Process = () => <div>Process Page</div>;
const About = () => <div>About Page</div>;
const Login = () => <div>Login Page</div>;

const HomePage = () => (
  <>
    <Hero />
    {/* Add other homepage sections here */}
  </>
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
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
