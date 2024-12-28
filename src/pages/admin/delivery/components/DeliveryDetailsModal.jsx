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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Delivery Details - {delivery.id}
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
              {delivery.customerName}
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
            <Typography variant="body2" color="text.secondary">
              Delivery Address
            </Typography>
            <Typography variant="body1">
              {delivery.address}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              Items
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {delivery.items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                  {item.name}
                </Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              Additional Information
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Delivery Date
            </Typography>
            <Typography variant="body1">
              {delivery.deliveryDate}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={delivery.status.toUpperCase()}
              color={
                delivery.status === 'completed' ? 'success' :
                delivery.status === 'on-way' ? 'info' :
                delivery.status === 'rejected' ? 'error' : 'warning'
              }
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