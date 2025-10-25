// API Configuration for both development and production environments
const API_CONFIG = {
  // Development environment (localhost)
  development: {
    BASE_URL: 'http://localhost:3001', // Updated to match existing backend port
    ENDPOINTS: {
      // Add your API endpoints here
      PRODUCTS: '/api/products',
      PRODUCTS_BY_CATEGORY: '/api/products/category/',
      CATEGORIES: '/api/products/categories/all', // For product categories (existing)
      CATEGORIES_MANAGEMENT: '/api/categories', // For category management
      USERS: '/api/users',
      ORDERS: '/api/orders',
      INQUIRIES: '/api/inquiries',
      AUTH: {
        LOGOUT: '/api/auth/logout',
        LOGIN: '/api/auth/login',
        SIGNUP: '/api/auth/signup',
      },
      // Add more endpoints as needed
    }
  },

  // Production environment
  production: {
    BASE_URL: 'https://show-case-s3ck.onrender.com',
    ENDPOINTS: {
      // Add your API endpoints here (same as development but using production base URL)
      PRODUCTS: '/api/products',
      PRODUCTS_BY_CATEGORY: '/api/products/category/',
      CATEGORIES: '/api/products/categories/all', // For product categories (existing)
      CATEGORIES_MANAGEMENT: '/api/categories', // For category management
      USERS: '/api/users',
      ORDERS: '/api/orders',
      INQUIRIES: '/api/inquiries',
      AUTH: {
        LOGOUT: '/api/auth/logout',
        LOGIN: '/api/auth/login',
        SIGNUP: '/api/auth/signup',
      },
      // Add more endpoints as needed
    }
  }
};

// Get current environment (development or production)
const getCurrentEnvironment = () => {
  // You can modify this logic based on your needs
  // For example, check if we're in development mode or production
  if (import.meta.env?.MODE === 'production' || window.location.hostname !== 'localhost') {
    return 'production';
  }
  return 'development';
};

// Get API configuration based on current environment
export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env];
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint) => {
  const config = getApiConfig();
  return `${config.BASE_URL}${endpoint}`;
};

// Export current environment config for direct access if needed
export const API_ENDPOINTS = getApiConfig().ENDPOINTS;
export const BASE_URL = getApiConfig().BASE_URL;

export default getApiConfig;
