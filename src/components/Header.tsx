import React, { useState } from 'react';
import { Menu, X, Palette, Instagram, Facebook, Twitter, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './modals/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full bg-white z-50">
        {/* Top Bar */}
        <div className="bg-primary text-white py-1">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-xs">Follow Us</span>
                <div className="flex space-x-3">
                  <a href="#" className="hover:text-gray-200 transition-colors">
                    <Instagram className="w-3 h-3" />
                  </a>
                  <a href="#" className="hover:text-gray-200 transition-colors">
                    <Twitter className="w-3 h-3" />
                  </a>
                  <a href="#" className="hover:text-gray-200 transition-colors">
                    <Facebook className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Promotion Text */}
              <div className="hidden md:block text-center">
                <p className="text-xs">Sign up get 20% Off for all collection</p>
              </div>

              {/* Phone Number */}
              <div className="hidden md:block">
                <a href="tel:+11002345678" className="text-xs hover:text-gray-200 transition-colors">
                  1 (100) 234-5678
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              
              <Link to="/" className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-primary" />
                <span className="font-montserrat font-bold text-lg text-primary">DécoStyle</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                  <Link to="/about" className="nav-link">A propos</Link>
                  <Link to="/categories" className="nav-link">Contact</Link>
              </nav>

              {/* Icons */}
              <div className="hidden md:flex items-center space-x-3">
                
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="p-1.5 hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 p-1.5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="container mx-auto px-4 py-3">
                <nav className="flex flex-col space-y-3">
                  <Link to="/about" className="nav-link">A propos</Link>
                  <Link to="/categories" className="nav-link">Contact</Link>
                </nav>
                <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                  <button className="p-1.5 hover:text-primary transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:text-primary transition-colors relative">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      0
                    </span>
                  </button>
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-1.5 hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;