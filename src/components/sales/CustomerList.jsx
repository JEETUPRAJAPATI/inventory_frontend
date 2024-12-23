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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', orders: 5 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', orders: 3 },
];

export default function CustomerList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Customers</Typography>
        <Button variant="contained" color="primary">Add Customer</Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDelete(customer)}
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
        title="Delete Customer"
        content="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </Card>
  );
}