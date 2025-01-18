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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { PictureAsPdf, Print, Visibility } from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

// Mock data with proper structure for PDF generation
const mockInvoices = [
  {
    id: 'INV-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    date: '2024-02-20',
    dueDate: '2024-03-20',
    gstNumber: 'GST123456789',
    jobName: 'Premium Shopping Bags',
    quantity: 1000,
    unitPrice: 15,
    status: 'pending'
  },
  {
    id: 'INV-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    address: '456 Oak Ave, Town, State 67890',
    date: '2024-02-19',
    dueDate: '2024-03-19',
    gstNumber: 'GST987654321',
    jobName: 'Eco Friendly Bags',
    quantity: 2000,
    unitPrice: 12.5,
    status: 'paid'
  }
];

export default function InvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  const calculateTotals = (invoice) => {
    const subtotal = invoice.quantity * invoice.unitPrice;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    return { subtotal, gst, total };
  };

  const handleDownloadPDF = (invoice) => {
    try {
      const { subtotal, gst, total } = calculateTotals(invoice);
      
      const invoiceData = {
        invoiceNumber: invoice.id,
        customerName: invoice.customerName,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        date: invoice.date,
        dueDate: invoice.dueDate,
        gstNumber: invoice.gstNumber,
        items: [{
          name: invoice.jobName,
          quantity: invoice.quantity,
          unitPrice: invoice.unitPrice
        }],
        subtotal,
        gst,
        total
      };

      generateInvoicePDF(invoiceData);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error('Failed to download invoice');
    }
  };

  const handlePrint = (invoice) => {
    setSelectedInvoice(invoice);
    setPrintDialogOpen(true);
  };

  const handlePrintConfirm = () => {
    const printContent = document.getElementById('printable-invoice');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    
    setPrintDialogOpen(false);
    window.location.reload(); // Reload to restore React app state
  };

  const handlePreview = (invoice) => {
    setSelectedInvoice(invoice);
    setPreviewOpen(true);
  };

  const PrintableInvoice = ({ invoice }) => {
    const { subtotal, gst, total } = calculateTotals(invoice);
    
    return (
      <div id="printable-invoice" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: '0' }}>COMPANY NAME</h2>
          <p style={{ margin: '5px 0' }}>123 Business Street, City, State, ZIP</p>
          <p style={{ margin: '5px 0' }}>Phone: (123) 456-7890 | Email: info@company.com</p>
        </div>

        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>INVOICE</h3>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ float: 'left' }}>
            <strong>Bill To:</strong><br />
            {invoice.customerName}<br />
            {invoice.address}<br />
            Phone: {invoice.phone}<br />
            Email: {invoice.email}
          </div>
          <div style={{ float: 'right' }}>
            <strong>Invoice Number:</strong> {invoice.id}<br />
            <strong>Date:</strong> {invoice.date}<br />
            <strong>Due Date:</strong> {invoice.dueDate}<br />
            <strong>GST Number:</strong> {invoice.gstNumber}
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Unit Price</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{invoice.jobName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{invoice.quantity}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>₹{invoice.unitPrice}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>₹{subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <p style={{ margin: '5px 0' }}><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
          <p style={{ margin: '5px 0' }}><strong>GST (18%):</strong> ₹{gst.toFixed(2)}</p>
          <p style={{ margin: '5px 0', fontSize: '1.2em' }}><strong>Total:</strong> ₹{total.toFixed(2)}</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '0.8em' }}>
          <p>Thank you for your business!</p>
          <p>Terms & Conditions Apply</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Invoices</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockInvoices.map((invoice) => {
                  const { total } = calculateTotals(invoice);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.orderId}</TableCell>
                      <TableCell>{invoice.customerName}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>₹{total.toLocaleString()}</TableCell>
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
                          onClick={() => handlePreview(invoice)}
                        >
                          <Visibility />
                        </IconButton>
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
                          onClick={() => handlePrint(invoice)}
                        >
                          <Print />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Invoice Preview</DialogTitle>
        <DialogContent>
          {selectedInvoice && <PrintableInvoice invoice={selectedInvoice} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => handleDownloadPDF(selectedInvoice)}
            startIcon={<PictureAsPdf />}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            onClick={() => handlePrint(selectedInvoice)}
            startIcon={<Print />}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      {/* Print Dialog */}
      <Dialog
        open={printDialogOpen}
        onClose={() => setPrintDialogOpen(false)}
      >
        <DialogTitle>Print Invoice</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to print this invoice?
          </Typography>
          {selectedInvoice && <PrintableInvoice invoice={selectedInvoice} style={{ display: 'none' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrintDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrintConfirm}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}