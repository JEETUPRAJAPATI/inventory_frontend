import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeDialog({ open, onClose, orderData }) {
  const qrRef = useRef(null);

  if (!orderData) return null;

  const qrData = JSON.stringify({
    fabricColor: orderData.fabricColor,
    rollSize: orderData.rollSize,
    gsm: orderData.gsm,
    quantity: orderData.quantity,
  });

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      console.error("QR Code canvas element not found.");
      return;
    }

    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `order-${orderData._id}-qr.png`;
    downloadLink.href = pngFile;
    downloadLink.click();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order QR Code</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
          }}
          ref={qrRef}
        >
          <QRCodeCanvas value={qrData} size={300} level="H" includeMargin />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Scan this QR code to get order details
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Fabric Color:</strong> {orderData.fabricColor}
            </Typography>
            <Typography variant="body2">
              <strong>Roll Size:</strong> {orderData.rollSize}
            </Typography>
            <Typography variant="body2">
              <strong>GSM:</strong> {orderData.gsm}
            </Typography>
            <Typography variant="body2">
              <strong>Quantity:</strong> {orderData.quantity}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={downloadQRCode}>
          Download QR Code
        </Button>
      </DialogActions>
    </Dialog>
  );
}
