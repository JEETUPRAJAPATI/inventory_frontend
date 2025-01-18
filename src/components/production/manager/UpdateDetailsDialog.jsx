import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function UpdateDetailsDialog({ open, onClose, record, type }) {
  const [formData, setFormData] = useState({
    roll_size: '',
    cylinder_size: '',
    quantity_kgs: '',
    quantity_rolls: '',
    remarks: '',
  });

  useEffect(() => {
    if (record) {
      setFormData({
        roll_size: record.roll_size || '',
        cylinder_size: record.cylinder_size || '',
        quantity_kgs: record.quantity_kgs || '',
        quantity_rolls: record.quantity_rolls || '',
        remarks: record.remarks || '',
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call here to update the record
    toast.success('Record updated successfully');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update {type} Production Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Roll Size"
                name="roll_size"
                value={formData.roll_size}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cylinder Size"
                name="cylinder_size"
                value={formData.cylinder_size}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity (in Kgs)"
                name="quantity_kgs"
                type="number"
                value={formData.quantity_kgs}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quantity (in Number of Rolls)"
                name="quantity_rolls"
                type="number"
                value={formData.quantity_rolls}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks (if Any)"
                name="remarks"
                value={formData.remarks}
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
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}