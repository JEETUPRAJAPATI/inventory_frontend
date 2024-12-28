import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

export default function VerifyOrderDialog({ open, onClose, order }) {
  const [scannedData, setScannedData] = useState({
    orderId: '',
    jobName: ''
  });
  const [inventoryId, setInventoryId] = useState('');

  const handleScan = (data) => {
    try {
      const parsedData = JSON.parse(data);
      setScannedData({
        orderId: parsedData.orderId,
        jobName: parsedData.jobName
      });
      toast.success('QR Code scanned successfully');
    } catch (error) {
      toast.error('Invalid QR Code');
    }
  };

  const handleStartProduction = () => {
    if (!inventoryId) {
      toast.error('Please enter Inventory ID');
      return;
    }
    
    if (scannedData.orderId !== order?.id) {
      toast.error('Order ID mismatch');
      return;
    }

    toast.success('Production started successfully');
    onClose();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Verify Order - {order.id}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order ID: {order.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Job Name: {order.jobName}
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              Scan QR Code
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <QRCodeSVG
                value={JSON.stringify({
                  orderId: order.id,
                  jobName: order.jobName
                })}
                size={200}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Scanned Data
            </Typography>
            <TextField
              fullWidth
              label="Order ID"
              value={scannedData.orderId}
              margin="normal"
              disabled
            />
            <TextField
              fullWidth
              label="Job Name"
              value={scannedData.jobName}
              margin="normal"
              disabled
            />

            <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
              Production Details
            </Typography>
            <TextField
              fullWidth
              label="Inventory ID"
              value={inventoryId}
              onChange={(e) => setInventoryId(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleStartProduction}
          disabled={!scannedData.orderId || !inventoryId}
        >
          Start Production
        </Button>
      </DialogActions>
    </Dialog>
  );
}