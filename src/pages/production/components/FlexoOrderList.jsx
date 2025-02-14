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
import OrderService from '../../../services/wcutBagFlexoService';
import QRCodeScanner from '../../../components/QRCodeScanner';

export default function FlexoOrderList({ status = 'pending', bagType }) {
  const [orders, setOrders] = useState([]);
  const [noOrdersFound, setNoOrdersFound] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showScanner, setShowScanner] = useState(false); // Ensure this state controls the scanner visibility
  const [isOpen, setOpen] = useState(false);
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
    const status = 'completed';
    const remarks = 'Updated status after inspection';

    OrderService.updateOrderStatus(orderId, status, remarks)
      .then(() => {
        toast.success('Order completed successfully');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to complete order');
      });
  };

  const handleMoveToBagMaking = (orderId) => {
    OrderService.moveToBagMaking(orderId)
      .then(() => {
        toast.success('Order moved to delivery');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to move to delivery');
      });
  };

  const handleBillingClick = (order) => {
    OrderService.directBilling(order.orderId, 'W-cut')
      .then(() => {
        toast.success('Order moved to billing successfully');
        fetchOrders();
      })
      .catch((error) => {
        toast.error('Failed to move to billing');
      });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  const renderActions = (order) => {
    if (bagType === 'wcut') {
      if (order.flexoDetails?.[0]?.status === 'pending') {
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
      if (order.flexoDetails?.[0]?.status === 'in_progress') {
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
      if (order.flexoDetails?.[0]?.status === 'completed') {
        return (
          <Button
            startIcon={<LocalShipping />}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleMoveToBagMaking(order.orderId)}
          >
            Move to Bag Making
          </Button>
        );
      }
    } else {
      if (order.flexoDetails[0].status === 'pending') {
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
      if (order.flexoDetails[0].status === 'in_progress') {
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
      if (order.flexoDetails[0].status === 'completed') {
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
              onClick={() => handleMoveToBagMaking(order.orderId)}
            >
              Move to Bag Making
            </Button>
          </Box>
        );
      }
    }
    return null;
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

                    {order.flexoDetails?.[0]?.status === 'pending' ? (
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
                        label={order.flexoDetails?.[0]?.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(order.flexoDetails?.[0]?.status)}
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
