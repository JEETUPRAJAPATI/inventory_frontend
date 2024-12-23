import api from './api';

const bagMakingService = {
  getRecords: async () => {
    const response = await api.get('/production/bagmaking/records');
    return response.data;
  },

  createRecord: async (data) => {
    const response = await api.post('/production/bagmaking/records', data);
    return response.data;
  },

  updateRecord: async (id, data) => {
    const response = await api.put(`/production/bagmaking/records/${id}`, data);
    return response.data;
  },

  deleteRecord: async (id) => {
    await api.delete(`/production/bagmaking/records/${id}`);
  }
};

export default bagMakingService;