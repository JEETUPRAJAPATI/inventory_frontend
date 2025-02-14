import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import OrderList from '../../components/sales/orders/OrderList';
import SummaryCard from '../../components/dashboard/SummaryCard';
import orderService from '/src/services/orderService.js';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Metrics state
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update metrics whenever orders change
  useEffect(() => {
    setTotalOrders(orders.length);
    setPendingOrders(orders.filter(order => order.status === 'pending').length);
    setCompletedOrders(orders.filter(order => order.status === 'completed').length);
    setTotalAmount(
      orders.reduce((sum, order) => {
        const price = parseFloat(order.orderPrice);
        return sum + (isNaN(price) ? 0 : price);
      }, 0)
    );

  }, [orders]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Total Orders" value={totalOrders} color="primary" />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Pending Orders" value={pendingOrders} color="warning" />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Completed Orders" value={completedOrders} color="success" />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard title="Total Amount" value={`₹${totalAmount.toLocaleString()}`} color="info" />
      </Grid>
      <Grid item xs={12}>
        <OrderList orders={orders} refreshOrders={fetchOrders} loading={loading} />
      </Grid>
    </Grid>
  );
}
