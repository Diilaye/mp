import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
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
import HomePage from './pages/Home';
import Personnel from './components/personnel-list';
import LoginPage from './login-page';

const queryClient = new QueryClient();

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <Toaster
          position="top-right"
          toastOptions={{
            duration: 10000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 10000,
              style: {
                background: '#8A9B6E',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      <div className="min-h-screen bg-offwhite">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <Personnel />
                {/* <Workers /> */}
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
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;