import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';

const initialFormData = {
  customerName: '',
  email: '',
  address: '',
  mobileNumber: '',
  bagType: '',
  handleColor: '',
  size: '',
  jobName: '',
  bagColor: '',
  printColor: '',
  gsm: '',
  fabricQuality: '',
  quantity: '',
  agent: '',
  status: 'pending',
};

const bagTypes = [
  { value: 'loop handle', label: 'Loop Handle (D-cut)' },
  { value: 'box bag', label: 'Box Bag (W-cut)' },
];

const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderForm({ open, onClose, onSubmit, order = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (order) {
      setFormData(order);
    } else {
      setFormData(initialFormData);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {order ? 'Edit Order' : 'Create New Order'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Customer Information */}
            <Grid item xs={12} md={6}>
              <FormInput
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Bag Specifications */}
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Bag Type"
                name="bagType"
                value={formData.bagType}
                onChange={handleChange}
                options={bagTypes}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Handle Color"
                name="handleColor"
                value={formData.handleColor}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                placeholder="e.g., 12x15x4 inches"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Job Name"
                name="jobName"
                value={formData.jobName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Bag Color"
                name="bagColor"
                value={formData.bagColor}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Print and Material Details */}
            <Grid item xs={12} md={6}>
              <FormInput
                label="Print Color"
                name="printColor"
                value={formData.printColor}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="GSM"
                name="gsm"
                type="number"
                value={formData.gsm}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Fabric Quality"
                name="fabricQuality"
                value={formData.fabricQuality}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Order Details */}
            <Grid item xs={12} md={6}>
              <FormInput
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Agent"
                name="agent"
                value={formData.agent}
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
                options={orderStatuses}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {order ? 'Update' : 'Create'} Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}