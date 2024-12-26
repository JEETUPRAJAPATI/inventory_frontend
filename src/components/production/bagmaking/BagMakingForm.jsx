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
import { bagTypes } from '../../../constants/productionTypes';
import { colorOptions } from '../../../constants/colors';

const initialFormData = {
  role_size: '',
  bag_type: '',
  bag_color: '',
  bag_size: '',
  job_name: '',
  gsm: '',
  quantity: '',
  weight: '',
  qnt: '',
  status: 'pending'
};

export default function BagMakingForm({ open, onClose, onSubmit, record = null }) {
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

    // Clear job_name when switching to D-Cut Loop Handle
    if (name === 'bag_type' && value === 'd-cut-loop-handle') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        job_name: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const showJobName = formData.bag_type !== 'd-cut-loop-handle';

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
              <FormInput
                label="Bag Size"
                name="bag_size"
                value={formData.bag_size}
                onChange={handleChange}
                placeholder="e.g., 12x15x4"
                required
              />
            </Grid>
            {showJobName && (
              <Grid item xs={12} md={6}>
                <FormInput
                  label="Job Name"
                  name="job_name"
                  value={formData.job_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
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
                label="Weight"
                name="weight"
                type="number"
                step="0.01"
                value={formData.weight}
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
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <FormInput
                label="Role Size"
                name="role_size"
                value={formData.role_size}
                onChange={handleChange}
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