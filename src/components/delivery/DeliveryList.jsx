import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import toast from 'react-hot-toast';
import deliveryService from '../../services/deliveryService';
import DeliveryDetailsModal from './DeliveryDetailsModal';
import DeliveryFilters from './DeliveryFilters';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    timeRange: 'month',
    page: 1,
    limit: 10
  });
  const [statusToUpdate, setStatusToUpdate] = useState(''); // State for editing the status

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await deliveryService.getDeliveries(filters);
      setDeliveries(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [filters]);

  const handleView = async (deliveryId) => {
    try {
      const delivery = await deliveryService.getDeliveryById(deliveryId);
      setSelectedDelivery(delivery);
      setStatusToUpdate(delivery.status); // Set the current status for editing
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusUpdate = async (deliveryId) => {
    try {
      await deliveryService.updateDeliveryStatus(deliveryId, statusToUpdate);
      toast.success(`Delivery status updated to ${statusToUpdate}`);
      fetchDeliveries();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'in transit': 'info',
      delivered: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 2 }}>
          <DeliveryFilters filters={filters} onFilterChange={setFilters} />
        </Box>

        <TableContainer>
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Delivery Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveries.map((delivery) => (
                  <TableRow key={delivery._id}>
                    <TableCell>{delivery.orderId || 'N/A'}</TableCell>
                    <TableCell>{delivery.orderDetails?.customerName || 'N/A'}</TableCell>
                    <TableCell>{delivery.orderDetails?.mobileNumber || 'N/A'}</TableCell>
                    <TableCell>{delivery.deliveryDate ? new Date(delivery.deliveryDate).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={delivery.status || 'N/A'}
                        color={getStatusColor(delivery.status || 'default')}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleView(delivery._id)}
                      >
                        <Visibility />
                      </IconButton>

                      {delivery.status !== 'delivered' && (
                        <>
                          <FormControl sx={{ minWidth: 120, ml: 1 }} size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={statusToUpdate}
                              onChange={(e) => setStatusToUpdate(e.target.value)}
                              label="Status"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="in transit">In Transit</MenuItem>
                              <MenuItem value="delivered">Delivered</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => handleStatusUpdate(delivery._id)}
                            sx={{ ml: 1 }}
                          >
                            Update Status
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>

      <DeliveryDetailsModal
        open={!!selectedDelivery}
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />
    </>
  );
}
