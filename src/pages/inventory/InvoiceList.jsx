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
  Chip,
} from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const mockInvoices = [
  {
    id: 'INV-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    jobName: 'Premium Shopping Bags',
    date: '2024-02-20',
    dueDate: '2024-03-20',
    quantity: 1000,
    unitPrice: 15,
    amount: 15000,
    status: 'pending',
    gstNumber: 'GST123456789'
  },
  {
    id: 'INV-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    address: '456 Oak Ave, Town, State 67890',
    jobName: 'Eco Friendly Bags',
    date: '2024-02-19',
    dueDate: '2024-03-19',
    quantity: 2000,
    unitPrice: 12.5,
    amount: 25000,
    status: 'paid',
    gstNumber: 'GST987654321'
  }
];

export default function InvoiceList() {
  const handleDownloadPDF = (invoice) => {
    try {
      const invoiceData = {
        invoiceNumber: invoice.id,
        customerName: invoice.customerName,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        jobName: invoice.jobName,
        date: invoice.date,
        dueDate: invoice.dueDate,
        quantity: invoice.quantity,
        unitPrice: invoice.unitPrice,
        subtotal: invoice.amount,
        gst: invoice.amount * 0.18,
        total: invoice.amount * 1.18,
        gstNumber: invoice.gstNumber
      };

      generateInvoicePDF(invoiceData);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Failed to download invoice');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Invoices</Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Job Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
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
                <TableCell>{invoice.jobName}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}