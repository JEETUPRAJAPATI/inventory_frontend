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
} from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';
import DeliveryDetailsModal from './DeliveryDetailsModal';
import DeliveryFilters from './DeliveryFilters';
import toast from 'react-hot-toast';
import deliveryService from '../../services/deliveryService';

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusUpdate = async (deliveryId, newStatus) => {
    try {
      await deliveryService.updateDeliveryStatus(deliveryId, newStatus);
      toast.success(`Delivery status updated to ${newStatus}`);
      fetchDeliveries();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'warning',
      'In Transit': 'info',
      'Delivered': 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Delivery Management</Typography>
          <DeliveryFilters
            filters={filters}
            onFilterChange={setFilters}
          />
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
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell>{delivery.contact}</TableCell>
                    <TableCell>
                      {new Date(delivery.delivery_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={delivery.status}
                        color={getStatusColor(delivery.status)}
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

                      {delivery.status === 'Pending' && (
                        <>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleStatusUpdate(delivery._id, 'In Transit')}
                          >
                            <CheckCircle />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleStatusUpdate(delivery._id, 'Cancelled')}
                          >
                            <Cancel />
                          </IconButton>
                        </>
                      )}

                      {delivery.status === 'In Transit' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusUpdate(delivery._id, 'Delivered')}
                        >
                          Mark Delivered
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

      <DeliveryDetailsModal
        open={!!selectedDelivery}
        delivery={selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
      />
    </>
  );
}