import api from './api';

const flexoService = {
  getRecords: async () => {
    const response = await api.get('wcut/flexo/production/records');
    return response.data;
  },

  // createRecord: async (data) => {
  //   const response = await api.post('/flexo/production/records', data);
  //   return response.data;
  // },

  updateRecord: async (id, data) => {
    const response = await api.put(`wcut/flexo/production/records/${id}`, data);
    return response.data;
  },

  deleteRecord: async (id) => {
    await api.delete(`wcut/flexo/production/records/${id}`);
  }
};

export default flexoService;