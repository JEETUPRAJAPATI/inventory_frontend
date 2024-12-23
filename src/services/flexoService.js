import api from './api';

const flexoService = {
  getRecords: async () => {
    const response = await api.get('/production/flexo/records');
    return response.data;
  },

  createRecord: async (data) => {
    const response = await api.post('/production/flexo/records', data);
    return response.data;
  },

  updateRecord: async (id, data) => {
    const response = await api.put(`/production/flexo/records/${id}`, data);
    return response.data;
  },

  deleteRecord: async (id) => {
    await api.delete(`/production/flexo/records/${id}`);
  }
};

export default flexoService;