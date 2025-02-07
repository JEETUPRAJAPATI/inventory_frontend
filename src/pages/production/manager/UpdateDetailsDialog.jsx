import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import productionService from '/src/services/productionManagerService.js';

export default function UpdateDetailsDialog({ open, onClose, record, type, orderId }) {
  const [formData, setFormData] = useState({
    type: type || '', // Initialize with type prop
    roll_size: '',
    cylinder_size: '',
    quantity_kgs: '',
    quantity_rolls: '',
    remarks: '',
  });

  useEffect(() => {
    console.log('record list', record);

    if (record && record.production_details) {
      setFormData({
        type: type, // Ensure type is included
        roll_size: record.production_details.roll_size || '',
        cylinder_size: record.production_details.cylinder_size || '',
        quantity_kgs: record.production_details.quantity_kgs || '',
        quantity_rolls: record.production_details.quantity_rolls || '',
        remarks: record.remarks || '', // assuming remarks is at the same level as production_details
      });
    } else {
      // Set empty values if production_details is null
      setFormData({
        type: type, // Ensure type is included even if empty
        roll_size: '',
        cylinder_size: '',
        quantity_kgs: '',
        quantity_rolls: '',
        remarks: '',
      });
    }
  }, [record, type]); // Include type as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('formData', formData);
    console.log('order id', orderId);

    try {
      const updatedRecord = await productionService.updateProductionRecord(formData, orderId);
      toast.success('Record updated successfully');
      onClose(); // Close the dialog after success
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('Failed to update record');
    }
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
