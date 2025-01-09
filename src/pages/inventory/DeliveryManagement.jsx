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

const mockDeliveries = [
  {
    id: 'DEL-001',
    orderId: 'ORD-001',
    customerName: 'John Doe',
    vehicleNo: '',
    driverName: '',
    driverContact: '',
    status: 'pending'
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-002',
    customerName: 'Jane Smith',
    vehicleNo: 'MH-12-AB-1234',
    driverName: 'Mike Johnson',
    driverContact: '+1234567890',
    status: 'assigned'
  }
];

export default function DeliveryManagement() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    vehicleNo: '',
    driverName: '',
    driverContact: ''
  });

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setDeliveryDetails({
      vehicleNo: delivery.vehicleNo,
      driverName: delivery.driverName,
      driverContact: delivery.driverContact
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    toast.success('Delivery details updated successfully');
    setSelectedDelivery(null);
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Delivery Management</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Delivery ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Vehicle No</TableCell>
                  <TableCell>Driver Name</TableCell>
                  <TableCell>Driver Contact</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>{delivery.id}</TableCell>
                    <TableCell>{delivery.orderId}</TableCell>
                    <TableCell>{delivery.customerName}</TableCell>
                    <TableCell>{delivery.vehicleNo || '-'}</TableCell>
                    <TableCell>{delivery.driverName || '-'}</TableCell>
                    <TableCell>{delivery.driverContact || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={delivery.status.toUpperCase()}
                        color={delivery.status === 'assigned' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEdit(delivery)}
                      >
                        Update Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      <Dialog open={!!selectedDelivery} onClose={() => setSelectedDelivery(null)}>
        <DialogTitle>Update Delivery Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Vehicle Number"
                name="vehicleNo"
                value={deliveryDetails.vehicleNo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Driver Name"
                name="driverName"
                value={deliveryDetails.driverName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Driver Contact"
                name="driverContact"
                value={deliveryDetails.driverContact}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDelivery(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}