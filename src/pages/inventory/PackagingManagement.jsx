import { useState } from 'react';
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
  Chip,
} from '@mui/material';
import toast from 'react-hot-toast';

const mockPackages = [
  {
    id: 'PKG-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    dimensions: {
      length: 30,
      width: 20,
      height: 15,
      weight: 2.5
    },
    status: 'pending'
  },
  {
    id: 'PKG-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    dimensions: {
      length: 25,
      width: 15,
      height: 10,
      weight: 1.8
    },
    status: 'ready'
  }
];

export default function PackagingManagement() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const handleEdit = (pkg) => {
    setSelectedPackage(pkg);
    setDimensions(pkg.dimensions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimensions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    toast.success('Package dimensions updated successfully');
    setSelectedPackage(null);
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Packaging Management</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Package ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Dimensions (cm)</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.orderId}</TableCell>
                    <TableCell>{pkg.customerName}</TableCell>
                    <TableCell>
                      {`${pkg.dimensions.length}x${pkg.dimensions.width}x${pkg.dimensions.height}`}
                    </TableCell>
                    <TableCell>{pkg.dimensions.weight}</TableCell>
                    <TableCell>
                      <Chip
                        label={pkg.status.toUpperCase()}
                        color={pkg.status === 'ready' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEdit(pkg)}
                      >
                        Update Dimensions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      <Dialog open={!!selectedPackage} onClose={() => setSelectedPackage(null)}>
        <DialogTitle>Update Package Dimensions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Length (cm)"
                name="length"
                type="number"
                value={dimensions.length}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width (cm)"
                name="width"
                type="number"
                value={dimensions.width}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                name="height"
                type="number"
                value={dimensions.height}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                name="weight"
                type="number"
                step="0.1"
                value={dimensions.weight}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedPackage(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}