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

      jobName: 'Packaging Bags',
      gsm: 120,
      quantity: 1000,
      weight: 500,
      qnt: 100,
      printColour: 'Blue',
      fabricColour: 'White',
      fabricQuality: 'High',
      status: 'Pending',
    },
    {
      id: 2,
      orderId: 'ORD-002',
      jobName: 'Storage Bags',
      gsm: 150,
      quantity: 2000,
      weight: 800,
      qnt: 150,
      printColour: 'Red',
      fabricColour: 'Black',
      fabricQuality: 'Premium',
      status: 'In Progress',
    },
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
              <TableCell>Job Name</TableCell>
              <TableCell>Bag Size</TableCell>
              <TableCell>GSM</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Print Colour</TableCell>
              <TableCell>Fabric Colour</TableCell>
              <TableCell>Fabric Quality</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.orderId}</TableCell>
                <TableCell>{record.jobName || 'N/A'}</TableCell>
                <TableCell>{record.bagSize || 'N/A'}</TableCell>
                <TableCell>{record.gsm || 'N/A'}</TableCell>
                <TableCell>{record.quantity}</TableCell>
                <TableCell>{record.printColour || 'N/A'}</TableCell>
                <TableCell>{record.fabricColour || 'N/A'}</TableCell>
                <TableCell>{record.fabricQuality || 'N/A'}</TableCell>
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