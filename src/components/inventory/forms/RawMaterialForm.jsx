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
  unit: '',
  reorderPoint: '',
  supplier: '',
  unitPrice: '',
};

export default function RawMaterialForm({ open, onClose, onSubmit, material = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (material) {
      setFormData(material);
    } else {
      setFormData(initialFormData);
    }
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categoryOptions = [
    { value: 'fabric', label: 'Fabric' },
    { value: 'handle', label: 'Handle Material' },
    { value: 'thread', label: 'Thread' },
    { value: 'dye', label: 'Dye' },
  ];

  const unitOptions = [
    { value: 'meters', label: 'Meters' },
    { value: 'rolls', label: 'Rolls' },
    { value: 'kg', label: 'Kilograms' },
    { value: 'pcs', label: 'Pieces' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {material ? 'Edit Raw Material' : 'Add Raw Material'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Material Name"
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
              <FormSelect
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                options={unitOptions}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Reorder Point"
                name="reorderPoint"
                type="number"
                value={formData.reorderPoint}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {material ? 'Update' : 'Add'} Material
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}