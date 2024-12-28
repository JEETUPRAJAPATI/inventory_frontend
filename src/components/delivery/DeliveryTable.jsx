import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Card,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LocalShipping, CheckCircle } from '@mui/icons-material';

export default function DeliveryTable({ deliveries, onStatusUpdate }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      in_transit: 'info',
      delivered: 'success'
    };
    return colors[status] || 'default';
  };

  const MobileCard = ({ delivery }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Order Details
        </Typography>
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Order ID:</Typography>
          <Typography variant="body2">{delivery.orderId}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Customer:</Typography>
          <Typography variant="body2">{delivery.customerName}</Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Address:</Typography>
          <Typography variant="body2" align="right">{delivery.address}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Contact:</Typography>
          <Typography variant="body2">{delivery.contact}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Delivery Date:</Typography>
          <Typography variant="body2">{delivery.deliveryDate}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">Status:</Typography>
          <Chip
            label={delivery.status.replace('_', ' ').toUpperCase()}
            color={getStatusColor(delivery.status)}
            size="small"
          />
        </Box>

        {delivery.status === 'pending' && (
          <Button
            startIcon={<LocalShipping />}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => onStatusUpdate(delivery.id, 'in_transit')}
          >
            Start Delivery
          </Button>
        )}
        {delivery.status === 'in_transit' && (
          <Button
            startIcon={<CheckCircle />}
            variant="contained"
            color="success"
            fullWidth
            onClick={() => onStatusUpdate(delivery.id, 'delivered')}
          >
            Mark Delivered
          </Button>
        )}
      </Box>
    </Card>
  );

  if (isMobile) {
    return (
      <Box>
        {deliveries.map((delivery) => (
          <MobileCard key={delivery.id} delivery={delivery} />
        ))}
      </Box>
    );
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.orderId}</TableCell>
                <TableCell>{delivery.customerName}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>{delivery.contact}</TableCell>
                <TableCell>{delivery.deliveryDate}</TableCell>
                <TableCell>
                  <Chip
                    label={delivery.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(delivery.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {delivery.status === 'pending' && (
                    <Button
                      startIcon={<LocalShipping />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onStatusUpdate(delivery.id, 'in_transit')}
                    >
                      Start Delivery
                    </Button>
                  )}
                  {delivery.status === 'in_transit' && (
                    <Button
                      startIcon={<CheckCircle />}
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => onStatusUpdate(delivery.id, 'delivered')}
                    >
                      Mark Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}