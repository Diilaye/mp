import { toast } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

interface TokenPayload {
  exp: number;
  userId: string;
  role: string;
  [key: string]: any;
}

/**
 * Check if the token is valid and not expired
 * @returns boolean indicating if the token is valid
 */
export const isTokenValid = (): boolean => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }
    
    // Decode the token to get the expiration time
    const decoded = jwt_decode<TokenPayload>(token);
    
    // Check if the token is expired
    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Logout the user and redirect to login page
 * @param message Optional message to display
 */
export const logoutUser = (message?: string): void => {
  // Clear auth data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  
  // Show message if provided
  if (message) {
    toast.error(message);
  }
  
  // Redirect to login page after a small delay to allow toast to be displayed
  setTimeout(() => {
    window.location.href = '/login';
  }, 1500);
};

/**
 * Get the current user's ID from the token
 * @returns User ID or null if not available
 */
export const getCurrentUserId = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt_decode<TokenPayload>(token);
    return decoded.userId || null;
  } catch (error) {
    console.error('Error getting user ID from token:', error);
    return null;
  }
};

/**
 * Get the current user's role from the token
 * @returns User role or null if not available
 */
export const getCurrentUserRole = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt_decode<TokenPayload>(token);
    return decoded.role || null;
  } catch (error) {
    console.error('Error getting user role from token:', error);
    return null;
  }
};
