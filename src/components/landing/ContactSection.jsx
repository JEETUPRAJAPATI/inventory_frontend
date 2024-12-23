import { useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    address: '',
    mobileNumber: '',
    bagType: '',
    handleColor: '',
    size: '',
    jobName: '',
    bagColor: '',
    printColor: '',
    gsm: '',
    fabricQuality: '',
    quantity: '',
  });

  const bagTypes = ['Loop Handle', 'Box Bag'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your inquiry. We will contact you soon!');
    setFormData({
      customerName: '',
      email: '',
      address: '',
      mobileNumber: '',
      bagType: '',
      handleColor: '',
      size: '',
      jobName: '',
      bagColor: '',
      printColor: '',
      gsm: '',
      fabricQuality: '',
      quantity: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        Get in Touch
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center">
        Request a demo or ask us anything about our software
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              label="Bag Type"
              name="bagType"
              value={formData.bagType}
              onChange={handleChange}
            >
              {bagTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <TextField
      fullWidth
      label="Handle Color"
      name="handleColor"
      value={formData.handleColor}
      onChange={handleChange}
    />
    <input
      type="color"
      name="handleColor"
      value={formData.handleColor}
      onChange={handleChange}
      style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
    />
  </Box>
</Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Name"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
            />
          </Grid>


<Grid item xs={12} sm={6}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <TextField
      fullWidth
      label="Bag Color"
      name="bagColor"
      value={formData.bagColor}
      onChange={handleChange}
    />
    <input
      type="color"
      name="bagColor"
      value={formData.bagColor}
      onChange={handleChange}
      style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
    />
  </Box>
</Grid>

<Grid item xs={12} sm={6}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <TextField
      fullWidth
      label="Print Color"
      name="printColor"
      value={formData.printColor}
      onChange={handleChange}
    />
    <input
      type="color"
      name="printColor"
      value={formData.printColor}
      onChange={handleChange}
      style={{ width: '40px', height: '40px', border: 'none', cursor: 'pointer' }}
    />
  </Box>
</Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="GSM"
              name="gsm"
              value={formData.gsm}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fabric Quality"
              name="fabricQuality"
              value={formData.fabricQuality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<Send />}
              fullWidth
            >
              Send Inquiry
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
