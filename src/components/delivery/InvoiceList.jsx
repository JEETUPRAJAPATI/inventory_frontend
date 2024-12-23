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
import { Add, PictureAsPdf, Delete } from '@mui/icons-material';
import InvoiceForm from './InvoiceForm';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-00001',
    customerName: 'John Doe',
    jobName: 'Haldiram',
    date: '2024-02-23',
    total: 5900,
  },
  {
    id: 2,
    invoiceNumber: 'INV-00002',
    customerName: 'Jane Smith',
    jobName: 'Premium Bags',
    date: '2024-02-24',
    total: 7500,
  },
];

export default function InvoiceList() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleGenerateInvoice = (formData) => {
    try {
      generateInvoicePDF(formData);
      toast.success('Invoice generated successfully');
      setFormOpen(false);
    } catch (error) {
      toast.error('Failed to generate invoice');
      console.error(error);
    }
  };

  const handleDelete = (invoice) => {
    setSelectedInvoice(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    toast.success('Invoice deleted successfully');
    setDeleteDialogOpen(false);
  };

  const handleDownloadPDF = (invoice) => {
    try {
      generateInvoicePDF(invoice);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Invoices</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Generate Invoice
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{invoice.jobName}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>₹{invoice.total}</TableCell>
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
                      color="error"
                      onClick={() => handleDelete(invoice)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <InvoiceForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleGenerateInvoice}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Invoice"
        content="Are you sure you want to delete this invoice? This action cannot be undone."
      />
    </>
  );
}