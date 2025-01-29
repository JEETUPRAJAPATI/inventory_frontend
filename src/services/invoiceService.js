// src/services/productService.js

import api from './api'; // Axios instance with predefined interceptors

const API_URL = '/inventory/invoices'; // Base endpoint for purchase orders

// Fetch all products with optional filters
const getInvoices = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(filters).toString(); // Convert filters to query string
        const response = await api.get(`${API_URL}?${queryString}`);
        return response.data; // Return the data payload
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching products');
    }
};

// Fetch a single product by ID
const getProductById = async (productId) => {
    try {
        const response = await api.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching product');
    }
};

// Add a new product
const addProduct = async (productData) => {
    try {
        const response = await api.post(API_URL, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error adding product');
    }
};

// Update an existing product by ID
const updateOrder = async (productId, productData) => {
    try {
        const response = await api.put(`${API_URL}/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating product');
    }
};

// Delete a product by ID
const deleteOrder = async (productId) => {
    try {
        const response = await api.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting product');
    }
};

export default {
    getInvoices,
    getProductById,
    addProduct,
    updateOrder,
    deleteOrder,
};
