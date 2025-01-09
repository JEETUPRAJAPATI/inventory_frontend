import api from './api';

const opsertService = {
  getRecords: async () => {
    const response = await api.get('/production/opsert/records');
    return response.data;
  },

  createRecord: async (data) => {
    const response = await api.post('/production/opsert/records', data);
    return response.data;
  },

  updateRecord: async (id, data) => {
    const response = await api.put(`/production/opsert/records/${id}`, data);
    return response.data;
  },

  deleteRecord: async (id) => {
    await api.delete(`/production/opsert/records/${id}`);
  }
};

export default opsertService;