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
  MenuItem,
  Grid,
} from '@mui/material';
import { Print, Update, LocalShipping } from '@mui/icons-material';
import adminService from '../../../services/adminService';
import toast from 'react-hot-toast';

import { Delete, Search } from '@mui/icons-material';
export default function WCutFlexoPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '', // Changed from 'all' to empty string for default view
    page: 1,
    limit: 10
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminService.getWCutFlexo(filters);
      console.log(response.data);
      // Check if response.data exists and has the expected structure
      setOrders(response.data || []); // Adjust based on your API response structure
    } catch (error) {
      toast.error(error.message);
      setOrders([]); // Set empty array on error
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
      page: 1 // Reset page when filters change
    }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      type: '',
    });
  };
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await adminService.updateProductionStatus('w-cut-flexo', orderId, newStatus);
      toast.success('Status updated successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMoveToBagMaking = async (orderId) => {
    try {
      await adminService.moveToNextStage('w-cut-flexo', orderId, 'bag-making');
      toast.success('Order moved to Bag Making');
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
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.jobName}</TableCell>
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
                          onClick={() => handleStatusUpdate(order.id, 'in_progress')}
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
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
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
                          onClick={() => handleMoveToBagMaking(order.id)}
                        >
                          Move to Bag Making
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