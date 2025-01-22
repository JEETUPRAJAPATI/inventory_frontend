import api from './api';

const adminService = {
  // Sales Management
  getSales: async (params) => {
    const response = await api.get('/admin/sales', { params });
    return response.data;
  },

  deleteSalesOrder: async (orderId) => {
    await api.delete(`/admin/sales/${orderId}`);
  },

  // Delivery Management
  getDeliveries: async (params) => {
    const response = await api.get('/admin/delivery', { params });
    return response.data;
  },

  // Production Management - W-Cut
  getWCutFlexo: async (params) => {
    const response = await api.get('/admin/production/w-cut/flexo', { params });
    return response.data;
  },

  startFlexoPrinting: async (orderId) => {
    const response = await api.post(`/admin/production/w-cut/flexo/${orderId}/start`);
    return response.data;
  },

  updateFlexoStatus: async (orderId, status) => {
    const response = await api.put(`/admin/production/w-cut/flexo/${orderId}/status`, { status });
    return response.data;
  },

  moveFlexoToBagMaking: async (orderId) => {
    const response = await api.post(`/admin/production/w-cut/flexo/${orderId}/move-to-bagmaking`);
    return response.data;
  },

  getWCutBagMaking: async (params) => {
    const response = await api.get('/admin/production/w-cut/bag-making', { params });
    return response.data;
  },

  startBagMakingProcess: async (orderId) => {
    const response = await api.post(`/admin/production/bag-making/${orderId}/start`);
    return response.data;
  },

  updateBagMakingStatus: async (orderId, status) => {
    const response = await api.put(`/admin/production/bag-making/${orderId}/status`, { status });
    return response.data;
  },

  moveBagMakingToDelivery: async (orderId) => {
    const response = await api.post(`/admin/production/bag-making/${orderId}/move-to-delivery`);
    return response.data;
  },

  // Production Management - D-Cut
  getDCutBagMaking: async (params) => {
    const response = await api.get('/admin/production/d-cut/bag-making', { params });
    return response.data;
  },

  getDCutOpsert: async (params) => {
    const response = await api.get('/admin/production/d-cut/opsert', { params });
    return response.data;
  },

  startOpsertPrinting: async (orderId) => {
    const response = await api.post(`/admin/production/d-cut/opsert/${orderId}/start`);
    return response.data;
  },

  updateOpsertStatus: async (orderId, status) => {
    const response = await api.put(`/admin/production/d-cut/opsert/${orderId}/status`, { status });
    return response.data;
  },

  moveOpsertToDelivery: async (orderId) => {
    const response = await api.post(`/admin/production/d-cut/opsert/${orderId}/move-to-delivery`);
    return response.data;
  },

  // User Management
  getUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/admin/users/${id}`);
  },

  // Error Handler
  handleError: (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
};

export default adminService;