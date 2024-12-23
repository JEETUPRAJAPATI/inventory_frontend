import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDialog({ open, onClose, orderData }) {
  if (!orderData) return null;

  const orderDetails = {
    id: orderData.id,
    customerName: orderData.customerName,
    jobName: orderData.jobName,
    bagType: orderData.bagType,
    quantity: orderData.quantity,
    status: orderData.status,
    createdAt: orderData.createdAt
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Order QR Code</DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <QRCodeSVG
          value={JSON.stringify(orderDetails)}
          size={256}
          level="H"
          includeMargin
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          onClick={() => {
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
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}