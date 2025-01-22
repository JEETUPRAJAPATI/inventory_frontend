import { useState, useEffect, useRef } from 'react';
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
import { Html5QrcodeScanner } from 'html5-qrcode';
import toast from 'react-hot-toast';

export default function VerifyOrderDialog({ open, onClose, order, onVerifyComplete }) {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null);

  // Cleanup scanner when dialog closes
  useEffect(() => {
    if (!open && scannerRef.current) {
      try {
        scannerRef.current.clear().catch(() => {
          // Ignore cleanup errors
          console.log('Scanner cleanup completed');
        });
        scannerRef.current = null;
      } catch (error) {
        // Ignore any errors during cleanup
        console.log('Scanner cleanup completed');
      }
    }
  }, [open]);

  const startScanning = () => {
    setScanning(true);
    const qrScanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scannerRef.current = qrScanner;

    qrScanner.render((decodedText) => {
      try {
        const data = JSON.parse(decodedText);
        // Only keep serializable data
        const cleanData = {
          rollSize: data.rollSize || '',
          gsm: data.gsm || '',
          fabricColor: data.fabricColor || '',
          bagType: data.bagType || '',
          printColor: data.printColor || '',
          cylinderSize: data.cylinderSize || ''
        };
        setScannedData(cleanData);
        setScanning(false);
        if (scannerRef.current) {
          scannerRef.current.clear().catch(console.warn);
        }
        toast.success('QR Code scanned successfully');
      } catch (error) {
        toast.error('Invalid QR Code format');
      }
    }, (error) => {
      console.warn(`QR Code scan error: ${error}`);
    });
  };

  const handleClose = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear().catch(() => {
          // Ignore cleanup errors
          console.log('Scanner cleanup completed');
        });
        scannerRef.current = null;
      } catch (error) {
        // Ignore any errors during cleanup
        console.log('Scanner cleanup completed');
      }
    }
    setScanning(false);
    setScannedData(null);
    onClose();
  };

  const handleConfirm = () => {
    if (scannedData) {
      onVerifyComplete(order.id, scannedData);
      handleClose();
    }
  };

  if (!order) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: scanning ? '80vh' : 'auto' }
      }}
    >
      <DialogTitle>Verify Order - {order.orderId}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Order Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Order ID: {order.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Job Name: {order.jobName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {order.quantity}
              </Typography>
            </Box>

            {scanning && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Scan QR Code
                </Typography>
                <Box 
                  id="qr-reader" 
                  sx={{ 
                    width: '100%',
                    '& video': {
                      width: '100% !important',
                      borderRadius: '8px'
                    }
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Scanned Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Roll Size"
                  value={scannedData?.rollSize || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.rollSize ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="GSM"
                  value={scannedData?.gsm || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.gsm ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fabric Color"
                  value={scannedData?.fabricColor || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.fabricColor ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bag Type"
                  value={scannedData?.bagType || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.bagType ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Print Color"
                  value={scannedData?.printColor || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.printColor ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cylinder Size"
                  value={scannedData?.cylinderSize || ''}
                  disabled
                  sx={{ backgroundColor: scannedData?.cylinderSize ? '#e8f5e9' : 'inherit' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!scanning && !scannedData && (
          <Button
            variant="contained"
            onClick={startScanning}
            color="primary"
          >
            Start Scanner
          </Button>
        )}
        {scannedData && (
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirm}
          >
            Confirm & Start Job
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}