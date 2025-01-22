import { useState, useEffect } from 'react';
import {
  Box,
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
  Grid,
} from '@mui/material';
import { Print, Update, LocalShipping } from '@mui/icons-material';
import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

export default function DCutOpsertPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 15
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getDCutOpsert(filters);
      setOrders(response.data || []);
    } catch (error) {
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
      [name]: value,
      page: 1
    }));
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await adminService.updateProductionStatus('d-cut-opsert', orderId, newStatus);
      toast.success('Status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMoveToDelivery = async (orderId) => {
    try {
      await adminService.moveToNextStage('d-cut-opsert', orderId, 'delivery');
      toast.success('Order moved to Delivery');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>D-Cut Opsert Production</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
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
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In_progress">In Progress</option>
            <option value="Completed">Completed</option>
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
                  <TableCell>Job Name</TableCell>
                  <TableCell>Print Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id || order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.jobName}</TableCell>
                    <TableCell>{order.printType}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
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
                      {order.status === 'pending' && (
                        <Button
                          startIcon={<Print />}
                          variant="contained"
                          size="small"
                          onClick={() => handleStatusUpdate(order._id || order.id, 'in_progress')}
                        >
                          Start Process
                        </Button>
                      )}
                      {order.status === 'in_progress' && (
                        <Button
                          startIcon={<Update />}
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleStatusUpdate(order._id || order.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                      {order.status === 'completed' && (
                        <Button
                          startIcon={<LocalShipping />}
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleMoveToDelivery(order._id || order.id)}
                        >
                          Move to Delivery
                        </Button>
                      )}
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