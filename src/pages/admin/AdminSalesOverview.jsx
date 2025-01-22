import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  TextField,
  Box,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';
import SummaryCard from '../../components/dashboard/SummaryCard';

export default function AdminSalesOverview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: 'all'
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSales(filters);
      console.log('Sales response:', response); // Debug log
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching sales:', error); // Debug log
      toast.error(error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (orderId) => {
    try {
      await adminService.deleteSalesOrder(orderId);
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate summary metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Sales Overview</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Total Orders"
            value={totalOrders}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Pending Orders"
            value={pendingOrders}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Completed Orders"
            value={completedOrders}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard
            title="Total Amount"
            value={`₹${totalAmount.toLocaleString()}`}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by order ID or customer name"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            SelectProps={{ native: true }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </TextField>
        </Grid>
      </Grid>

      <Card>
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>No orders found</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Job Name</TableCell>
                  <TableCell>Bag Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.jobName}</TableCell>
                    <TableCell>{order.bagDetails?.type}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>₹{order.totalAmount?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={
                          order.status === 'completed' ? 'success' :
                          order.status === 'in_progress' ? 'warning' : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>
    </Box>
  );
}