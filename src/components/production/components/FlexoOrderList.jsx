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
} from '@mui/material';
import { QrCodeScanner, Update, LocalShipping, Print } from '@mui/icons-material';
import toast from 'react-hot-toast';

const mockOrders = [
  {
    id: 'FLX-001',
    orderId: 'ORD-001',
    jobName: 'Premium Shopping Bags',
    quantity: 1000,
    rollSize: '',
    gsm: '',
    fabricColor: '',
    bagType: '',
    printColor: '',
    cylinderSize: '',
    status: 'pending'
  },
  {
    id: 'FLX-002',
    orderId: 'ORD-002',
    jobName: 'Eco Friendly Bags',
    quantity: 2000,
    rollSize: '12x15',
    gsm: '90',
    fabricColor: 'Blue',
    bagType: 'W-Cut',
    printColor: 'Red',
    cylinderSize: '24x36',
    status: 'in_progress'
  }
];

export default function FlexoOrderList({ status = 'pending', onVerify }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const handleStartPrinting = (orderId) => {
    toast.success('Printing process started');
  };

  const handleUpdateStatus = (orderId) => {
    toast.success('Order status updated to completed');
  };

  const handleMoveToBagMaking = (orderId) => {
    toast.success('Order moved to Bag Making Process');
  };

  // Filter orders based on status with null check
  const filteredOrders = mockOrders?.filter(order => order.status === status) || [];

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Roll Size</TableCell>
              <TableCell>GSM</TableCell>
              <TableCell>Fabric Color</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Print Color</TableCell>
              <TableCell>Cylinder Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.jobName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.rollSize || '-'}</TableCell>
                <TableCell>{order.gsm || '-'}</TableCell>
                <TableCell>{order.fabricColor || '-'}</TableCell>
                <TableCell>{order.bagType || '-'}</TableCell>
                <TableCell>{order.printColor || '-'}</TableCell>
                <TableCell>{order.cylinderSize || '-'}</TableCell>
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
                      {onVerify && (
                        <Button
                          startIcon={<QrCodeScanner />}
                          variant="outlined"
                          size="small"
                          onClick={() => onVerify(order)}
                        >
                          Verify
                        </Button>
                      )}
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
    </Card>
  );
}