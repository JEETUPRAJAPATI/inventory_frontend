import api from './api';

const WCUT_API_URL = '/production/manager/wcut/bagmaking';
const DCUT_API_URL = '/production/manager/dcut/bagmaking';

// Fetch all orders with pagination and filtering
const getWcutOrders = async (page = 1, limit = 10, filters = {}) => {
    try {
        const response = await api.get(`${WCUT_API_URL}?page=${page}&limit=${limit}`, { params: filters });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching W-Cut orders');
    }
};

const getDcutOrders = async (page = 1, limit = 10, filters = {}) => {
    try {
        const response = await api.get(`${DCUT_API_URL}?page=${page}&limit=${limit}`, { params: filters });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching D-Cut orders');
    }
};
const getProductionRecord = async (orderId) => {
    try {
        const response = await api.get(`/production/manager/get/${orderId}`);
        return response.data.data.production_manager; // assuming production_manager is the data you need
    } catch (error) {
        throw new Error('Error fetching production record: ' + error.message);
    }
};

const updateProductionRecord = async (data, order_id) => {
    try {
        const response = await api.put(`/production/manager/update/${order_id}`, {
            ...data,
            order_id, // Pass the order_id as part of the request
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating production record: ' + error.message);
    }
};

const getFullOrderDetails = async (orderId) => {
    try {
        const response = await api.get(`/production/manager/view/${orderId}`);
        console.log('response data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching full order details:', error);
        throw error;
    }
}

export default {
    getWcutOrders,
    getDcutOrders,
    updateProductionRecord,
    getProductionRecord,
    getFullOrderDetails
};
