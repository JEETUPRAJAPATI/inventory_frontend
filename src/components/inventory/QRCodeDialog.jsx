import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';

export default function QRCodeDialog({ open, onClose, material }) {
  if (!material) return null;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Convert QR code SVG to image data
    const svg = document.querySelector('#material-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgData = canvas.toDataURL('image/png');

      // Add content to PDF
      doc.setFontSize(16);
      doc.text('Raw Material QR Code', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text('Material Details:', 20, 40);
      doc.text(`Name: ${material.name}`, 30, 50);
      doc.text(`Category: ${material.category}`, 30, 60);
      doc.text(`Quantity: ${material.quantity} ${material.unit}`, 30, 70);
      doc.text(`Supplier: ${material.supplier}`, 30, 80);
      
      // Add QR code image
      doc.addImage(imgData, 'PNG', 65, 100, 80, 80);
      
      doc.save(`material-${material.id}-qr.pdf`);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Material QR Code</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
          <QRCodeSVG
            id="material-qr-code"
            value={JSON.stringify({
              id: material.id,
              name: material.name,
              category: material.category,
              quantity: material.quantity,
              unit: material.unit,
              supplier: material.supplier,
              reorderPoint: material.reorderPoint
            })}
            size={256}
            level="H"
            includeMargin
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" gutterBottom>
              Scan to view material details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {material.id}<br />
              Name: {material.name}<br />
              Category: {material.category}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}