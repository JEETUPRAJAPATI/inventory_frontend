import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import "../../components/QRScanner/QRScanner.scss";

const QRScanner = ({ onScanSuccess }) => {
  const videoElementRef = useRef(null);
  const [scannedText, setScannedText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // Request Camera Permission
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  useEffect(() => {
    if (hasPermission === false) {
      console.warn("Camera access denied");
      return;
    }

    const video = videoElementRef.current;
    if (!video) return;

    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("Decoded QR Code:", result);
        setScannedText(result.data);

        // Auto-Verify the QR Code
        try {
          const data = JSON.parse(result.data);
          console.log("Verified Data:", data);
          onScanSuccess(data); // Pass the verified data
        } catch (error) {
          console.error("Invalid QR Code format", error);
          setScannedText("Invalid QR Code");
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();
    console.log("Scanner started");

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [hasPermission, onScanSuccess]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
      console.log("Decoded QR Code from image:", result);
      setScannedText(result.data);

      // Auto-Verify the QR Code from Image
      try {
        const data = JSON.parse(result.data);
        console.log("Verified Data from Image:", data);
        onScanSuccess(data);
      } catch (error) {
        console.error("Invalid QR Code format", error);
        setScannedText("Invalid QR Code");
      }
    } catch (error) {
      console.error("QR Code scan failed:", error);
      setScannedText("Invalid QR Code or failed to scan.");
    }
  };

  return (
    <div>
      {hasPermission === false ? (
        <p>⚠️ Camera access denied. Please enable it in browser settings.</p>
      ) : (
        <>
          <div className="videoWrapper">
            <video className="qrVideo" ref={videoElementRef} />
          </div>
          <p className="scannedText">SCANNED: {scannedText}</p>

          {/* Image Upload for Scanning */}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </>
      )}
    </div>
  );
};

export default QRScanner;
