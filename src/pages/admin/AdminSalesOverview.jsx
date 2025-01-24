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
  MenuItem,
} from '@mui/material';
import { Delete, Search } from '@mui/icons-material';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

export default function AdminSalesOverview() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: 'all',
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSales(filters);
      console.log('Sales response:', response); // Debug log
      setOrders(response?.data || []);
    } catch (error) {
      console.error('Error fetching sales:', error); // Debug log
      toast.error('Error fetching sales data');
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
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (orderId) => {
    try {
      await adminService.deleteSalesOrder(orderId);
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Error deleting order');
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      type: 'all',
    });
  };

  // Calculate summary metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === 'pending').length;
  const completedOrders = orders.filter((order) => order.status === 'completed').length;
  const totalAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search..."
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
        />
        <TextField
          select
          size="small"
          name="status"
          value={filters.type}
          onChange={handleFilterChange}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <Button variant="outlined" onClick={handleResetFilters}>
          Reset
        </Button>
      </Box>

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
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerName || 'N/A'}</TableCell>
                    <TableCell>{order.jobName || 'N/A'}</TableCell>
                    <TableCell>{order.bagDetails?.type || 'N/A'}</TableCell>
                    <TableCell>{order.quantity || '0'}</TableCell>
                    <TableCell>₹{order.totalAmount?.toLocaleString() || '0'}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status?.toUpperCase() || 'UNKNOWN'}
                        color={
                          order.status === 'completed'
                            ? 'success'
                            : order.status === 'in_progress'
                              ? 'warning'
                              : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    {/* <TableCell>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </Button>
                    </TableCell> */}
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
