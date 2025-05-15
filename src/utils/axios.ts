import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../config/api.config';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      toast.error('Votre session a expiré. Veuillez vous reconnecter.');
      
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Redirect to login page
      // Use a small timeout to allow the toast to be displayed
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
