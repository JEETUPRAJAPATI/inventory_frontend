import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Box,
  Chip,
} from '@mui/material';

export default function DeliveryDetailsModal({ open, delivery, onClose }) {
  if (!delivery) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'warning',
      'In Transit': 'info',
      'Delivered': 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Delivery Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              Customer Information
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Customer Name
            </Typography>
            <Typography variant="body1">
              {delivery.customer}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Contact
            </Typography>
            <Typography variant="body1">
              {delivery.contact}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              Delivery Details
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Delivery Date
            </Typography>
            <Typography variant="body1">
              {new Date(delivery.delivery_date).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={delivery.status}
              color={getStatusColor(delivery.status)}
              size="small"
            />
          </Grid>

          {delivery.notes && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body1">
                {delivery.notes}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}