import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import UpdateDetailsDialog from './UpdateDetailsDialog';

export default function ProductionTable({ type }) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data - replace with actual data from API
  const records = [
    {
      id: 1,
      orderId: 'ORD-001',
      selendor_size: '12x15',
      role_size: '10x12',
      quantity: 1000,
      weight: 500,
      qnt: 100,
      status: 'Pending'
    },
    {
      id: 2,
      orderId: 'ORD-002',
      selendor_size: '15x18',
      role_size: '12x15',
      quantity: 2000,
      weight: 800,
      qnt: 150,
      status: 'In Progress'
    }
  ];

  const handleUpdate = (record) => {
    setSelectedRecord(record);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {type} Production Records
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Selendor Size</TableCell>
              <TableCell>Role Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>QNT</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.orderId}</TableCell>
                <TableCell>{record.selendor_size}</TableCell>
                <TableCell>{record.role_size}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>{record.weight}</TableCell>
                <TableCell>{record.qnt}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(record)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        record={selectedRecord}
        type={type}
      />
    </Box>
  );
}