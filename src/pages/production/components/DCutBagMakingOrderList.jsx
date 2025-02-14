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
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import { QrCodeScanner, Update, LocalShipping, Receipt } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import OrderService from '../../../services/dcutBagMakingService';
import QRCodeScanner from '../../../components/QRCodeScanner'; // Assuming this is your QRCodeScanner component

export default function BagMakingOrderList({ status = 'pending', bagType }) {
  const [orders, setOrders] = useState([]);
  const [noOrdersFound, setNoOrdersFound] = useState(false);
  const [showScanner, setShowScanner] = useState(false);  // State to control QR Code scanner dialog
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const fetchOrders = () => {
    OrderService.listOrders(status)
      .then((data) => {
        if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
          setOrders(data.data);
          setNoOrdersFound(false);
        } else {
          setOrders([]);
          setNoOrdersFound(true);
        }
      })
      .catch((error) => {
        toast.error('Failed to fetch orders');
        setOrders([]);
        setNoOrdersFound(true);
      });
  };

  const handleVerify = async (orderId) => {
    try {
      const response = await OrderService.listOrders("in_progress");

      if (response.success && response.data.length > 0) {
        toast.error('A job is already active. Please complete or deactivate it before starting a new one.');
        return;
      }
      // No active job, proceed with verification
      setSelectedOrderId(orderId);
      setShowScanner(true);
    } catch (error) {
      toast.error('Error checking active jobs. Please try again.');
    }
  };


  const handleScanSuccess = async (scannedData) => {
    console.log('scannedData', scannedData);
    try {
      if (!selectedOrderId) {
        toast.error('No order selected for verification');
        return;
      }
      await OrderService.verifyOrder(selectedOrderId, scannedData);
      toast.success('Order verified successfully');
      fetchOrders(); // Refresh orders
      setShowScanner(false); // Close scanner dialog
      setSelectedOrderId(null); // Reset selected order ID
    } catch (error) {
      toast.error('Failed to verify order');
    }
  };
  const handleComplete = (orderId) => {
    const status = 'completed'; // Order status to be updated
    const remarks = 'Updated status after inspection'; // Remarks for the order status update

    // API call to mark the order as completed
    OrderService.updateOrderStatus(orderId, status, remarks)
      .then(() => {
        toast.success('Order completed successfully');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to complete order');
      });
  };

  const handleMoveToOpsert = (orderId) => {
    // API call to move order to delivery
    OrderService.handleMoveToOpsert(orderId, bagType)
      .then(() => {
        toast.success('Order moved to Opsert');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to move to Opsert');
      });
  };

  const handleBillingClick = (order) => {
    // API call to directly bill the order
    console.log('vv', bagType)
    OrderService.directBilling(order.orderId, bagType)
      .then(() => {
        toast.success('Order moved to billing successfully');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to move to billing');
      });
  };

  const renderActions = (order) => {
    if (bagType === 'wcut') {
      if (order.status === 'pending') {
        return (
          <Button
            startIcon={<QrCodeScanner />}
            variant="outlined"
            size="small"
            onClick={() => handleVerify(order._id)}
          >
            Verify
          </Button>
        );
      }
      if (order.status === 'in_progress') {
        return (
          <Button
            startIcon={<Update />}
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleComplete(order._id)}
          >
            Complete
          </Button>
        );
      }
      if (order.status === 'completed') {
        return (
          <Button
            startIcon={<LocalShipping />}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleMoveToDelivery(order._id)}
          >
            Move to Delivery
          </Button>
        );
      }
    } else {
      if (order.dcutbagmakingDetails[0].status === 'pending') {
        return (
          <Button
            startIcon={<QrCodeScanner />}
            variant="outlined"
            size="small"
            onClick={() => handleVerify(order.orderId)}
          >
            Verify
          </Button>
        );
      }
      if (order.dcutbagmakingDetails[0].status === 'in_progress') {
        return (
          <Button
            startIcon={<Update />}
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleComplete(order.orderId)}
          >
            Complete
          </Button>
        );
      }
      if (order.dcutbagmakingDetails[0].status === 'completed') {
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
              onClick={() => handleMoveToOpsert(order.orderId)}
            >
              Move to Opsert
            </Button>
          </Box>
        );
      }
    }

    return null; // If no status matched, no button will be shown
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

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
              {noOrdersFound ? (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography>No records found for this status</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.jobName}</TableCell>
                    <TableCell>{order.bagDetails?.type}</TableCell>
                    <TableCell>{order.bagDetails?.color || '-'}</TableCell>

                    {order.dcutbagmakingDetails?.[0]?.status === 'pending' ? (
                      <>
                        <TableCell style={{ filter: 'blur(5px)' }}>{order.bagDetails?.gsm}</TableCell>
                        <TableCell style={{ filter: 'blur(5px)' }}>{order.bagDetails?.printColor}</TableCell>
                        <TableCell style={{ filter: 'blur(5px)' }}>{order.bagDetails?.size}</TableCell>
                        <TableCell style={{ filter: 'blur(5px)' }}>{order.quantity}</TableCell>
                        <TableCell style={{ filter: 'blur(5px)' }}>{order.remarks || '-'}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{order.bagDetails?.gsm}</TableCell>
                        <TableCell>{order.bagDetails?.printColor}</TableCell>
                        <TableCell>{order.bagDetails?.size}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.remarks || '-'}</TableCell>
                      </>
                    )}

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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* QR Code Scanner Dialog */}
      <Dialog open={showScanner} onClose={() => setShowScanner(false)} maxWidth="md" fullWidth>
        <DialogTitle>QR Code Verification</DialogTitle>
        <DialogContent>
          <QRCodeScanner onScanSuccess={handleScanSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowScanner(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
