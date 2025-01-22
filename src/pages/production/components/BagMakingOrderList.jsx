import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Card,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { QrCodeScanner, Update, LocalShipping, Print, Receipt } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useState } from 'react';
import VerifyOrderDialog from './VerifyOrderDialog';

export default function BagMakingOrderList({ status = 'pending', bagType }) {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [confirmBillingOpen, setConfirmBillingOpen] = useState(false);
  const [orderToBill, setOrderToBill] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const handleVerify = (order) => {
    if (orders.some(o => o.status === 'in_progress') && order.status === 'pending') {
      toast.error('A job is already active. Please complete or deactivate it before starting a new one.');
      return;
    }
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

  const handleVerifyComplete = (orderId, verifiedData) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, ...verifiedData, status: 'in_progress' } : order
      )
    );
    setVerifyDialogOpen(false);
    setSelectedOrder(null);
    toast.success('Order verified and marked as active');
  };

  const handleStartPrinting = (orderId) => {
    if (orders.some(o => o.status === 'in_progress')) {
      toast.error('A job is already active. Please complete it first.');
      return;
    }
    toast.success('Process started successfully');
  };

  const handleUpdateStatus = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'completed', billingStatus: 'pending' } : order
      )
    );
    toast.success('Order completed successfully');
  };

  const handleBillingClick = (order) => {
    setOrderToBill(order);
    setConfirmBillingOpen(true);
  };

  const handleConfirmBilling = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderToBill.id ? { ...order, billingStatus: 'completed' } : order
      )
    );
    setConfirmBillingOpen(false);
    setOrderToBill(null);
    toast.success('Order moved to billing successfully');
  };

  const handleMoveToDelivery = (orderId) => {
    toast.success('Order moved to Delivery Process');
  };

  const renderActions = (order) => {
    if (bagType === 'wcut') {
      // W-Cut actions (same as Opsert)
      switch (order.status) {
        case 'pending':
          return (
            <Button
              startIcon={<Print />}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleStartPrinting(order.id)}
            >
              Start Process
            </Button>
          );
        case 'in_progress':
          return (
            <Button
              startIcon={<Update />}
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleUpdateStatus(order.id)}
            >
              Complete
            </Button>
          );
        case 'completed':
          return (
            <Button
              startIcon={<LocalShipping />}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleMoveToDelivery(order.id)}
            >
              Move to Delivery
            </Button>
          );
        default:
          return null;
      }
    } else {
      // D-Cut actions (same as Flexo)
      switch (order.status) {
        case 'pending':
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<Print />}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleStartPrinting(order.id)}
              >
                Start Process
              </Button>
              <Button
                startIcon={<QrCodeScanner />}
                variant="outlined"
                size="small"
                onClick={() => handleVerify(order)}
              >
                Verify
              </Button>
            </Box>
          );
        case 'in_progress':
          return (
            <Button
              startIcon={<Update />}
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleUpdateStatus(order.id)}
            >
              Complete
            </Button>
          );
        case 'completed':
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<Receipt />}
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleBillingClick(order)}
              >
                Direct Billing
              </Button>
              <Button
                startIcon={<LocalShipping />}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleMoveToDelivery(order.id)}
              >
                Move to Delivery
              </Button>
            </Box>
          );
        default:
          return null;
      }
    }
  };

  const filteredOrders = orders.filter(order => order.status === status);

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Type</TableCell>
                <TableCell>Fabric Type</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Fabric Color</TableCell>
                <TableCell>Bag Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.jobName}</TableCell>
                  <TableCell>{order.bagType}</TableCell>
                  <TableCell>{order.fabricType || '-'}</TableCell>
                  <TableCell>{order.gsm}</TableCell>
                  <TableCell>{order.fabricColor}</TableCell>
                  <TableCell>{order.bagSize}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.remarks || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {renderActions(order)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {bagType === 'dcut' && (
        <>
          <VerifyOrderDialog
            open={verifyDialogOpen}
            onClose={() => setVerifyDialogOpen(false)}
            order={selectedOrder}
            onVerifyComplete={handleVerifyComplete}
          />

          <Dialog
            open={confirmBillingOpen}
            onClose={() => setConfirmBillingOpen(false)}
          >
            <DialogTitle>Confirm Direct Billing</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to move this order to billing?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Order ID: {orderToBill?.orderId}<br />
                Job Name: {orderToBill?.jobName}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmBillingOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmBilling}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

// Mock data for testing
const mockOrders = [
  {
    id: 'BAG-001',
    orderId: 'ORD-001',
    jobName: 'Premium Shopping Bags',
    bagType: 'W-Cut',
    fabricType: 'Polyester',
    gsm: '90',
    fabricColor: 'Blue',
    bagSize: '12x15x4',
    quantity: 1000,
    remarks: '',
    status: 'pending'
  },
  {
    id: 'BAG-002',
    orderId: 'ORD-002',
    jobName: 'Eco Friendly Bags',
    bagType: 'W-Cut',
    fabricType: 'Recycled Polyester',
    gsm: '80',
    fabricColor: 'Green',
    bagSize: '10x12x3',
    quantity: 2000,
    remarks: 'Urgent delivery required',
    status: 'in_progress'
  },
  {
    id: 'BAG-003',
    orderId: 'ORD-003',
    jobName: 'Luxury Shopping Bags',
    bagType: 'W-Cut',
    fabricType: 'Premium',
    gsm: '100',
    fabricColor: 'Black',
    bagSize: '15x20x5',
    quantity: 3000,
    remarks: 'High priority',
    status: 'completed',
    billingStatus: 'pending'
  }
];