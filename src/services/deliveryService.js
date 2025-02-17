import api from './api';

const deliveryService = {
  // Get all deliveries with filters
  getDeliveries: async (params) => {
    try {
      const response = await api.get('/delivery', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch deliveries');
    }
  },

  // Get single delivery by ID
  getDeliveryById: async (id) => {
    try {
      const response = await api.get(`/delivery/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch delivery details');
    }
  },
  updateDelivery: async (id, updatedDetails) => {
    const response = await api.put(`inventory/delivery/${id}`, updatedDetails);
    return response.data;
  },

  // Update delivery status
  updateDeliveryStatus: async (id, status) => {
    try {
      const response = await api.put(`/delivery/${id}`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update delivery status');
    }
  }
};

export default deliveryService;