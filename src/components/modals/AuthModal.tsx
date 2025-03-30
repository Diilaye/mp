import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone, UserPlus, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type UserType = 'client' | 'housekeeper' | null;
type RegistrationType = 'self' | 'admin' | null;

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    console.log(formData);
    onClose();
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Handle social login
    console.log(`Login with ${provider}`);
  };

  const resetForm = () => {
    setUserType(null);
    setRegistrationType(null);
    setFormData({
      email: '',
      password: '',
      name: '',
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
       <form>
       <div className="p-6">
            <div className='mb-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="phone"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onClick={() => handleSocialLogin('google')}
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
                  onClick={() => handleSocialLogin('facebook')}
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
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Se connecter</span>
            </button>
           
          </div>
       </form>
      </motion.div>
    </div>
  );
};

export default AuthModal;