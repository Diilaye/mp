/**
 * API Configuration
 * 
 * This file contains the configuration for all API calls in the application.
 * Centralizing API URLs makes it easier to switch between environments.
 */

// Base URL for all API requests
//export const API_BASE_URL = 'http://127.0.0.1:3031/api/v1';

export const API_BASE_URL = 'https://mp-api.nataal.shop/api/v1';



// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User endpoints
  USER: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  
  // Employer endpoints
  EMPLOYERS: {
    LIST: '/employers',
    DETAILS: (id: string) => `/employers/${id}`,
    CREATE: '/employers',
    UPDATE: (id: string) => `/employers/${id}`,
    DELETE: (id: string) => `/employers/${id}`,
  },
  
  // Booking endpoints
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    DETAILS: (id: string) => `/bookings/${id}`,
    UPDATE: (id: string) => `/bookings/${id}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
  
  // Reviews endpoints
  REVIEWS: {
    LIST: '/reviews-admin',
    CLIENT: '/reviews-client',
    DETAILS: (id: string) => `/reviews-admin/${id}`,
    CREATE: '/reviews-admin',
    UPDATE: (id: string) => `/reviews-admin/${id}`,
    DELETE: (id: string) => `/reviews-admin/${id}`,
  },
  
  // Service endpoints
  SERVICE: {
    LIST: '/service',
    DETAILS: (id: string) => `/service/${id}`,
    CREATE: '/service',
    UPDATE: (id: string) => `/service/${id}`,
    DELETE: (id: string) => `/service/${id}`,
  },
  
  // Payment endpoints
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: (reference: string) => `/payments/verify/${reference}`,
    CALLBACK: '/payments/callback',
  },
};

/**
 * Helper function to get a full API URL
 * @param endpoint - The API endpoint path
 * @returns The complete API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getApiUrl,
};
