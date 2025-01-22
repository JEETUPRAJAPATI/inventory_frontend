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
import { useState } from 'react';
import QRCodeScanner from '../../../components/QRCodeScanner';

export default function FlexoOrderList({ status = 'pending' }) {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = (orderId) => {
    if (orders.some((o) => o.status === 'in_progress')) {
      toast.error('A job is already active. Please complete or deactivate it before starting a new one.');
      return;
    }
    setSelectedOrderId(orderId);
    setShowScanner(true);
  };

  const handleScanSuccess = (data) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderId
          ? { ...order, ...data, status: 'in_progress' }
          : order
      )
    );
    setShowScanner(false);
    setSelectedOrderId(null);
    toast.success('Order verified and marked as active');
  };

  const statusColors = {
    pending: 'warning',
    in_progress: 'info',
    completed: 'success',
  };

  const getStatusColor = (status) => statusColors[status] || 'default';

  const handleStartPrinting = (orderId) => {
    if (orders.some((o) => o.status === 'in_progress')) {
      toast.error('A job is already active. Please complete or deactivate it before starting a new one.');
      return;
    }
    toast.success('Printing process started');
  };

  const handleUpdateStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'completed', billingStatus: 'pending' } : order
      )
    );
    toast.success('Order completed successfully');
  };

  const handleMoveToBagMaking = (orderId) => {
    toast.success('Order moved to Bag Making Process');
  };

  const filteredOrders = orders.filter((order) => order.status === status);

  return (
    <>
      {showScanner ? (
        <Card sx={{ p: 2 }}>
          <QRCodeScanner 
            onScanSuccess={handleScanSuccess} 
          />
        </Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Job Name</TableCell>
                  <TableCell>Fabric Quality</TableCell>
                  <TableCell>GSM</TableCell>
                  <TableCell>Fabric Colour</TableCell>
                  <TableCell>Bag Type</TableCell>
                  <TableCell>Roll Size</TableCell>
                  <TableCell>Cylinder Size</TableCell>
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
                    <TableCell>{order.fabricQuality || '-'}</TableCell>
                    <TableCell>{order.gsm || '-'}</TableCell>
                    <TableCell>{order.fabricColor || '-'}</TableCell>
                    <TableCell>{order.bagType || '-'}</TableCell>
                    <TableCell>{order.rollSize || '-'}</TableCell>
                    <TableCell>{order.cylinderSize || '-'}</TableCell>
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
                            onClick={() => handleVerify(order.id)}
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
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            startIcon={<LocalShipping />}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleMoveToBagMaking(order.id)}
                          >
                            Move to Bag Making
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
}

const mockOrders = [
  {
    id: 'FLX-001',
    orderId: 'ORD-001',
    jobName: 'Premium Shopping Bags',
    fabricQuality: '',
    gsm: '',
    fabricColor: '',
    bagType: '',
    rollSize: '',
    cylinderSize: '',
    quantity: 1000,
    remarks: '',
    status: 'pending',
  },
  {
    id: 'FLX-002',
    orderId: 'ORD-002',
    jobName: 'Eco Friendly Bags',
    fabricQuality: '',
    gsm: '',
    fabricColor: '',
    bagType: '',
    rollSize: '',
    cylinderSize: '',
    quantity: 2000,
    remarks: '',
    status: 'pending',
  },
  {
    id: 'FLX-003',
    orderId: 'ORD-003',
    jobName: 'Festival Bags',
    fabricQuality: 'Premium',
    gsm: '100',
    fabricColor: 'Red',
    bagType: 'W-Cut',
    rollSize: '15x20',
    cylinderSize: '30x40',
    quantity: 3000,
    remarks: 'Urgent delivery',
    status: 'completed',
    billingStatus: 'pending',
  },
];