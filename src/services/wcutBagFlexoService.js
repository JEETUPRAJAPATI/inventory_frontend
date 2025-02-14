import api from './api';

const API_BASE_URL = '/wcut/flexo';

const OrderService = {
    // 1. List all orders
    listOrders: async (status) => {
        try {
            const response = await api.get(`${API_BASE_URL}?status=${status}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 2. Verification API
    verifyOrder: async (orderId, scanData) => {
        try {
            const response = await api.post(`${API_BASE_URL}/${orderId}/verify`, scanData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 3. Status update API
    updateOrderStatus: async (orderId, status, remarks) => {
        try {
            const response = await api.put(`${API_BASE_URL}/${orderId}`, {
                status,
                remarks
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 4. Direct billing API
    directBilling: async (orderId, bagType) => {
        try {
            const response = await api.put(`${API_BASE_URL}/${orderId}/billing`, { billingStatus: 'completed', type: bagType });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    // 5. Move to delivery API
    moveToBagMaking: async (orderId) => {
        try {
            const response = await api.put(`${API_BASE_URL}/${orderId}/bag_making`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export default OrderService;
