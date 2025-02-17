import api from './api';

// Define the base URL for package-related API calls
const PACKAGE_API_URL = '/inventory/package'; // Adjust to your actual endpoint

const ORDER_API_URL = '/inventory/packages/order';

export const fetchOrders = async () => {
    try {
        const response = await api.get(ORDER_API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching orders');
    }
};

/**
 * Function to fetch package details
 * @param {Object} filters - Filters to apply when fetching packages
 * @returns {Promise<Object>} The fetched package details
 */
export const fetchPackagesByOrderId = async (orderId) => {
    try {
        const response = await api.get(`${ORDER_API_URL}/${orderId}`);
        if (response.data.success) {
            console.log('response', response.data);
            return response.data;
        } else {
            throw new Error('Failed to fetch packages: Success flag is false');
        }
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
}
export const updateDeliveryStatus = async (id, status) => {
    try {
        const response = await api.put(`${PACKAGE_API_URL}/status/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update delivery status');
    }
}
/**
 * Function to update package details
 * @param {string} packageId - The ID of the package to update
 * @param {Object} packageData - The updated package data
 * @returns {Promise<Object>} The updated package details
 */
export const updatePackage = async (orderId, packageId, packageData) => {
    try {
        const response = await api.put(`${PACKAGE_API_URL}/${orderId}/${packageId}`, packageData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating package');
    }
};


/**
 * Function to add a new package
 * @param {Object} packageData - The new package data to create
 * @returns {Promise<Object>} The created package details
 */
export const addPackage = async (packageData) => {
    try {
        const response = await api.post(PACKAGE_API_URL, packageData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating package');
    }
};

export const createPackage = async (payload) => {
    try {
        const response = await api.post(`${PACKAGE_API_URL}/order/addOrder/${payload.order_id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Error response:', error.response);  // Log the full error response
        throw new Error(error.response?.data?.message || 'Failed to add package');
    }
};

/**
 * Function to delete a package
 * @param {string} packageId - The ID of the package to delete
 * @returns {Promise<void>} Resolves if the deletion is successful
 */
export const deletePackage = async (packageId) => {
    try {
        await api.delete(`${PACKAGE_API_URL}/${packageId}`);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting package');
    }
};
export default {
    fetchOrders,
    fetchPackagesByOrderId,
    updatePackage,
    updateDeliveryStatus,
    addPackage,
    createPackage,
    deletePackage,
};