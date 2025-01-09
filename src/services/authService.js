import { storage, StorageKeys } from '../utils/storage';
import { API_BASE_URL } from '../config/constants';

const authService = {
  login: async (credentials) => {
    try {
      // API response handling
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      storage.set(StorageKeys.TOKEN, data.token);
      storage.set(StorageKeys.USER, JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = storage.get(StorageKeys.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  getToken: () => storage.get(StorageKeys.TOKEN),

  logout: () => {
    storage.remove(StorageKeys.TOKEN);
    storage.remove(StorageKeys.USER);
  },

  isAuthenticated: () => !!storage.get(StorageKeys.TOKEN),
};

export default authService;