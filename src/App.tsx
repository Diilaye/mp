import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Workers from './components/Workers';
import Services from './components/Services';
import Projects from './components/Projects';
import Newsletter from './components/Newsletter';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import About from './pages/About';
import Search from './pages/Search';
import HousekeeperRegistrationForm from './components/housekeeper/RegistrationForm';
import ClientRegistrationForm from './components/client/RegistrationForm';
import Dashboard from './components/housekeeper/dashboard/Dashboard';
import AdminDashboard from './components/housekeeper/dashboard/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Router>
      <div className="min-h-screen bg-offwhite">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <main className='mb-1'>
                <Hero />
                <Workers />
                <Services />
                <Reviews />
                <Newsletter />
              </main>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/register/housekeeper" element={<HousekeeperRegistrationForm />} />
          <Route path="/register/client" element={
            <main className=''>
              <div className="bg-black h-12 min-w-min">
                
              </div>
              
              <ClientRegistrationForm />
              </main>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;