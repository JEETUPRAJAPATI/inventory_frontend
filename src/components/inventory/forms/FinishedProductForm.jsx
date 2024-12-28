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
  name: '',
  category: '',
  quantity: '',
  size: '',
  color: '',
  price: '',
  status: 'available',
};

export default function FinishedProductForm({ open, onClose, onSubmit, product = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categoryOptions = [
    { value: 'shopping_bag', label: 'Shopping Bag' },
    { value: 'gift_bag', label: 'Gift Bag' },
    { value: 'promotional_bag', label: 'Promotional Bag' },
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'out_of_stock', label: 'Out of Stock' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {product ? 'Edit Product' : 'Add Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
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
                label="Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., 12x15x4"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Price (₹)"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {product ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}