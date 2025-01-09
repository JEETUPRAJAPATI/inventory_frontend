import { useState } from 'react';
import {
  Grid,
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
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import PurchaseOrderForm from '../../components/inventory/forms/PurchaseOrderForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';

const mockOrders = [
  {
    id: 1,
    orderNumber: 'PO-2024-001',
    supplier: 'ABC Fabrics',
    materialType: 'fabric',
    quantity: 1000,
    unitPrice: 45.50,
    totalAmount: 45500,
    deliveryDate: '2024-03-15',
    status: 'pending',
    notes: 'Urgent order for upcoming production',
  },
  {
    id: 2,
    orderNumber: 'PO-2024-002',
    supplier: 'XYZ Materials',
    materialType: 'handle',
    quantity: 500,
    unitPrice: 25.75,
    totalAmount: 12875,
    deliveryDate: '2024-03-20',
    status: 'approved',
    notes: 'Regular monthly order',
  },
];

export default function PurchaseOrders() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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

  const handleFormSubmit = (formData) => {
    toast.success(selectedOrder ? 'Order updated successfully' : 'Order created successfully');
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.success('Order deleted successfully');
    setDeleteDialogOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'info',
      ordered: 'primary',
      received: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Purchase Orders</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Create Order
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Material Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.materialType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <PurchaseOrderForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        order={selectedOrder}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Purchase Order"
        content="Are you sure you want to delete this purchase order? This action cannot be undone."
      />
    </>
  );
}