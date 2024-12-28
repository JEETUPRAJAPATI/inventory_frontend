import { storage, StorageKeys } from '../utils/storage';

const authService = {
  login: async (credentials) => {
    try {
      // Simulated API response for development
      const email = credentials.email.toLowerCase();
      let operatorType = null;
      let registrationType = email.split('@')[0];
      
      // Set operator type based on email prefix
      if (email.startsWith('flexo')) {
        operatorType = 'flexo_printing';
        registrationType = 'production';
      } else if (email.startsWith('opsert')) {
        operatorType = 'opsert_printing';
        registrationType = 'production';
      } else if (email.startsWith('wcut')) {
        operatorType = 'w_cut_bagmaking';
        registrationType = 'production';
      } else if (email.startsWith('dcut')) {
        operatorType = 'd_cut_bagmaking';
        registrationType = 'production';
      } else if (email.startsWith('production@')) {
        registrationType = 'production_manager';
      }

      const user = {
        id: '1',
        fullName: 'Test User',
        email: email,
        registrationType: registrationType,
        operatorType: operatorType,
      };
      
      const token = 'dummy-token';
      
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