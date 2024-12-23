import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { useOrders } from '../../hooks/useOrders';
import toast from 'react-hot-toast';

const initialFormData = {
  orderId: '',
  vehicleNo: '',
  status: 'pending',
  notes: ''
};

export default function DeliveryForm({ open, onClose, onSubmit, delivery = null }) {
  const [formData, setFormData] = useState(initialFormData);
  const [orderDetails, setOrderDetails] = useState(null);
  const { orders } = useOrders();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFetchOrder = () => {
    const order = orders.find(o => o.id === formData.orderId);
    if (order) {
      setOrderDetails(order);
      toast.success('Order details fetched successfully');
    } else {
      toast.error('Order not found');
      setOrderDetails(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderDetails) {
      toast.error('Please fetch order details first');
      return;
    }
    onSubmit({
      ...formData,
      orderDetails
    });
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Delivery</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Order ID and Fetch Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <FormInput
                  label="Order ID"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  required
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleFetchOrder}
                  sx={{ mt: 3 }}
                >
                  Fetch Details
                </Button>
              </Box>
            </Grid>

            {/* Order Details Display */}
            {orderDetails && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                    Order Details
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Customer Name"
                    value={orderDetails.customerName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Email"
                    value={orderDetails.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label="Address"
                    value={orderDetails.address}
                    disabled
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Mobile Number"
                    value={orderDetails.mobileNumber}
                    disabled
                  />
                </Grid>
              </>
            )}

            {/* Delivery Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                Delivery Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Vehicle Number"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!orderDetails}
          >
            Add Delivery
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}