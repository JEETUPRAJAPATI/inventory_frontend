import { useState } from 'react';
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
  TextField,
  Box,
} from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';
import DeliveryDetailsModal from './DeliveryDetailsModal';
import toast from 'react-hot-toast';

const mockDeliveries = [
  {
    id: 'DEL001',
    customerName: 'John Doe',
    address: '123 Main St, City, State, 12345',
    deliveryDate: '2024-02-25',
    status: 'pending',
    items: [
      { name: 'Premium Shopping Bags', quantity: 500 },
      { name: 'Gift Bags', quantity: 200 }
    ],
    contact: '+1234567890',
    notes: 'Handle with care'
  },
  {
    id: 'DEL002',
    customerName: 'Jane Smith',
    address: '456 Oak Ave, Town, State, 67890',
    deliveryDate: '2024-02-26',
    status: 'completed',
    items: [
      { name: 'Eco Bags', quantity: 1000 }
    ],
    contact: '+0987654321',
    notes: 'Leave at reception'
  }
];

export default function DeliveryList({ status }) {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleView = (delivery) => {
    setSelectedDelivery(delivery);
  };

  const handleAccept = (deliveryId) => {
    toast.success('Delivery status updated to On the Way');
  };

  const handleReject = (deliveryId) => {
    toast.success('Delivery rejected successfully');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'on-way': 'info',
      completed: 'success',
      rejected: 'error'
    };
    return colors[status] || 'default';
  };

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesStatus = status === 'completed' 
      ? delivery.status === 'completed'
      : delivery.status !== 'completed';
    
    const matchesSearch = delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || delivery.deliveryDate === dateFilter;
    
    return matchesStatus && matchesSearch && matchesDate;
  });

  return (
    <>
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {status === 'completed' ? 'Completed Deliveries' : 'Pending Deliveries'}
          </Typography>
          
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search by customer or delivery ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
            <TextField
              type="date"
              size="small"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Delivery ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.id}</TableCell>
                  <TableCell>{delivery.customerName}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={delivery.status.toUpperCase()}
                      color={getStatusColor(delivery.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleView(delivery)}
                    >
                      <Visibility />
                    </IconButton>
                    
                    {delivery.status === 'pending' && (
                      <>
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleAccept(delivery.id)}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleReject(delivery.id)}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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