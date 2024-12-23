import api from './api';
import { storage, StorageKeys } from '../utils/storage';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      storage.set(StorageKeys.TOKEN, token);
      storage.set(StorageKeys.USER, JSON.stringify(user));
      
      return { token, user };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
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