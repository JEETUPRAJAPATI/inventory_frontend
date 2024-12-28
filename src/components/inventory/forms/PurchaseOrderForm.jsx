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
  orderNumber: '',
  supplier: '',
  materialType: '',
  quantity: '',
  unitPrice: '',
  deliveryDate: '',
  status: 'pending',
  notes: '',
};

export default function PurchaseOrderForm({ open, onClose, onSubmit, order = null }) {
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

  const materialTypes = [
    { value: 'fabric', label: 'Fabric' },
    { value: 'handle', label: 'Handle Material' },
    { value: 'thread', label: 'Thread' },
    { value: 'dye', label: 'Dye' },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'ordered', label: 'Ordered' },
    { value: 'received', label: 'Received' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {order ? 'Edit Purchase Order' : 'Create Purchase Order'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Order Number"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Material Type"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                options={materialTypes}
                required
              />
            </Grid>
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
                label="Unit Price (₹)"
                name="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                value={formData.deliveryDate}
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
                rows={3}
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