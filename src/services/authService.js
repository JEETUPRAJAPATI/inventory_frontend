import { storage, StorageKeys } from '../utils/storage';
import { API_BASE_URL } from '../config/constants';

const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Store token and user data
      if (data.token) {
        storage.set(StorageKeys.TOKEN, data.token);
      }
      
      if (data.user) {
        storage.set(StorageKeys.USER, JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      // Ensure error has a message property
      const errorMessage = error.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = storage.get(StorageKeys.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      storage.remove(StorageKeys.USER); // Clear invalid data
      return null;
    }
  },

  getToken: () => {
    const token = storage.get(StorageKeys.TOKEN);
    return token || null;
  },

  logout: () => {
    storage.remove(StorageKeys.TOKEN);
    storage.remove(StorageKeys.USER);
    // Clear any other auth-related data
    storage.remove('lastLoginTime');
  },

  isAuthenticated: () => {
    const token = storage.get(StorageKeys.TOKEN);
    const user = storage.get(StorageKeys.USER);
    return !!(token && user);
  },
};

export default authService;