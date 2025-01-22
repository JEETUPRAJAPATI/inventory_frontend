import api from './api';

export const adminProductionService = {
  // W-Cut Production
  getWCutFlexo: async (params) => {
    try {
      const response = await api.get('/admin/production/w-cut/flexo', { params });
      return {
        data: response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Error fetching W-Cut Flexo data:', error);
      throw error;
    }
  },

  getWCutBagMaking: async (params) => {
    try {
      const response = await api.get('/admin/production/w-cut/bag-making', { params });
      return {
        data: response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Error fetching W-Cut Bag Making data:', error);
      throw error;
    }
  },

  // D-Cut Production
  getDCutOpsert: async (params) => {
    try {
      const response = await api.get('/admin/production/d-cut/opsert', { params });
      return {
        data: response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Error fetching D-Cut Opsert data:', error);
      throw error;
    }
  },

  getDCutBagMaking: async (params) => {
    try {
      const response = await api.get('/admin/production/d-cut/bag-making', { params });
      return {
        data: response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      console.error('Error fetching D-Cut Bag Making data:', error);
      throw error;
    }
  }
};