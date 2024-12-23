import axios from 'axios';
import { storage, StorageKeys } from '../utils/storage';

const API_URL = 'https://inventory-zmsp.onrender.com/api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      
      // Store auth data
      storage.set(StorageKeys.TOKEN, token);
      storage.set(StorageKeys.USER, JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    storage.remove(StorageKeys.TOKEN);
    storage.remove(StorageKeys.USER);
  },

  getCurrentUser: () => {
    const userStr = storage.get(StorageKeys.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => storage.get(StorageKeys.TOKEN),

  isAuthenticated: () => !!storage.get(StorageKeys.TOKEN),
};

export default authService;