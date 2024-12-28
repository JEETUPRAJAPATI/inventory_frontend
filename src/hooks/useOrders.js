import { useState } from 'react';
import { mockOrders } from '../data/mockOrders';
import toast from 'react-hot-toast';

export function useOrders() {
  const [orders, setOrders] = useState(mockOrders);

  const createOrder = async (orderData) => {
    try {
      const newOrder = {
        ...orderData,
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setOrders([...orders, newOrder]);
      return newOrder;
    } catch (error) {
      throw new Error('Failed to create order');
    }
  };

  const updateOrder = async (orderId, orderData) => {
    try {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, ...orderData } : order
      );
      setOrders(updatedOrders);
      return updatedOrders.find(order => order.id === orderId);
    } catch (error) {
      throw new Error('Failed to update order');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  };

  return {
    orders,
    isLoading: false,
    error: null,
    createOrder,
    updateOrder,
    deleteOrder,
  };
}