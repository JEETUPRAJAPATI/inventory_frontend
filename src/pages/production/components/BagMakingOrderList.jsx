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
  Divider,
} from '@mui/material';
import { Update, CheckCircle, LocalShipping, QrCodeScanner } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { bagMakingOrders } from '../../../data/bagMakingData';
import VerifyOrderDialog from './VerifyOrderDialog';
import { useState } from 'react';

export default function BagMakingOrderList({ status, bagType }) {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const handleUpdateStatus = (orderId) => {
    toast.success('Order moved to Bag Making Process');
  };

  const handleCompleteOrder = (orderId) => {
    toast.success('This bag making process has completed');
  };

  const handleMoveToDelivery = (orderId) => {
    toast.success('Order moved to Packaging & Delivery section');
  };

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

  const filteredOrders = bagMakingOrders.filter(order => order.status === status);

  // Mobile card view
  const MobileOrderCard = ({ order }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      {/* ... existing mobile card content ... */}
      <Box sx={{ mt: 2 }}>
        {order.status === 'pending' && (
          <>
            <Button
              startIcon={<Update />}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleUpdateStatus(order.id)}
              sx={{ mb: 1 }}
            >
              Move to Bag Making Process
            </Button>
            {bagType === 'dcut' && (
              <Button
                startIcon={<QrCodeScanner />}
                variant="outlined"
                fullWidth
                onClick={() => handleVerify(order)}
                sx={{ mb: 1 }}
              >
                Verify Order
              </Button>
            )}
          </>
        )}
        {/* ... existing buttons for other statuses ... */}
      </Box>
    </Card>
  );

  return (
    <Box>
      {/* Mobile View */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {filteredOrders.map((order) => (
          <MobileOrderCard key={order.id} order={order} />
        ))}
      </Box>

      {/* Desktop View */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role Size</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Type</TableCell>
                <TableCell>Bag Color</TableCell>
                <TableCell>Bag Size</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>QNT</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.role_size}</TableCell>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.job_name}</TableCell>
                  <TableCell>{order.bag_type}</TableCell>
                  <TableCell>{order.bag_color}</TableCell>
                  <TableCell>{order.bag_size}</TableCell>
                  <TableCell>{order.gsm}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.weight}</TableCell>
                  <TableCell>{order.qnt}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          startIcon={<Update />}
                          variant="contained"
                          size="small"
                          onClick={() => handleUpdateStatus(order.id)}
                        >
                          Move to Bag Making Process
                        </Button>
                        {bagType === 'dcut' && (
                          <Button
                            startIcon={<QrCodeScanner />}
                            variant="outlined"
                            size="small"
                            onClick={() => handleVerify(order)}
                          >
                            Verify
                          </Button>
                        )}
                      </Box>
                    )}
                    {order.status === 'in_progress' && (
                      <Button
                        startIcon={<CheckCircle />}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleCompleteOrder(order.id)}
                      >
                        Work Completed
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Button
                        startIcon={<LocalShipping />}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleMoveToDelivery(order.id)}
                      >
                        Move to Delivery Section
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <VerifyOrderDialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        order={selectedOrder}
      />
    </Box>
  );
}