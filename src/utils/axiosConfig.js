import axios from 'axios';
import authService from '../services/authService';

const axiosInstance = axios.create({
  baseURL: 'https://inventory-zmsp.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);