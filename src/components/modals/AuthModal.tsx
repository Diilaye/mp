import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone, UserPlus, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type UserType = 'client' | 'housekeeper' | null;
type RegistrationType = 'self' | 'admin' | null;

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Configure axios to handle CORS issues
      const response = await axios({
        method: 'post',
        //url: 'http://127.0.0.1:3031/api/v1/users/login',
        url : 'https://mp-api.nataal.shop/api/v1/users/login',
        data: {
          phone: formData.phone,
          password: formData.password,
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Remove any authorization headers if they're being added automatically
        },
        withCredentials: true,
        // Add timeout to get faster error responses
        timeout: 10000
      });
      
      console.log("Login response:", response);
      
      if (response.status === 200) {
        toast.success('Connexion réussie avec succès !');
        localStorage.setItem('user', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('role', response.data.data.role);
        onClose(); // Close modal first to avoid UI issues
        navigate('/admin');
        window.location.reload();
      } else {
        toast.error('Téléphone ou mot de passe incorrect !');
        setError('error');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // More detailed error handling
      if (error.code === 'ERR_NETWORK') {
        toast.error('Erreur de connexion au serveur. Vérifiez que le backend est actif et accessible.');
        setError('network');
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        if (status === 401) {
          toast.error('Téléphone ou mot de passe incorrect !');
        } else {
          toast.error(`Erreur ${status}: ${error.response.data.message || 'Une erreur est survenue'}`);
        }
        setError('error');
      } else {
        toast.error('Une erreur inattendue est survenue. Veuillez réessayer.');
        setError('error');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setUserType(null);
    setRegistrationType(null);
    setFormData({
      password: '',
      phone: '',
    });
  };

  const handleUserTypeSelect = (type: UserType) => {
    if (type === 'client') {
      navigate('/register/client');
      onClose();
    } else {
      setUserType('housekeeper');
    }
  };

  const handleRegistrationTypeSelect = (type: RegistrationType) => {
    if (type === 'self') {
      navigate('/register/housekeeper');
      onClose();
    } else {
      setRegistrationType(type);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-32 bg-black flex items-center justify-center border-b border-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-montserrat font-bold text-white flex items-center justify-center">
            
            <div className='flex items-center justify-center'>
              {'Connexion'.toUpperCase()} 
            </div>
            
          </h2>
        </div>

        {/* Form */}
       <form onSubmit={handleSubmit}>
       <div className="p-6">
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Votre téléphone"
                  required
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-gray-600">Se souvenir de moi</span>
              </label>
              <button
                type="button"
                className="text-primary font-medium"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Ou continuer avec
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => null}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => null}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <img
                    src="https://www.facebook.com/favicon.ico"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
              disabled={isLoading}
            >
             {!isLoading && <ArrowRight className="w-5 h-5 mr-2" />} 
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
           
          </div>
          {error === 'success' && (
            <div className="text-green-600 font-medium mt-2 text-center pb-4">
              Connexion réussie !
            </div>
          )}
          
          {error === 'error' && (
            <div className="text-red-600 font-medium mt-2 text-center pb-4">
              Téléphone ou mot de passe incorrect.
            </div>
          )}
          
          {error === 'network' && (
            <div className="text-red-600 font-medium mt-2 text-center pb-4">
              Impossible de se connecter au serveur. Vérifiez votre connexion et que le backend est actif.
            </div>
          )}
       </form>
      </motion.div>
    </div>
  );
};

export default AuthModal;