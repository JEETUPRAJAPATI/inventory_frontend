import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Chip,
  Box,
  Stack,
} from '@mui/material';

export default function DeliveryDetailsModal({ open, delivery, onClose }) {
  if (!delivery) {
    return null;
  }

  console.log('Delivery data:', delivery);

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'warning',
      'In Transit': 'info',
      Delivered: 'success',
      Cancelled: 'error', // Added 'Cancelled' status for consistency
    };
    return colors[status] || 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>Delivery Details</DialogTitle>
      <DialogContent>
        <Box>
          {/* Customer Information */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Customer Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Customer Name
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {delivery.data.customer || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Contact
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {delivery.data.contact || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          {/* Delivery Details */}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ mt: 4 }}
          >
            Delivery Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Delivery Date
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {delivery.data.delivery_date
                  ? new Date(delivery.data.delivery_date).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={delivery.data.status || 'Unknown'}
                color={getStatusColor(delivery.data.status)}
                size="medium"
              />
            </Grid>
          </Grid>

          {/* Additional Information */}
          {delivery.data.notes || delivery.data.orderId || delivery.data.createdAt ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Additional Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {delivery.data.orderId && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Order ID
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {delivery.data.orderId}
                    </Typography>
                  </Grid>
                )}
                {delivery.data.notes && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Notes
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {delivery.data.notes}
                    </Typography>
                  </Grid>
                )}
                {delivery.data.createdAt && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(delivery.data.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
                {delivery.data.updatedAt && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(delivery.data.updatedAt).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ) : null}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
