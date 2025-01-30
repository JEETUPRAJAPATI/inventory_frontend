import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDialog({ open, onClose, orderData }) {
  console.log("order data in qr code dialog : ", orderData);
  if (!orderData) return null;

  const qrData = {
    fabricColor: orderData.fabricColor,
    rollSize: orderData.rollSize,
    gsm: orderData.gsm,
    quantity: orderData.quantity,
  };

  const downloadQRCode = () => {
    const svgElement = document.querySelector(".qr-code-svg"); // Ensure the correct SVG is targeted
    if (!svgElement) {
      console.error("QR Code SVG element not found.");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `order-${orderData._id}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData))); // Properly encode SVG
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
        >
          <QRCodeSVG
            value={JSON.stringify(qrData)}
            size={256}
            level="H"
            includeMargin
            className="qr-code-svg" // Add a unique class to target the SVG element
          />
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
