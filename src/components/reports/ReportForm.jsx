import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormTextarea from '../common/FormTextarea';

const initialFormData = {
  title: '',
  type: 'sales',
  description: '',
  dateRange: '',
  status: 'draft',
};

export default function ReportForm({ open, onClose, onSubmit, report = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (report) {
      setFormData(report);
    } else {
      setFormData(initialFormData);
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {report ? 'Edit Report' : 'Create New Report'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormInput
                label="Report Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                label="Report Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={reportTypes}
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Date Range"
                name="dateRange"
                type="text"
                value={formData.dateRange}
                onChange={handleChange}
                placeholder="e.g., Jan 2024 - Feb 2024"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {report ? 'Update' : 'Create'} Report
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}