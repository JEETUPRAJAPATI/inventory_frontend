import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDialog({ open, onClose, orderData }) {
  if (!orderData) return null;

  // Only include essential data for scanning
  const qrData = {
    orderId: orderData.id,
    jobName: orderData.jobName
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order QR Code</DialogTitle>
      <DialogContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          py: 3 
        }}>
          <QRCodeSVG
            value={JSON.stringify(qrData)}
            size={256}
            level="H"
            includeMargin
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Scan this QR code to get order details
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Order ID:</strong> {orderData.id}
            </Typography>
            <Typography variant="body2">
              <strong>Job Name:</strong> {orderData.jobName}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained"
          onClick={() => {
            // Create a temporary canvas to convert SVG to PNG
            const svg = document.querySelector('.QRCode svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const pngFile = canvas.toDataURL('image/png');
              const downloadLink = document.createElement('a');
              downloadLink.download = `order-${orderData.id}-qr.png`;
              downloadLink.href = pngFile;
              downloadLink.click();
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
          }}
        >
          Download QR Code
        </Button>
      </DialogActions>
    </Dialog>
  );
}