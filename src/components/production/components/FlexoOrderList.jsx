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
import FilterBar from '../../common/FilterBar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import adminService from '../../../services/adminService';

export default function FlexoOrderList({ orders, onVerify, onFilterChange, filters }) {
  const handleStartPrinting = async (orderId) => {
    try {
      await adminService.startFlexoPrinting(orderId);
      toast.success('Printing process started');
    } catch (error) {
      toast.error('Failed to start printing');
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await adminService.updateFlexoStatus(orderId, 'completed');
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleMoveToBagMaking = async (orderId) => {
    try {
      await adminService.moveFlexoToBagMaking(orderId);
      toast.success('Order moved to Bag Making Process');
    } catch (error) {
      toast.error('Failed to move order');
    }
  };

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <FilterBar
          filters={filters}
          onFilterChange={onFilterChange}
          filterOptions={{
            status: ['Pending', 'In Progress', 'Completed']
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Fabric Quality</TableCell>
              <TableCell>GSM</TableCell>
              <TableCell>Fabric Color</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Roll Size</TableCell>
              <TableCell>Cylinder Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.jobName}</TableCell>
                <TableCell>{order.fabricQuality}</TableCell>
                <TableCell>{order.gsm}</TableCell>
                <TableCell>{order.fabricColor}</TableCell>
                <TableCell>{order.bagType}</TableCell>
                <TableCell>{order.rollSize}</TableCell>
                <TableCell>{order.cylinderSize}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === 'completed' ? 'success' :
                      order.status === 'in_progress' ? 'warning' : 'default'
                    }
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
                        onClick={() => handleStartPrinting(order._id)}
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
                      onClick={() => handleUpdateStatus(order._id)}
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
                      onClick={() => handleMoveToBagMaking(order._id)}
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