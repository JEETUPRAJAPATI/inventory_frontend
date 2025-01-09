import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const mockOrders = [
  { id: 1, customer: 'John Doe', amount: '$1,200', status: 'Pending', date: '2024-02-10' },
  { id: 2, customer: 'Jane Smith', amount: '$850', status: 'Completed', date: '2024-02-09' },
];

export default function OrderList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Orders</Typography>
        <Button variant="contained" color="primary">Add Order</Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={order.status === 'Completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(order)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => setDeleteDialogOpen(false)}
        title="Delete Order"
        content="Are you sure you want to delete this order? This action cannot be undone."
      />
    </Card>
  );
}