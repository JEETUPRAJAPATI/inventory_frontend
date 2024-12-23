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
import { Edit, Delete, Add, PictureAsPdf } from '@mui/icons-material';
import DeliveryForm from './DeliveryForm';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const mockDeliveries = [
  { 
    id: 1, 
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    mobileNumber: '+1234567890',
    address: '123 Main St, City',
    status: 'In Transit',
    deliveryDate: '2024-02-10',
    notes: 'Handle with care'
  },
  { 
    id: 2, 
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    mobileNumber: '+0987654321',
    address: '456 Oak St, Town',
    status: 'Delivered',
    deliveryDate: '2024-02-09',
    notes: ''
  },
];

export default function DeliveryList() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deliveryToDelete, setDeliveryToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedDelivery(null);
    setFormOpen(true);
  };

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setFormOpen(true);
  };

  const handleDelete = (delivery) => {
    setDeliveryToDelete(delivery);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    toast.success(selectedDelivery ? 'Delivery updated successfully' : 'Delivery added successfully');
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.success('Delivery deleted successfully');
    setDeleteDialogOpen(false);
  };

  const handleGenerateInvoice = (delivery) => {
    try {
      // Convert delivery data to invoice format
      const invoiceData = {
        invoiceNumber: `INV-${delivery.orderNumber}`,
        customerName: delivery.customerName,
        email: delivery.email,
        mobileNumber: delivery.mobileNumber,
        address: delivery.address,
        date: new Date().toISOString().split('T')[0],
        dueDate: delivery.deliveryDate,
        jobName: `Delivery - ${delivery.orderNumber}`,
        quantity: 1,
        unitPrice: 1000, // Example price
        subtotal: 1000,
        gst: 180,
        total: 1180,
        gstNumber: 'GST123456789'
      };

      generateInvoicePDF(invoiceData);
      toast.success('Invoice generated successfully');
    } catch (error) {
      toast.error('Failed to generate invoice');
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Deliveries</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add Delivery
          </Button>
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
                  <TableCell>{delivery.customerName}</TableCell>
                  <TableCell>
                    <Chip 
                      label={delivery.status} 
                      color={delivery.status === 'Delivered' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{delivery.deliveryDate}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(delivery)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(delivery)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleGenerateInvoice(delivery)}
                    >
                      <PictureAsPdf />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <DeliveryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        delivery={selectedDelivery}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Delivery"
        content="Are you sure you want to delete this delivery? This action cannot be undone."
      />
    </>
  );
}