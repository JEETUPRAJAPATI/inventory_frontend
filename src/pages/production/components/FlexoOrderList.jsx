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
} from '@mui/material';
import { QrCodeScanner, Update, LocalShipping, Print } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function FlexoOrderList({ orders, onVerify }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const handleUpdateStatus = (orderId) => {
    toast.success('Order status updated to completed');
  };

  const handleStartPrinting = (orderId) => {
    toast.success('Printing process started');
  };

  const handleMoveToBagMaking = (orderId) => {
    toast.success('Order moved to Bag Making Process');
  };

  // Mobile card view
  const MobileOrderCard = ({ order }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      {/* ... existing mobile card content ... */}
      <Box sx={{ mt: 2 }}>
        {order.status === 'pending' && (
          <>
            <Button
              startIcon={<Print />}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleStartPrinting(order.id)}
              sx={{ mb: 1 }}
            >
              Start Printing
            </Button>
            <Button
              startIcon={<QrCodeScanner />}
              variant="outlined"
              fullWidth
              onClick={() => onVerify(order)}
              sx={{ mb: 1 }}
            >
              Verify Order
            </Button>
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
        {orders.map((order) => (
          <MobileOrderCard key={order.id} order={order} />
        ))}
      </Box>

      {/* Desktop View */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Print Color</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.jobName}</TableCell>
                  <TableCell>{order.printColor}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
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
                          startIcon={<Print />}
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleStartPrinting(order.id)}
                        >
                          Start Printing
                        </Button>
                        <Button
                          startIcon={<QrCodeScanner />}
                          variant="outlined"
                          size="small"
                          onClick={() => onVerify(order)}
                        >
                          Verify
                        </Button>
                      </Box>
                    )}
                    {order.status === 'in_progress' && (
                      <Button
                        startIcon={<Update />}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleUpdateStatus(order.id)}
                      >
                        Complete
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Button
                        startIcon={<LocalShipping />}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleMoveToBagMaking(order.id)}
                      >
                        Move to Bag Making
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}