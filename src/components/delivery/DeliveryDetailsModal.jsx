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
  if (!delivery || !delivery.data || !delivery.data.data) {
    return null;
  }

  const deliveryData = delivery.data.data; // Extract correct data object

  console.log('Delivery data:', deliveryData);

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'warning',
      'In Transit': 'info',
      Delivered: 'success',
      Cancelled: 'error',
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
                {deliveryData.customer || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Contact
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {deliveryData.contact || 'N/A'}
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
                Driver Name
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {deliveryData.driverName || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Driver Mobile
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {deliveryData.driverContact || 'N/A'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Vehicle Number
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {deliveryData.vehicleNo || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Delivery Date
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {deliveryData.deliveryDate
                  ? new Date(deliveryData.deliveryDate).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={deliveryData.status || 'Unknown'}
                color={getStatusColor(deliveryData.status)}
                size="medium"
              />
            </Grid>
          </Grid>

          {/* Additional Information */}
          {deliveryData.orderId || deliveryData.createdAt ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Additional Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {deliveryData.orderId && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Order ID
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {deliveryData.orderId}
                    </Typography>
                  </Grid>
                )}
                {deliveryData.createdAt && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(deliveryData.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
                {deliveryData.updatedAt && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(deliveryData.updatedAt).toLocaleString()}
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
