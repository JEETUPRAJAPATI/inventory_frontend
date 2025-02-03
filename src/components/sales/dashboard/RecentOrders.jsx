import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '/src/services/orderService.js';

const mockOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    jobName: 'Premium Shopping Bags',
    quantity: 5000,
    status: 'pending'
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    jobName: 'Eco Friendly Bags',
    quantity: 3000,
    status: 'completed'
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    jobName: 'Gift Bags - Large',
    quantity: 2000,
    status: 'in_progress'
  },
  {
    id: 4,
    customerName: 'Sarah Williams',
    jobName: 'Custom Print Bags',
    quantity: 4000,
    status: 'pending'
  },
  {
    id: 5,
    customerName: 'Robert Brown',
    jobName: 'Luxury Shopping Bags',
    quantity: 1500,
    status: 'completed'
  }
];

export default function RecentOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        const response = await orderService.recentOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Recent Orders</Typography>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/sales/orders')}
        >
          View All
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id || `order-${order._id}`}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.jobName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No recent orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}