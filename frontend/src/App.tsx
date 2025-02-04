import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/common/Hero';

// Temporary page components until we implement them
const Solutions = () => <div className="pt-16">Solutions Page</div>;
const Products = () => <div className="pt-16">Products Page</div>;
const Company = () => <div className="pt-16">Company Page</div>;
const Resources = () => <div className="pt-16">Resources Page</div>;
const Contact = () => <div className="pt-16">Contact Page</div>;

const HomePage = () => (
  <>
    <Hero />
    {/* Add other homepage sections here */}
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/company" element={<Company />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
