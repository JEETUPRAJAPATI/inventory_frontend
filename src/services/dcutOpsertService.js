import api from './api';

const API_BASE_URL = '/dcut/opsert';

const OrderService = {
    listOrders: async (status) => {
        try {
            const response = await api.get(`${API_BASE_URL}/orders?status=${status}`);

            console.log('response', response);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch orders');
        }
    },

    updateOrderStatus: async (orderId, status, remarks) => {
        try {
            const response = await api.put(`${API_BASE_URL}/orders/${orderId}/status`, { status, remarks });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update order status');
        }
    },

    moveToDelivery: async (orderId) => {
        try {
            const response = await api.post(`${API_BASE_URL}/orders/${orderId}/move-to-delivery`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to move order to delivery');
        }
    },
    getRecords: async () => {
        const response = await api.get(`${API_BASE_URL}/production/records`);
        return response.data;
    },
};

export default OrderService;
