import api from './api';

const adminService = {
  // Sales Management
  getSales: async (params) => {
    try {
      const response = await api.get('/admin/sales', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch sales data');
    }
  },

  updateSalesOrder: async (orderId, updatedData) => {
    try {
      const response = await api.put(`/admin/sales/${orderId}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating sales order');
    }
  },

  // Delete a sales order
  deleteSalesOrder: async (orderId) => {
    try {
      const response = await api.delete(`/admin/sales/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting sales order');
    }
  },

  // User Management
  getUsers: async (params) => {
    try {
      const response = await api.get('/admin/users', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  updateUser: async (id, userData) => {
    try {
      // Remove password if it's empty
      if (!userData.password) {
        const { password, confirmPassword, ...dataWithoutPassword } = userData;
        userData = dataWithoutPassword;
      }

      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },


  getDeliveries: async (params) => {
    try {
      const response = await api.get(`admin/delivery`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch deliveries');
    }
  },
  // Edit an existing delivery
  updateDelivery: async (id, deliveryData) => {
    try {
      const response = await api.put(`admin/delivery/${id}`, deliveryData);
      return response.data; // return the data from response
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to edit delivery');
    }
  },

  // Delete a delivery
  deleteDelivery: async (id) => {
    try {
      const response = await api.delete(`admin/delivery/${id}`);
      return response.data; // return the data from response
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete delivery');
    }
  },
  // W-Cut Production Management
  getWCutFlexo: async (params) => {
    try {
      const response = await api.get('/admin/production/w-cut/flexo', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch W-Cut Flexo data');
    }
  },

  getWCutBagMaking: async (params) => {
    try {
      const response = await api.get('/admin/production/w-cut/bag-making', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch W-Cut Bag Making data');
    }
  },

  // D-Cut Production Management
  getDCutOpsert: async (params) => {
    try {
      const response = await api.get('/admin/production/d-cut/opsert', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch D-Cut Opsert data');
    }
  },

  getDCutBagMaking: async (params) => {
    try {
      const response = await api.get('/admin/production/d-cut/bag-making', { params });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch D-Cut Bag Making data');
    }
  },

  // Production Status Updates
  updateProductionStatus: async (type, id, status) => {
    try {
      const response = await api.put(`/admin/production/${type}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update status');
    }
  },

  // Production Process Movement
  moveToNextStage: async (type, id, nextStage) => {
    try {
      const response = await api.post(`/admin/production/${type}/${id}/move`, { nextStage });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error.response?.data?.message || 'Failed to move to next stage');
    }
  }
};

export default adminService;