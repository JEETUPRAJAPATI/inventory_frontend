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
  IconButton,
  Box,
  MenuItem,
} from '@mui/material';

import { Print, Update, LocalShipping, Search, Delete } from '@mui/icons-material';
import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

export default function WCutBagMakingPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
    limit: 20
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getWCutBagMaking(filters);
      setOrders(response.data || []);
    } catch (error) {
      toast.error(error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setFilters({
      search: '',
      type: '',
    });
  };
  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await adminService.updateProductionStatus('w-cut-bag-making', orderId, newStatus);
      toast.success('Status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMoveToDelivery = async (orderId) => {
    try {
      await adminService.moveToNextStage('w-cut-bag-making', orderId, 'delivery');
      toast.success('Order moved to Delivery');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (

    <Box sx={{ p: 3 }}>

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
          fullWidth
          select
          label="Status"
          name="status"
          size="small"
          sx={{ minWidth: 120 }}
          value={filters.status}
          onChange={handleFilterChange}
          SelectProps={{ native: true }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </TextField>

        <Button variant="outlined" onClick={handleReset}>
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
                  <TableCell>Job Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Bag Type</TableCell>
                  <TableCell>Handle Color</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Print Color</TableCell>
                  <TableCell>GSM</TableCell>
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Actions</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id || order.id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.orderDetails.jobName}</TableCell>
                    <TableCell>{order.orderDetails.quantity}</TableCell>
                    <TableCell>{order.orderDetails.customerName}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.type}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.handleColor}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.size}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.color}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.printColor}</TableCell>
                    <TableCell>{order.orderDetails.bagDetails.gsm}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
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
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setOrderToDelete(order);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>
    </Box >
  );
}