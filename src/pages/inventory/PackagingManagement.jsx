import React, { Fragment, useState } from 'react';

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
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Add, Edit, Visibility } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';
import { PictureAsPdf } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    totalDimensions: '30x20x15',
    totalWeight: 2.5,
    status: 'pending',
    packages: [
      { id: 'PKG-001', length: 30, width: 20, height: 15, weight: 2.5 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    totalDimensions: '25x15x10',
    totalWeight: 1.8,
    status: 'ready',
    packages: [
      { id: 'PKG-002', length: 25, width: 15, height: 10, weight: 1.8 }
    ]
  }
];
const initialPackageState = {
  length: '',
  width: '',
  height: '',
  weight: ''
};
export default function PackagingManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packageListOpen, setPackageListOpen] = useState(false);
  const [editPackageOpen, setEditPackageOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([initialPackageState]);
  const [addPackageOpen, setAddPackageOpen] = useState(false);


  const [newPackage, setNewPackage] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const handleViewPackages = (order) => {
    setSelectedOrder(order);
    setPackageListOpen(true);
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setNewPackage({
      length: pkg.length,
      width: pkg.width,
      height: pkg.height,
      weight: pkg.weight
    });
    setEditPackageOpen(true);
  };

  const handleUpdatePackage = () => {
    toast.success('Package dimensions updated successfully');
    setEditPackageOpen(false);
  };

  // Handle Order Selection
  const handleOrderChange = (e) => {
    const order = mockOrders.find(o => o.id === e.target.value);
    setSelectedOrder(order);

    if (order) {
      const [length, width, height] = order.totalDimensions.split('x');
      const newPackage = {
        length: length || '',
        width: width || '',
        height: height || '',
        weight: order.totalWeight || ''
      };
      setPackages([newPackage]);
    }
  };


  const handleAddPackage = () => {
    setPackages([...packages, { ...initialPackageState }]);
  };

  const handleSavePackages = () => {
    toast.success('Packages saved successfully');
    handleCancel();
  };

  const handleCancel = () => {
    setSelectedOrder(null);
    setPackages([initialPackageState]);
    setAddPackageOpen(false);
  };


  const generatePackageLabel = (packageData) => {
    const doc = new jsPDF();

    // Add company header
    doc.setFontSize(16);
    doc.text('MFRS. OF TECHNICAL TEXTILE FABRIC', 105, 20, { align: 'center' });

    // Add package details in a grid format
    doc.setFontSize(12);
    const startY = 40;
    const lineHeight = 10;

    // Left column
    doc.text(`ROLL No.    : ${packageData.rollNo}`, 20, startY);
    doc.text(`COLOR       : ${packageData.color}`, 20, startY + lineHeight);
    doc.text(`UNIT No.    : 1`, 20, startY + lineHeight * 2);
    doc.text(`CUST. Code  : SW350`, 20, startY + lineHeight * 3);
    doc.text(`Rolls In bundle : 1`, 20, startY + lineHeight * 4);
    doc.text(`Lot No      : 2415N9U1`, 20, startY + lineHeight * 5);

    // Right column
    doc.text(`GSM         : ${packageData.gsm}`, 120, startY);
    doc.text(`WIDTH       : ${packageData.width}`, 120, startY + lineHeight);
    doc.text(`LENGTH      : ${packageData.length}`, 120, startY + lineHeight * 2);
    doc.text(`GROSS WT.   : ${packageData.grossWeight}`, 120, startY + lineHeight * 3);
    doc.text(`NET WT.     : ${packageData.netWeight}`, 120, startY + lineHeight * 4);

    // Additional details
    const startY2 = startY + lineHeight * 6;
    doc.text(`PATTERN     : ${packageData.pattern}`, 20, startY2);
    doc.text(`TYPE OF FABRIC : ${packageData.fabricType}`, 20, startY2 + lineHeight);
    doc.text(`TREATMENT   : ${packageData.treatment}`, 20, startY2 + lineHeight * 2);
    doc.text(`TECHNOLOGY  : ${packageData.technology}`, 20, startY2 + lineHeight * 3);

    // Add barcode (simulated with a black rectangle)
    doc.setFillColor(0, 0, 0);
    doc.rect(20, startY2 + lineHeight * 4, 80, 20, 'F');

    doc.save(`package-label-${packageData.rollNo}.pdf`);
    toast.success('Package label downloaded successfully');
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
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.totalDimensions}</TableCell>
                    <TableCell>{order.totalWeight}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={order.status === 'ready' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewPackages(order)}
                      >
                        View Packages
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      {/* Package List Modal */}
      <Dialog
        open={packageListOpen}
        onClose={() => setPackageListOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Packages for Order {selectedOrder?.id}
        </DialogTitle>
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
                {selectedOrder?.packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.id}</TableCell>
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
                        onClick={() => generatePackageLabel(pkg)}
                      >
                        <PictureAsPdf />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageListOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Package Modal */}
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
          <Button variant="contained" onClick={handleUpdatePackage}>
            Update Package
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Package Modal */}
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
            <Grid item xs={12}>
              <TextField
                select
                label="Select Order"
                fullWidth
                value={selectedOrder?.id || ''}
                onChange={handleOrderChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select an order</option>
                {mockOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {order.customerName}
                  </option>
                ))}
              </TextField>
            </Grid>

            {selectedOrder && (
              <Grid item xs={12}>
                <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Order Details</Typography>
                  <Typography variant="body2">Customer: {selectedOrder.customerName}</Typography>
                  <Typography variant="body2">Dimensions: {selectedOrder.totalDimensions}</Typography>
                  <Typography variant="body2">Weight: {selectedOrder.totalWeight} kg</Typography>
                </Box>
              </Grid>
            )}

            {packages.map((pkg, index) => (
              <Fragment key={index}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>Package {index + 1}</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Length (cm)"
                          value={pkg.length}
                          onChange={(e) => handlePackageChange(index, 'length', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Width (cm)"
                          value={pkg.width}
                          onChange={(e) => handlePackageChange(index, 'width', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Height (cm)"
                          value={pkg.height}
                          onChange={(e) => handlePackageChange(index, 'height', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Weight (kg)"
                          value={pkg.weight}
                          onChange={(e) => handlePackageChange(index, 'weight', e.target.value)}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Fragment>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={handleAddPackage}
                fullWidth
              >
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