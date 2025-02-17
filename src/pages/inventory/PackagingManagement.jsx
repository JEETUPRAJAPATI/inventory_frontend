import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Modal,
  Box,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, Edit, Visibility } from '@mui/icons-material';
import toast from 'react-hot-toast';
import PackageService from '../../services/packageService';
import { PictureAsPdf } from '@mui/icons-material';

import COMPANY_LOGO from '../../assets/logo.jpg';
import { jsPDF } from 'jspdf';
import JsBarcode from "jsbarcode";
const initialPackageState = {
  length: '',
  width: '',
  height: '',
  weight: ''
};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function PackagingManagement() {
  const [orders, setOrders] = useState([]); // Dynamic data from API
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const [editPackageOpen, setEditPackageOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageListOpen, setPackageListOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState(initialPackageState); // For editing package
  const [OrderPackageOpen, setOrderPackageOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState('');
  const [deliveryToUpdate, setDeliveryToUpdate] = useState(null); // Added to manage the delivery being updated
  const [updateStatusModalOpen, setUpdateStatusModalOpen] = useState(false);

  // Fetch orders from the service
  const fetchOrders = async () => {
    try {
      const orders = await PackageService.fetchOrders();
      console.log('orders', orders.data);
      setOrders(orders.data);
    } catch (error) {
      toast.error('Failed to fetch orders.');
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    fetchOrders(); // Fetch orders on mount
  }, []);

  const handleStatusUpdateClick = (delivery) => {
    setDeliveryToUpdate(delivery); // Set the delivery to be updated
    setStatusToUpdate(delivery.status); // Set the current status to preselect the right option
    setUpdateStatusModalOpen(true); // Open the modal
  };

  // Handle updating the delivery status
  const handleStatusUpdate = async () => {
    if (!deliveryToUpdate) return; // Prevent update if no delivery is selected

    // Log the data before making the API call
    console.log("Updating delivery with ID:", deliveryToUpdate._id);
    console.log("New status:", statusToUpdate);

    try {
      // Make the API call
      await PackageService.updateDeliveryStatus(deliveryToUpdate._id, statusToUpdate);
      toast.success(`Package status updated to ${statusToUpdate}`);
      fetchOrders(); // Refresh the list after the update
      setUpdateStatusModalOpen(false); // Close the modal after successful update
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };


  // Handle order selection
  const handleOrderChange = (e) => {
    const selectedOrderId = e.target.value; // Get the selected orderId
    const order = orders.find((o) => o.orderId === selectedOrderId); // Match with orderId
    setSelectedOrder(order); // Set the selected order

    if (order) {
      setPackages({
        ...packages,
        [selectedOrderId]: [{ ...initialPackageState }],
      });
    }
  };

  // Add new package to the selected order
  const handleAddPackage = () => {
    if (!selectedOrder) return;
    setPackages({
      ...packages,
      [selectedOrder.orderId]: [
        ...packages[selectedOrder.orderId],
        { ...initialPackageState },
      ],
    });
  };

  // Handle package input changes
  const handlePackageChange = (orderId, index, field, value) => {
    const updatedPackages = [...packages[orderId]];
    updatedPackages[index][field] = value;
    setPackages({
      ...packages,
      [orderId]: updatedPackages,
    });
  };

  // Save packages using the service
  const handleSavePackages = async () => {
    if (!selectedOrder) {
      toast.error('Please select an order.');
      return;
    }

    try {
      const payload = {
        order_id: selectedOrder.orderId,
        package_details: packages[selectedOrder.orderId].map((pkg) => ({
          length: parseFloat(pkg.length),
          width: parseFloat(pkg.width),
          height: parseFloat(pkg.height),
          weight: parseFloat(pkg.weight),
        })),
      };

      await PackageService.addPackage(payload);
      toast.success('Packages saved successfully');
      handleCancel();
    } catch (error) {
      toast.error('Failed to save packages.');
      console.error('Error saving packages:', error);
    }
  };

  const handleCancel = () => {
    setSelectedOrder(null);
    setPackages({});
    setAddPackageOpen(false);
    setEditPackageOpen(false);
  };

  const handleViewPackages = async (order) => {
    setSelectedOrder(order);
    setPackageListOpen(true);

    try {
      const { packages } = await PackageService.fetchPackagesByOrderId(order.orderId); // Deconstruct to get packages
      console.log('Fetched order packages:', packages);
      setPackages(packages);  // Set only the package data
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };


  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setNewPackage({
      length: pkg.length,
      width: pkg.width,
      height: pkg.height,
      weight: pkg.weight,
    });
    setEditPackageOpen(true);
  };

  const handleUpdatePackage = async () => {
    if (!selectedPackage || !selectedOrder) {
      toast.error('Please select a package and order to edit.');
      return;
    }

    const updatedPackage = {
      ...selectedPackage,
      length: newPackage.length,
      width: newPackage.width,
      height: newPackage.height,
      weight: newPackage.weight,
    };

    // Update local state
    const updatedPackages = packages.map(pkg =>
      pkg._id === selectedPackage._id ? updatedPackage : pkg
    );
    setPackages(updatedPackages);

    try {
      await PackageService.updatePackage(selectedOrder.orderId, selectedPackage._id, updatedPackage);
      const fetchedPackages = await PackageService.fetchPackagesByOrderId(selectedOrder.orderId);
      console.log('Refresh Data Fetched order list', fetchedPackages);
      setPackages(fetchedPackages || []);
      toast.success('Package updated successfully');
      setEditPackageOpen(false);
    } catch (error) {
      toast.error('Failed to update package.');
      console.error('Error updating package:', error);
    }
  };

  const createPackages = async () => {
    console.log('new package data', newPackage);
    console.log('order id', selectedOrder);

    // Prepare the payload to include the orderId and new package data
    const payload = {
      order_id: selectedOrder.orderId, // Add orderId to the payload
      package_details: [{
        length: parseFloat(newPackage.length),  // Ensure numbers are passed
        width: parseFloat(newPackage.width),
        height: parseFloat(newPackage.height),
        weight: parseFloat(newPackage.weight),
      }],
    };
    console.log('payload', payload);
    try {
      // Call the service method with the prepared payload
      const response = await PackageService.createPackage(payload);
      console.log('Package added successfully:', response);
      const fetchedPackages = await PackageService.fetchPackagesByOrderId(selectedOrder.orderId);
      console.log('Refresh Data Fetched order list', fetchedPackages);
      setPackages(fetchedPackages || []);
      handleCloseDialog();  // Close the dialog on success
    } catch (error) {
      // Log error in case the request fails
      console.error('Failed to add package:', error);
      alert(`Failed to add package: ${error.message || 'Unknown error'}`);
    }
  };


  const handleCloseDialog = () => {
    setOrderPackageOpen(false);
    setNewPackage({
      length: '',
      width: '',
      height: '',
      weight: ''
    });
  };
  const handleOpenDialog = () => {
    setOrderPackageOpen(true);
  };





  const generatePackageLabel = (pkg, salesOrder) => {
    console.log('pkg', pkg);
    console.log('sales order', salesOrder);

    if (!pkg || !salesOrder) {
      toast.error('Invalid package or sales order data');
      return;
    }

    const doc = new jsPDF();
    const marginLeft = 20;
    const topMargin = 10;
    const startY = topMargin + 30;
    const lineHeight = 12;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Load company logo as Base64
    const loadImageAsBase64 = (url, callback) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        callback(canvas.toDataURL("image/png"));
      };
      img.onerror = function () {
        console.error("Error loading image:", url);
        callback(null);
      };
      img.src = url;
    };

    // Generate Barcode
    const generateBarcode = (text, callback) => {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, text, {
        format: "CODE128",
        displayValue: false,
        width: 2,
        height: 40, // Increased height for better visibility
      });
      callback(canvas.toDataURL("image/png"));
    };

    loadImageAsBase64(COMPANY_LOGO, (logoBase64) => {
      generateBarcode(pkg.rollNo || "000000", (barcodeBase64) => {
        let currentY = topMargin;

        // Add company logo and details
        if (logoBase64) {
          doc.addImage(logoBase64, "PNG", marginLeft, currentY, 50, 25);
        }
        // Company info
        doc.setFontSize(12);
        doc.text("Company Name", pageWidth - 90, currentY + 5);
        doc.text("Address: 123 Business Street, City", pageWidth - 90, currentY + 15);
        doc.text("GSM Email: info@company.com", pageWidth - 90, currentY + 25);
        doc.text("Phone: +1-234-567-890", pageWidth - 90, currentY + 35);

        // Add separator line
        currentY += 45;
        doc.line(marginLeft, currentY, pageWidth - marginLeft, currentY);
        currentY += 10;

        // Add sales order details
        doc.text(`Order ID    : ${salesOrder.orderId || 'N/A'}`, marginLeft, currentY);
        doc.text(`Customer   : ${salesOrder.customerName || 'N/A'}`, marginLeft, currentY + lineHeight);
        doc.text(`Email      : ${salesOrder.email || 'N/A'}`, marginLeft, currentY + lineHeight * 2);
        doc.text(`Mobile     : ${salesOrder.mobileNumber || 'N/A'}`, marginLeft, currentY + lineHeight * 3);
        doc.text(`Address    : ${salesOrder.address || 'N/A'}`, marginLeft, currentY + lineHeight * 4);
        doc.text(`Job Name   : ${salesOrder.jobName || 'N/A'}`, marginLeft, currentY + lineHeight * 5);

        currentY += lineHeight * 6;
        doc.text(`Order Price: ${salesOrder.orderPrice || 'N/A'}`, marginLeft, currentY);

        // Add package details in a structured format
        currentY += 20;
        // doc.text(`ROLL No.    : ${pkg.rollNo || 'N/A'}`, marginLeft, currentY);
        doc.text(`TYPE OF FABRIC : ${salesOrder.bagDetails.type || 'N/A'}`, marginLeft, currentY);
        doc.text(`COLOR       : ${salesOrder.bagDetails.color || 'N/A'}`, marginLeft, currentY + lineHeight);
        doc.text(`UNIT No.    : 1`, marginLeft, currentY + lineHeight * 2);
        doc.text(`CUST. Code  : SW350`, marginLeft, currentY + lineHeight * 3);
        doc.text(`Rolls In bundle : 1`, marginLeft, currentY + lineHeight * 4);

        doc.text(`GSM         : ${salesOrder.bagDetails.gsm || 'N/A'}`, pageWidth / 2, currentY);
        doc.text(`WIDTH       : ${pkg.width || 'N/A'}`, pageWidth / 2, currentY + lineHeight);
        doc.text(`LENGTH      : ${pkg.length || 'N/A'}`, pageWidth / 2, currentY + lineHeight * 2);
        doc.text(`GROSS WT.   : ${pkg.grossWeight || 'N/A'}`, pageWidth / 2, currentY + lineHeight * 3);
        doc.text(`NET WT.     : ${pkg.netWeight || 'N/A'}`, pageWidth / 2, currentY + lineHeight * 4);

        currentY += lineHeight * 6;

        // Add barcode
        currentY += 20;
        if (barcodeBase64) {
          doc.addImage(barcodeBase64, "PNG", marginLeft, currentY, 100, 30);
        }

        // Save the PDF
        doc.save(`package-label-${pkg.gsm}.pdf`);
        toast.success('Package label downloaded successfully');
      });
    });
  };



  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Package Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddPackageOpen(true)}
            >
              Add Package
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Dimensions (cm)</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order?.order_id || 'N/A'}</TableCell>
                    <TableCell>{order?.order?.customerName || 'N/A'}</TableCell>
                    <TableCell>
                      {order?.order?.bagDetails?.size || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {order?.order?.quantity || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={order.status === 'ready' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleStatusUpdateClick(order)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleViewPackages(order)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </Box>
      </Card>

      <Dialog
        open={packageListOpen}
        onClose={() => setPackageListOpen(false)}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Packages for Order {selectedOrder?.id}

        </DialogTitle>
        <TableCell>
          <Button size="small" variant="outlined" onClick={handleOpenDialog}>
            Add New Packages
          </Button>
        </TableCell>

        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Package ID</TableCell>
                  <TableCell>Length (cm)</TableCell>
                  <TableCell>Width (cm)</TableCell>
                  <TableCell>Height (cm)</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.length > 0 ? (
                  packages[0].package_details.map((pkg) => (
                    <TableRow key={pkg._id}>
                      <TableCell>{pkg._id}</TableCell>
                      <TableCell>{pkg.length}</TableCell>
                      <TableCell>{pkg.width}</TableCell>
                      <TableCell>{pkg.height}</TableCell>
                      <TableCell>{pkg.weight}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditPackage(pkg)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => generatePackageLabel(pkg, selectedOrder)}
                        >
                          <PictureAsPdf />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No packages found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageListOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>


      {/* Update Status Modal */}
      <Modal
        open={updateStatusModalOpen}
        onClose={() => setUpdateStatusModalOpen(false)} // Close modal on backdrop click
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Update Delivery Status
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusToUpdate}
              onChange={(e) => setStatusToUpdate(e.target.value)} // Handle selection change
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setUpdateStatusModalOpen(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleStatusUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>


      {/* Add Package Dimensions Dialog */}
      <Dialog open={OrderPackageOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Package Dimensions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Length (cm)"
                type="number"
                value={newPackage.length}
                onChange={(e) => setNewPackage({ ...newPackage, length: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width (cm)"
                type="number"
                value={newPackage.width}
                onChange={(e) => setNewPackage({ ...newPackage, width: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                type="number"
                value={newPackage.height}
                onChange={(e) => setNewPackage({ ...newPackage, height: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                value={newPackage.weight}
                onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={createPackages}>
            Add Package
          </Button>
        </DialogActions>
      </Dialog>


      { /* Edit Package Dimensions */}
      <Dialog
        open={editPackageOpen}
        onClose={() => setEditPackageOpen(false)}
      >
        <DialogTitle>Edit Package Dimensions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Length (cm)"
                type="number"
                value={newPackage.length}
                onChange={(e) => setNewPackage({ ...newPackage, length: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width (cm)"
                type="number"
                value={newPackage.width}
                onChange={(e) => setNewPackage({ ...newPackage, width: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                type="number"
                value={newPackage.height}
                onChange={(e) => setNewPackage({ ...newPackage, height: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                value={newPackage.weight}
                onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPackageOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdatePackage}>Update Package</Button>
        </DialogActions>
      </Dialog>















      {/* Add Package Modal */}
      <Dialog
        open={addPackageOpen}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Packages</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Order Selection */}
            <Grid item xs={12}>
              <TextField
                select
                label="Select Order"
                fullWidth
                value={selectedOrder?.orderId || ''}
                onChange={handleOrderChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select an order</option>
                {orders.map((order) => (
                  <option key={order.orderId} value={order.orderId}>
                    {order.orderId} - {order.customerName}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Selected Order Details */}
            {selectedOrder && (
              <Grid item xs={12}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Order Details
                  </Typography>
                  <Typography variant="body2">Customer: {selectedOrder.customerName}</Typography>
                  <Typography variant="body2">Dimensions: {selectedOrder.totalDimensions}</Typography>
                  <Typography variant="body2">Weight: {selectedOrder.totalWeight} kg</Typography>
                </Box>
              </Grid>
            )}

            {/* Package List for Selected Order */}
            {selectedOrder && packages[selectedOrder.orderId] && packages[selectedOrder.orderId].map((pkg, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Package {index + 1}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Length (cm)"
                        value={pkg.length}
                        onChange={(e) => handlePackageChange(selectedOrder.orderId, index, 'length', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Width (cm)"
                        value={pkg.width}
                        onChange={(e) => handlePackageChange(selectedOrder.orderId, index, 'width', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Height (cm)"
                        value={pkg.height}
                        onChange={(e) => handlePackageChange(selectedOrder.orderId, index, 'height', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Weight (kg)"
                        value={pkg.weight}
                        onChange={(e) => handlePackageChange(selectedOrder.orderId, index, 'weight', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}

            {/* Add New Package Button */}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleAddPackage} fullWidth>
                Add Another Package
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePackages}>
            Save Packages
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
