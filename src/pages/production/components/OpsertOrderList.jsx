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
import { opsertOrders } from '../../../data/opsertData';

export default function OpsertOrderList({ status }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  const handleStartPrinting = (orderId) => {
    toast.success('Printing process started');
  };

  const handleUpdateStatus = (orderId) => {
    toast.success('Order status updated successfully');
  };

  const handleMoveToDelivery = (orderId) => {
    toast.success('Order moved to Delivery section');
  };

  const filteredOrders = opsertOrders.filter((order) => order.status === status);

  // Mobile card view
  const MobileOrderCard = ({ order }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Order ID
        </Typography>
        <Typography variant="body1">{order.order_id}</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Job Name
        </Typography>
        <Typography variant="body1">{order.job_name}</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Details
        </Typography>
        <Typography variant="body2">
          Type: {order.bag_type}
          <br />
          Color: {order.bag_color}
          <br />
          Print Type: {order.print_type}
          <br />
          Print Color: {order.print_color}
          <br />
          Size: {order.bag_size}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Status
        </Typography>
        <Chip
          label={order.status.replace('_', ' ').toUpperCase()}
          color={getStatusColor(order.status)}
          size="small"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        {order.status === 'pending' && (
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
        )}
        {order.status === 'in_progress' && (
          <Button
            startIcon={<Update />}
            variant="contained"
            color="success"
            fullWidth
            onClick={() => handleUpdateStatus(order.id)}
            sx={{ mb: 1 }}
          >
            Complete Order
          </Button>
        )}
        {order.status === 'completed' && (
          <Button
            startIcon={<LocalShipping />}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleMoveToDelivery(order.id)}
            sx={{ mb: 1 }}
          >
            Move to Delivery
          </Button>
        )}
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
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Bag Type</TableCell>
                <TableCell>Bag Colour</TableCell>
                <TableCell>Print Type</TableCell>
                <TableCell>Print Colour</TableCell>
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
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.job_name}</TableCell>
                  <TableCell>{order.bag_type}</TableCell>
                  <TableCell>{order.bag_color}</TableCell>
                  <TableCell>{order.print_type}</TableCell>
                  <TableCell>{order.print_color}</TableCell>
                  <TableCell>{order.bag_size}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.remarks || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.status === 'pending' && (
                      <Button
                        startIcon={<Print />}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleStartPrinting(order.id)}
                      >
                        Start Printing
                      </Button>
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
                        onClick={() => handleMoveToDelivery(order.id)}
                      >
                        Move to Delivery
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
