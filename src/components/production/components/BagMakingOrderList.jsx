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
import { Print, Update, LocalShipping } from '@mui/icons-material';
import FilterBar from '../../common/FilterBar';
import { useState } from 'react';
import toast from 'react-hot-toast';
import adminService from '../../../services/adminService';

export default function BagMakingOrderList({ bagType, orders, onFilterChange, filters }) {
  const handleStartProcess = async (orderId) => {
    try {
      await adminService.startBagMakingProcess(orderId);
      toast.success('Process started successfully');
    } catch (error) {
      toast.error('Failed to start process');
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await adminService.updateBagMakingStatus(orderId, 'completed');
      toast.success('Order completed successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleMoveToDelivery = async (orderId) => {
    try {
      await adminService.moveBagMakingToDelivery(orderId);
      toast.success('Order moved to Delivery');
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
            operator_name: true,
            quantity: true
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Size</TableCell>
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
                <TableCell>{order.operator}</TableCell>
                <TableCell>{bagType}</TableCell>
                <TableCell>{order.size}</TableCell>
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
                    <Button
                      startIcon={<Print />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleStartProcess(order._id)}
                    >
                      Start Process
                    </Button>
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
                      onClick={() => handleMoveToDelivery(order._id)}
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
    </Card>
  );
}