import { useState, useEffect } from 'react';
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
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import toast from 'react-hot-toast';
import deliveryService from '../../services/deliveryService';

export default function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    vehicleNo: '',
    driverName: '',
    driverContact: '',
    deliveryDate: '',
    status: '' // Added status field
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch deliveries from API
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await deliveryService.getDeliveries(); // API call to fetch deliveries
      console.log(response.data);
      setDeliveries(response.data || []);
    } catch (error) {
      toast.error('Error fetching deliveries: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries(); // Fetch deliveries on component mount
  }, []);

  const handleEdit = (delivery) => {
    if (!delivery) return;
    setSelectedDelivery(delivery); // Store the selected delivery
    setDeliveryDetails({
      _id: delivery._id || '', // Ensure the _id is stored in the state
      vehicleNo: delivery.vehicleNo || '',
      driverName: delivery.driverName || '',
      driverContact: delivery.driverContact || '',
      deliveryDate: delivery.deliveryDate || '',
      status: delivery.status || '' // Ensure the status is also set
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Add basic form validation here
    const { vehicleNo, driverName, driverContact, deliveryDate, status } = deliveryDetails;
    if (!vehicleNo || !driverName || !driverContact || !deliveryDate || !status) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { _id, ...updatedDetails } = deliveryDetails; // Destructure '_id' from the state

      console.log('Updated data without ID:', updatedDetails); // Log the updated details without the '_id'

      // Now pass the ID separately and exclude it from the payload
      await deliveryService.updateDelivery(_id, updatedDetails); // Pass _id as a URL parameter or as part of the request

      toast.success('Delivery details updated successfully');
      setSelectedDelivery(null);
      fetchDeliveries(); // Refetch deliveries after update
    } catch (error) {
      toast.error('Error updating delivery: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Delivery Management
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress />
            </Box>
          ) : deliveries.length === 0 ? (
            <Typography variant="body1" color="textSecondary" align="center">
              No deliveries available.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
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
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery._id}>
                      <TableCell>{delivery.orderId || 'N/A'}</TableCell>
                      <TableCell>{delivery.orderDetails?.agent || 'N/A'}</TableCell>
                      <TableCell>{delivery.orderDetails?.customerName || 'N/A'}</TableCell>
                      <TableCell>{delivery.orderDetails?.address || 'N/A'}</TableCell>
                      <TableCell>{delivery.orderDetails?.mobileNumber || 'N/A'}</TableCell>
                      <TableCell>{delivery.deliveryDate || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={delivery.status?.toUpperCase() || 'UNKNOWN'}
                          color={delivery.status === 'delivered' ? 'success' : 'warning'}
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
          )}
        </Box>
      </Card>

      <Dialog
        open={!!selectedDelivery}
        onClose={() => setSelectedDelivery(null)}
        aria-labelledby="update-delivery-dialog-title"
      >
        <DialogTitle id="update-delivery-dialog-title">
          Update Delivery Details
        </DialogTitle>
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
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                value={
                  deliveryDetails.deliveryDate
                    ? new Date(deliveryDetails.deliveryDate).toLocaleDateString('en-CA') // 'en-CA' ensures the format is YYYY-MM-DD
                    : ''
                }
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            {/* Status Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={deliveryDetails.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in transit">In Transit</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDelivery(null)} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
