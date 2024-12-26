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
import { colorOptions } from '../../../constants/colors';
import { bagTypes } from '../../../constants/productionTypes';
import { printTypes } from '../../../constants/printTypes';

const initialFormData = {
  agent_name: '',
  bag_type: '',
  bag_size: '',
  bag_color: '',
  print_color: '',
  quantity: '',
  qnt: '',
  print_type: '',
  status: 'pending'
};

export default function OpsertForm({ open, onClose, onSubmit, record = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (record) {
      setFormData(record);
    } else {
      setFormData(initialFormData);
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {record ? 'Edit Record' : 'Create New Record'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormInput
                            label="Order Id"
                             type='text'
                            name="order_id"
                            value={formData.order_id}
                            onChange={handleChange}
                            required
                          />
</Grid>

            <Grid item xs={12} md={6}>
              <FormSelect
                label="Bag Type"
                name="bag_type"
                value={formData.bag_type}
                onChange={handleChange}
                options={bagTypes}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Bag Size"
                name="bag_size"
                value={formData.bag_size}
                onChange={handleChange}
                placeholder="e.g., 12x15x4"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Bag Color"
                name="bag_color"
                value={formData.bag_color}
                onChange={handleChange}
                options={colorOptions}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Print Color"
                name="print_color"
                value={formData.print_color}
                onChange={handleChange}
                options={colorOptions}
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
                label="QNT"
                name="qnt"
                type="number"
                value={formData.qnt}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Print Type"
                name="print_type"
                value={formData.print_type}
                onChange={handleChange}
                options={printTypes}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <FormInput
                label="Agent Name"
                name="agent_name"
                value={formData.agent_name}
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
            {record ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}