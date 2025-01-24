// src/services/productService.js

import axios from 'axios';
import api from './api';

// Define the base URL for API calls
const API_URL = '/inventory/finished-products'; // You should adjust this to the actual endpoint

// Function to fetch all products
const getProducts = async (filters = {}) => {
    try {

        const response = await api.get(API_URL);
        // console.log('data', response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching products');
    }
};

// Function to fetch a single product by ID
const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching product');
    }
};

// Function to add a new product
const addProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error adding product');
    }
};

// Function to update an existing product
const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating product');
    }
};

// Function to delete a product
const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting product');
    }
};

export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};
