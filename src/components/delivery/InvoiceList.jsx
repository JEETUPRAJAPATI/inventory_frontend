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
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const mockInvoices = [
  {
    id: 'INV-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    jobName: 'Premium Shopping Bags',
    date: '2024-02-20',
    amount: 15000,
    status: 'delivered'
  },
  {
    id: 'INV-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    jobName: 'Eco Friendly Bags',
    date: '2024-02-19',
    amount: 25000,
    status: 'in_transit'
  }
];

export default function InvoiceList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDownloadInvoice = (invoice) => {
    try {
      generateInvoicePDF({
        ...invoice,
        invoiceNumber: invoice.id,
        gstNumber: 'GST123456789',
        subtotal: invoice.amount,
        gst: invoice.amount * 0.18,
        total: invoice.amount * 1.18
      });
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
    }
  };

  const MobileCard = ({ invoice }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Invoice Details
        </Typography>
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Invoice ID:</Typography>
          <Typography variant="body2">{invoice.id}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Order ID:</Typography>
          <Typography variant="body2">{invoice.orderId}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Customer:</Typography>
          <Typography variant="body2">{invoice.customerName}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Job Name:</Typography>
          <Typography variant="body2">{invoice.jobName}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Date:</Typography>
          <Typography variant="body2">{invoice.date}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Status:</Typography>
          <Chip
            label={invoice.status.toUpperCase()}
            color={invoice.status === 'delivered' ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        <IconButton
          color="primary"
          onClick={() => handleDownloadInvoice(invoice)}
          sx={{ width: '100%' }}
        >
          <PictureAsPdf /> <Typography sx={{ ml: 1 }}>Download Invoice</Typography>
        </IconButton>
      </Box>
    </Card>
  );

  if (isMobile) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Delivery Invoices</Typography>
        {mockInvoices.map((invoice) => (
          <MobileCard key={invoice.id} invoice={invoice} />
        ))}
      </Box>
    );
  }

  return (
    <Card>
      <div className="p-4">
        <Typography variant="h6">Delivery Invoices</Typography>
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
                <TableCell>
                  <Chip
                    label={invoice.status.toUpperCase()}
                    color={invoice.status === 'delivered' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleDownloadInvoice(invoice)}
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