import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Lock, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config/api.config';
const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
     const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const validatePhone = (phone: string) => {
    // Format accepté: chiffres, peut contenir des espaces, parenthèses, tirets et le préfixe +
    const re = /^[\d\s()+\-]{8,15}$/;
    return re.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {
      phone: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
    let isValid = true;

    if (!formData.phone) {
      newErrors.phone = 'Téléphone est requis';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe est requis';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '6 caractères minimum';
      isValid = false;
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nom est requis';
        isValid = false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Configure axios to handle CORS issues
      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/users/login`,
        // Utilisation de l'API_BASE_URL depuis la configuration
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Réinitialiser les erreurs lors du changement de mode
    setErrors({
      phone: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-montserrat font-bold text-gray-900">
            {isLogin ? 'Connexion à votre compte' : 'Créer un compte'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Accédez à votre dashbord' : 'Rejoignez-nous pour découvrir nos services'}
          </p>
        </div>
        
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-center font-medium ${
              isLogin ? 'text-rose-600 border-b-2 border-rose-600' : 'text-gray-500'
            }`}
          >
            <LogIn className="w-4 h-4 inline-block mr-2" />
            Connexion
          </button>
          {/* <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-center font-medium ${
              !isLogin ? 'text-rose-600 border-b-2 border-rose-600' : 'text-gray-500'
            }`}
          >
            <UserPlus className="w-4 h-4 inline-block mr-2" />
            Inscription
          </button> */}
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AnimatedFormFields isLogin={isLogin} formData={formData} errors={errors} handleChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
            >
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </div>

          <div className="text-center text-sm">
            {/* <p className="text-gray-600">
              {isLogin ? 'Vous n\'avez pas de compte?' : 'Vous avez déjà un compte?'}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-rose-600 hover:text-rose-700 font-medium transition-colors"
              >
                {isLogin ? 'S\'inscrire' : 'Se connecter'}
              </button>
            </p> */}
          </div>
          
          {/* {isLogin && (
            <div className="text-center text-sm">
              <a href="#" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                Mot de passe oublié?
              </a>
            </div>
          )} */}
        </form>
      </motion.div>
    </div>
  );
};

// Composant pour animer les champs de formulaire
const AnimatedFormFields = ({ 
  isLogin, 
  formData, 
  errors, 
  handleChange, 
  showPassword, 
  setShowPassword 
}: { 
  isLogin: boolean;
  formData: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors`}
              placeholder="Votre nom complet"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de téléphone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors`}
            placeholder="+221 xx xxx xx xx"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors`}
            placeholder="••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>
      </div>
      
     
    </motion.div>
  );
};

export default LoginPage;