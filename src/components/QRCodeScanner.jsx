import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { CloudDownload, Upload } from '@mui/icons-material';
import toast from 'react-hot-toast';

// Test data for QR code
const testData = {
  rollSize: '15x20',
  gsm: '100',
  fabricColor: 'Green',
  bagType: 'W-Cut',
  printColor: 'Black',
  cylinderSize: '30x40'
};

export default function QRCodeScanner({ onScanSuccess }) {
  const [scanning, setScanning] = useState(true); // Start scanning by default
  const [showTestQR, setShowTestQR] = useState(false);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      const config = {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        rememberLastUsedCamera: true,
        disableFlip: false
      };


      scannerRef.current = new Html5QrcodeScanner('qr-reader', config);

      const handleScanSuccess = (decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear().catch(console.warn);
          }
          toast.success('QR Code scanned successfully');
          onScanSuccess(data);
        } catch (error) {
          toast.error('Invalid QR Code format');
        }
      };

      scannerRef.current.render(handleScanSuccess, console.warn);
    }

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear().catch(() => {
            console.log('Scanner cleanup completed');
          });
        } catch (error) {
          console.log('Scanner cleanup completed');
        }
      }
    };
  }, [scanning, onScanSuccess]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTimeout(() => {
        onScanSuccess(testData);
        toast.success('Test data loaded successfully');
      }, 500);
    }
  };

  const downloadTestQR = () => {
    const svg = document.querySelector('#test-qr-code');
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
      downloadLink.download = 'test-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.12)'
        }}
      >
        <Typography variant="h6">
          Scan QR Code
        </Typography>

        <input
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          id="qr-file-input"
          type="file"
          onChange={handleFileUpload}
        />
      </Box>

      {/* Scanner Area */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Box
          id="qr-reader"
          sx={{
            width: '100%',
            height: '100%',
            '& video': {
              width: '100% !important',
              height: '100% !important',
              objectFit: 'cover',
              borderRadius: 0
            }
          }}
        />

        {/* Test QR Overlay */}
        {showTestQR && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}
          >
            <QRCodeSVG
              id="test-qr-code"
              value={JSON.stringify(testData)}
              size={300}
              level="H"
              includeMargin
            />
            <Typography variant="caption" sx={{ color: 'white', mt: 2 }}>
              Save this QR code to test file upload
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowTestQR(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}