import api from './api';

const reportService = {
  getReports: async () => {
    const response = await api.get('/sales/reports');
    return response.data;
  },

  createReport: async (reportData) => {
    const response = await api.post('/sales/reports', reportData);
    return response.data;
  },

  updateReport: async (reportId, reportData) => {
    const response = await api.put(`/sales/reports/${reportId}`, reportData);
    return response.data;
  },

  deleteReport: async (reportId) => {
    await api.delete(`/sales/reports/${reportId}`);
  }
};

export default reportService;