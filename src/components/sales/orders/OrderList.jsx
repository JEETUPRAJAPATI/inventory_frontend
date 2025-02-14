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
import { getStatusColor } from '../../../utils/statusColors';
import toast from 'react-hot-toast';
import orderService from '/src/services/orderService.js';

export default function OrderList({ orders, refreshOrders, loading }) {
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

  // Handle form submission (for add/edit)
  const handleFormSubmit = async (formData) => {
    try {
      const message = selectedOrder ? 'Order updated successfully' : 'Order created successfully';
      toast.success(message);
      setFormOpen(false);
      // Refresh orders after submission
      await refreshOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Confirm deletion
  const handleDeleteConfirm = async () => {
    try {
      await orderService.deleteOrder(orderToDelete._id);
      toast.success('Order deleted successfully');
      setDeleteDialogOpen(false);
      // Refresh orders after deletion
      await refreshOrders();
    } catch (error) {
      toast.error(error.message || 'Failed to delete order');
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Orders</Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>
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
                <TableCell>Order Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.jobName}</TableCell>
                    <TableCell>{order.bagDetails.type}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderPrice}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary" onClick={() => handleEdit(order)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(order)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
    </>
  );
}
