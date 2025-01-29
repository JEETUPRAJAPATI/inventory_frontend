import { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import invoiceService from '../../services/invoiceService'; // Assuming you have an API service for invoices

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch invoices on component mount
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await invoiceService.getInvoices(); // Assuming `invoiceService.getInvoices()` fetches the invoices
        console.log(response.data);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        toast.error('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  // Handle downloading PDF for an invoice
  const handleDownloadPDF = (invoice) => {
    try {
      generateInvoicePDF({
        ...invoice,
        invoiceNumber: invoice.id,
        subtotal: invoice.amount,
        gst: invoice.amount * 0.18,
        total: invoice.amount * 1.18,
      });
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  // Handle adding new invoice
  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setFormOpen(true);
  };

  // Handle editing an existing invoice
  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setFormOpen(true);
  };

  // Handle deleting an invoice
  const handleDeleteInvoice = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  // Handle form submission for adding/editing invoice
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedInvoice) {
        await invoiceService.updateInvoice(selectedInvoice._id, formData);
        toast.success('Invoice updated successfully');
      } else {
        await invoiceService.createInvoice(formData);
        toast.success('Invoice created successfully');
      }
      setFormOpen(false);
      refreshInvoices();
    } catch (error) {
      toast.error('Failed to save invoice');
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await invoiceService.deleteInvoice(invoiceToDelete._id);
      toast.success('Invoice deleted successfully');
      setDeleteDialogOpen(false);
      refreshInvoices();
    } catch (error) {
      toast.error('Failed to delete invoice');
    }
  };

  // Refresh the invoices after any CRUD operation
  const refreshInvoices = async () => {
    setLoading(true);
    try {
      const response = await invoiceService.getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error refreshing invoices:', error);
      toast.error('Failed to refresh invoices');
    } finally {
      setLoading(false);
    }
  };
  const getStatusColor = (status) => {
    const colors = {
      Paid: 'success',       // Green for Paid
      Pending: 'warning',    // Yellow for Pending
      Cancelled: 'error',    // Red for Cancelled
    };
    return colors[status.toLowerCase()] || 'default'; // Default color if status doesn't match
  };

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Invoice Management
        </Typography>
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.order_id}</TableCell>
                  <TableCell>{invoice.invoice_id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>₹{invoice.amount}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(invoice.date))}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status.toUpperCase()}
                      color={getStatusColor(invoice.status)}
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
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleEditInvoice(invoice)}
                    >
                      {/* Edit icon */}
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteInvoice(invoice)}
                    >
                      {/* Delete icon */}
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
};

export default InvoiceManagement;
