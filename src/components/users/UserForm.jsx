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
import { registrationTypes } from '../../constants/userTypes';
import { productionManagerBagTypes, operatorTypesByBag } from '../../constants/productionTypes';

const initialFormData = {
  fullName: '',
  email: '',
  mobileNumber: '',
  registrationType: '',
  bagType: '',
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
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Reset dependent fields
      if (name === 'registrationType') {
        newData.bagType = '';
        newData.operatorType = '';
      }
      
      // Reset operator type when bag type changes
      if (name === 'bagType') {
        newData.operatorType = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const showBagTypeField = formData.registrationType === 'production_manager';
  const showOperatorTypeField = showBagTypeField && formData.bagType;
  const operatorOptions = formData.bagType ? operatorTypesByBag[formData.bagType] : [];

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

            {showBagTypeField && (
              <Grid item xs={12}>
                <FormSelect
                  label="Bag Making Type"
                  name="bagType"
                  value={formData.bagType}
                  onChange={handleChange}
                  options={productionManagerBagTypes}
                  required
                />
              </Grid>
            )}

            {showOperatorTypeField && (
              <Grid item xs={12}>
                <FormSelect
                  label="Operator Type"
                  name="operatorType"
                  value={formData.operatorType}
                  onChange={handleChange}
                  options={operatorOptions}
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