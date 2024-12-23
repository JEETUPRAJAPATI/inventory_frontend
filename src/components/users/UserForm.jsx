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

const initialFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  registrationType: '',
  operatorType: '',
};

export default function UserForm({ open, onClose, onSubmit, user = null }) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(initialFormData);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset operatorType if registrationType is not production
      ...(name === 'registrationType' && value !== 'production' ? { operatorType: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const registrationTypes = [
    { value: 'admin', label: 'Admin' },
    { value: 'sales', label: 'Sales Manager' },
    { value: 'production', label: 'Production Manager' },
    { value: 'delivery', label: 'Delivery Manager' },
  ];

  const operatorTypes = [
    { value: 'flexo_printing', label: 'Flexo Printing' },
    { value: 'bag_making', label: 'Bag Making' },
    { value: 'opsert_printing', label: 'Opsert Printing' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {user ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
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
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                label="Registration Type"
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                options={registrationTypes}
                required
              />
            </Grid>
            {formData.registrationType === 'production' && (
              <Grid item xs={12}>
                <FormSelect
                  label="Operator Type"
                  name="operatorType"
                  value={formData.operatorType}
                  onChange={handleChange}
                  options={operatorTypes}
                  required
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {user ? 'Update' : 'Add'} User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}