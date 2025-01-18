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
    agentName: 'John Doe',
    customerName: 'Jane Smith',
    address: '123 Main St, City, Country',
    mobileNo: '+1234567890',
    deliveryDate: '2024-02-20',
    status: 'pending'
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-002',
    agentName: 'Sarah Wilson',
    customerName: 'John Doe',
    address: '456 Elm St, City, Country',
    mobileNo: '+0987654321',
    deliveryDate: '2024-02-21',
    status: 'assigned'
  }
];

export default function DeliveryManagement() {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    vehicleNo: '',
    driverName: '',
    driverContact: '',
    address: '',
    mobileNo: '',
    deliveryDate: ''
  });

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setDeliveryDetails({
      vehicleNo: delivery.vehicleNo,
      driverName: delivery.driverName,
      driverContact: delivery.driverContact,
      address: delivery.address,
      mobileNo: delivery.mobileNo,
      deliveryDate: delivery.deliveryDate
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
                  <TableCell>Agent Name</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Mobile No.</TableCell>
                  <TableCell>Delivery Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell>{delivery.id}</TableCell>
                    <TableCell>{delivery.orderId}</TableCell>
                    <TableCell>{delivery.agentName}</TableCell>
                    <TableCell>{delivery.customerName}</TableCell>
                    <TableCell>{delivery.address}</TableCell>
                    <TableCell>{delivery.mobileNo}</TableCell>
                    <TableCell>{delivery.deliveryDate}</TableCell>
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
            <Grid item xs={12}>
              <TextField
                label="Customer Address"
                name="address"
                value={deliveryDetails.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Customer Mobile No."
                name="mobileNo"
                value={deliveryDetails.mobileNo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                value={deliveryDetails.deliveryDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true
                }}
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
