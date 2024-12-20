export const StorageKeys = {
  TOKEN: 'authToken',
  USER: 'user'
};

export const storage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage', error);
      return false;
    }
  }
};