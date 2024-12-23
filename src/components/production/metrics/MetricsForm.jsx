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
  production_rate: '',
  efficiency: '',
  quality_score: '',
  machine_status: 'running',
  last_maintenance: '',
  next_service: '',
};

export default function MetricsForm({ open, onClose, onSubmit, currentMetrics }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (currentMetrics) {
      setFormData(currentMetrics);
    }
  }, [currentMetrics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const machineStatusOptions = [
    { value: 'running', label: 'Running' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'stopped', label: 'Stopped' },
    { value: 'idle', label: 'Idle' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Update Production Metrics</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Production Rate (units/hr)"
                name="production_rate"
                type="number"
                value={formData.production_rate}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Efficiency (%)"
                name="efficiency"
                type="number"
                min="0"
                max="100"
                value={formData.efficiency}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Quality Score (%)"
                name="quality_score"
                type="number"
                min="0"
                max="100"
                value={formData.quality_score}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                label="Machine Status"
                name="machine_status"
                value={formData.machine_status}
                onChange={handleChange}
                options={machineStatusOptions}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Last Maintenance Date"
                name="last_maintenance"
                type="date"
                value={formData.last_maintenance}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                label="Next Service Date"
                name="next_service"
                type="date"
                value={formData.next_service}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Update Metrics
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}