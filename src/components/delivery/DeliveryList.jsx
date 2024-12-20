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
  Button,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const mockDeliveries = [
  { 
    id: 1, 
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    status: 'In Transit',
    deliveryDate: '2024-02-10',
  },
  { 
    id: 2, 
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    status: 'Delivered',
    deliveryDate: '2024-02-09',
  },
];

export default function DeliveryList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleDelete = (delivery) => {
    setSelectedDelivery(delivery);
    setDeleteDialogOpen(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'primary',
      'Pending': 'warning',
      'Delivered': 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Deliveries</Typography>
        <Button variant="contained" color="primary">Add Delivery</Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDeliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.orderNumber}</TableCell>
                <TableCell>{delivery.customer}</TableCell>
                <TableCell>
                  <Chip 
                    label={delivery.status} 
                    color={getStatusColor(delivery.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{delivery.deliveryDate}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(delivery)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => setDeleteDialogOpen(false)}
        title="Delete Delivery"
        content="Are you sure you want to delete this delivery? This action cannot be undone."
      />
    </Card>
  );
}