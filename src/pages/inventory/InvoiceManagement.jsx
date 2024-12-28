import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { PictureAsPdf, Print } from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const mockInvoices = [
  {
    id: 'INV-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    amount: 15000,
    date: '2024-02-20',
    status: 'pending',
    gstNumber: 'GST123456789'
  },
  {
    id: 'INV-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    amount: 25000,
    date: '2024-02-19',
    status: 'paid',
    gstNumber: 'GST987654321'
  }
];

export default function InvoiceManagement() {
  const handleDownloadPDF = (invoice) => {
    try {
      generateInvoicePDF({
        ...invoice,
        invoiceNumber: invoice.id,
        subtotal: invoice.amount,
        gst: invoice.amount * 0.18,
        total: invoice.amount * 1.18
      });
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Invoice Management</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>₹{invoice.amount}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status.toUpperCase()}
                      color={invoice.status === 'paid' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleDownloadPDF(invoice)}
                    >
                      <PictureAsPdf />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => toast.success('Invoice printed successfully')}
                    >
                      <Print />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}