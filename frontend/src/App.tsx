import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/common/Hero';

// Temporary page components until we implement them
const Solutions = () => <div>Solutions Page</div>;
const Products = () => <div>Products Page</div>;
const Company = () => <div>Company Page</div>;
const Resources = () => <div>Resources Page</div>;
const Contact = () => <div>Contact Page</div>;

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
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/company" element={<Company />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
