import { useState, useEffect, useCallback } from 'react';
import orderService from '../services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = async (orderData) => {
    try {
      const newOrder = await orderService.createOrder(orderData);
      await fetchOrders();
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateOrder = async (orderId, orderData) => {
    try {
      const updatedOrder = await orderService.updateOrder(orderId, orderData);
      await fetchOrders();
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await orderService.deleteOrder(orderId);
      await fetchOrders();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  };
}