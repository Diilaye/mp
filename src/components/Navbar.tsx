import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import AuthModal from './modals/AuthModal';
import AuthModalInscription from './modals/AuthModal-inscription';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const isSearchPage = location.pathname === '/search' || location.pathname === '/admin' || location.pathname === '/about' || location.pathname === '/admin/login'  ; // Check if we're on the search page
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // === Nouveaux états pour connexion ===
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('role'); 
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  // Function to determine text color based on page and scroll
  const getTextColor = () => {
    if (isSearchPage) return 'text-gray-900'; // Always black on search page
    return isScrolled ? 'text-gray-900' : 'text-white';
  };

  return isLoggedIn ? (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isSearchPage ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className={`text-2xl font-montserrat font-bold transition-colors duration-300 ${getTextColor()}`}
              >
                <img
                  src="/images/logo/logoMP.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${getTextColor()} hover:text-primary nav`}>Accueil</Link>
              <Link to="/about" className={`${getTextColor()} hover:text-primary nav`}>À Propos</Link>
              <ScrollLink 
                to="services" 
                smooth={true} 
                duration={500} 
                className={`${getTextColor()} hover:text-primary nav cursor-pointer`}
              >
                Services
              </ScrollLink>
              <Link to="/search" className={`${getTextColor()} hover:text-primary nav`}>Professionnels</Link>
              {isLoggedIn && (
                <Link to="/admin" className={`${getTextColor()} hover:text-primary nav`}>Administration</Link>
              )}
              
              {/* Affichage conditionnel */}
              <div className="flex items-center space-x-4">
                <span className="text-primary font-semibold">{user.firstName + ' ' + user.lastName}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${getTextColor()}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white flex flex-col">
              <Link to="/" className="nav-link text-gray-700">Accueil</Link>
              <Link to="/about" className="nav-link text-gray-700">À Propos</Link>
              <Link to="/#services" className="nav-link text-gray-700">Services</Link>
              <Link to="/search" className="nav-link text-gray-700">Professionnels</Link>
              {isLoggedIn && (
                <Link to="/admin" className="nav-link text-gray-700">Administration</Link>
              )}

              {/* Mobile - affichage conditionnel */}
              <div className="flex flex-col space-y-2">
                <span className="text-primary font-semibold">{user.firstName + ' ' + user.lastName}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
      <AuthModalInscription 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  ) : (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isSearchPage ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className={`text-2xl font-montserrat font-bold transition-colors duration-300 ${getTextColor()}`}
              >
                <img
                  src="/images/logo/logoMP.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${getTextColor()} hover:text-primary nav`}>Accueil</Link>
              <Link to="/about" className={`${getTextColor()} hover:text-primary nav`}>À Propos</Link>
              <ScrollLink 
                to="services" 
                smooth={true} 
                duration={500} 
                className={`${getTextColor()} hover:text-primary nav cursor-pointer`}
              >
                Services
              </ScrollLink>
              <Link to="/search" className={`${getTextColor()} hover:text-primary nav`}>Professionnels</Link>
              {isLoggedIn && (
                <Link to="/admin" className={`${getTextColor()} hover:text-primary nav`}>Administration</Link>
              )}
              
              {/* Affichage conditionnel */}
              {/* <>
                <button 
                  onClick={() => setIsSignInOpen(true)} 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-100"
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => setIsSignUpOpen(true)} 
                  className="bg-transparent text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white"
                >
                  S'inscrire
                </button>
              </> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${getTextColor()}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white flex flex-col">
              <Link to="/" className="nav-link text-gray-700">Accueil</Link>
              <Link to="/about" className="nav-link text-gray-700">À Propos</Link>
              <Link to="/#services" className="nav-link text-gray-700">Services</Link>
              <Link to="/search" className="nav-link text-gray-700">Professionnels</Link>
              {isLoggedIn && (
                <Link to="/admin" className="nav-link text-gray-700">Administration</Link>
              )}

              {/* Mobile - affichage conditionnel */}
              {/* <>
                <button 
                  onClick={() => setIsSignInOpen(true)} 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-100"
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => setIsSignUpOpen(true)} 
                  className="bg-transparent text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white"
                >
                  S'inscrire
                </button>
              </> */}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
      <AuthModalInscription 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
};

export default Navbar;