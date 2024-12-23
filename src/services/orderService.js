import api from './api';

const orderService = {
  getOrders: async () => {
    const response = await api.get('/sales/orders');
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post('/sales/orders', orderData);
    return response.data;
  },

  updateOrder: async (orderId, orderData) => {
    const response = await api.put(`/sales/orders/${orderId}`, orderData);
    return response.data;
  },

  deleteOrder: async (orderId) => {
    await api.delete(`/sales/orders/${orderId}`);
  }
};

export default orderService;