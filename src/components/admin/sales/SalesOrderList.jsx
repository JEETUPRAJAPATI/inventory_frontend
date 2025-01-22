import React, { useEffect, useState } from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, Chip, Box } from '@mui/material';
import { Edit, Delete, QrCode } from '@mui/icons-material';
import FilterBar from '../../common/FilterBar';
import toast from 'react-hot-toast';
import adminService from '../../../services/adminService';

export default function SalesOrderList({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all'
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const response = await adminService.getSales(filters);
        console.log(response);
        setData(response.data); // Update this based on the response structure
      } catch (error) {
        toast.error('Failed to load sales orders');
      }
    };

    fetchSalesOrders();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const filteredOrders = salesOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesType = filters.type === 'all' || order.bagType === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Sales Orders</Typography>
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={{
            status: ['pending', 'in_progress', 'completed']
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Bag Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.jobName}</TableCell>
                <TableCell>{order.bagDetails.type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={order.status === 'Completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(order._id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <QrCode />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
