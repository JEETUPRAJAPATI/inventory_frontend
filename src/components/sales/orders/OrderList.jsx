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
import { Add, Edit, Delete, QrCode } from '@mui/icons-material';
import OrderForm from './OrderForm';
import QRCodeDialog from './QRCodeDialog';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import { useOrders } from '../../../hooks/useOrders';
import { getStatusColor } from '../../../utils/statusColors';
import toast from 'react-hot-toast';

// Mock data for demonstration
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    jobName: 'Premium Shopping Bags',
    bagType: 'W-Cut',
    quantity: 1000,
    status: 'pending',
    createdAt: '2024-02-20'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    jobName: 'Eco Friendly Bags',
    bagType: 'D-Cut',
    quantity: 2000,
    status: 'completed',
    createdAt: '2024-02-19'
  }
];

export default function OrderList() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrOrder, setSelectedQrOrder] = useState(null);

  const handleAdd = () => {
    setSelectedOrder(null);
    setFormOpen(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setFormOpen(true);
  };

  const handleDelete = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleShowQR = (order) => {
    setSelectedQrOrder(order);
    setQrDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const message = selectedOrder ? 'Order updated successfully' : 'Order created successfully';
      toast.success(message);
      setFormOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      toast.success('Order deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Orders</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add Order
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.jobName}</TableCell>
                  <TableCell>{order.bagType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(order)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(order)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleShowQR(order)}
                    >
                      <QrCode />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <OrderForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        order={selectedOrder}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Order"
        content="Are you sure you want to delete this order? This action cannot be undone."
      />

      <QRCodeDialog
        open={qrDialogOpen}
        onClose={() => setQrDialogOpen(false)}
        orderData={selectedQrOrder}
      />
    </>
  );
}