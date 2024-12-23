import api from './api';

const metricsService = {
  getMetrics: async (machineType) => {
    const response = await api.get(`/production/${machineType}/metrics`);
    return response.data;
  },

  updateMetrics: async (machineType, data) => {
    const response = await api.put(`/production/${machineType}/metrics`, data);
    return response.data;
  }
};

export default metricsService;