import { useState, useEffect } from 'react';
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
import { Add, Edit, Delete } from '@mui/icons-material';
import PurchaseOrderForm from '../../components/inventory/forms/PurchaseOrderForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';
import purchaseOrderService from '../../services/purchaseOrderService'; // Assumed service file for API calls

export default function PurchaseOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await purchaseOrderService.getOrders();
        console.log('response', response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load purchase orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setFormOpen(true);
  };

  const handleEditOrder = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setFormOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    console.log('form data', formData);

    if (selectedOrder) {
      console.log('od', selectedOrder.id);
      await purchaseOrderService.updateOrder(selectedOrder._id, formData);
      toast.success('Purchase order updated successfully');
    } else {
      console.log('addintion formdata')
      await purchaseOrderService.addProduct(formData);
      toast.success('Purchase order created successfully');
    }
    setFormOpen(false);
    refreshOrders();

  };



  const handleDeleteConfirm = async () => {
    try {
      await purchaseOrderService.deleteOrder(orderToDelete._id);
      toast.success('Purchase order deleted successfully');
      setDeleteDialogOpen(false);
      refreshOrders();
    } catch (error) {
      toast.error('Failed to delete purchase order');
    }
  };

  const refreshOrders = async () => {
    setLoading(true);
    try {
      const response = await purchaseOrderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error refreshing orders:', error);
      toast.error('Failed to refresh purchase orders');
    } finally {
      setLoading(false);
    }
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
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddOrder}>
            Add Purchase Order
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.materialType}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(order.deliveryDate))}
                  </TableCell>
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
                      onClick={() => handleEditOrder(order)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteOrder(order)}
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
