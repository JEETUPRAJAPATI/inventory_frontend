import api from './api';

const orderService = {
  getOrders: async () => {
    const response = await api.get('/sales/orders');
    return response.data;
  },

  recentOrders: async () => {
    const response = await api.get('/sales/recentOrders');
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
  },
  getUsedMobileNumbers: async () => {
    const response = await api.get('/sales/orders/list/mobile-numbers');
    return response.data;
  },
  getOrderByMobileNumber: async (mobileNumber) => {
    const response = await api.get(`/sales/orders/get/mobile-numbers?mobileNumber=${mobileNumber}`);
    return response.data; // This will return order details based on the mobile number
  }
};

export default orderService;
