import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { useOrders } from '../../hooks/useOrders';

const initialFormData = {
  orderId: '',
  invoiceNumber: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  gstNumber: '',
  unitPrice: '',
};

export default function InvoiceForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders } = useOrders();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'orderId') {
      const order = orders.find(o => o.id === value);
      setSelectedOrder(order);
    }
  };

  const calculateTotals = () => {
    if (!selectedOrder || !formData.unitPrice) return { subtotal: 0, gst: 0, total: 0 };

    const subtotal = selectedOrder.quantity * parseFloat(formData.unitPrice);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;

    return { subtotal, gst, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subtotal, gst, total } = calculateTotals();

    onSubmit({
      ...formData,
      ...selectedOrder,
      subtotal,
      gst,
      total,
    });
  };
  const orderOptions = Array.isArray(orders)
  ? orders.map(order => ({
      value: order.id,
      label: `${order.jobName} - ${order.customerName}`
    }))
  : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Generate Invoice</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormSelect
                label="Select Order"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                options={orderOptions}
                required
              />
            </Grid>

            {selectedOrder && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Customer Name"
                    value={selectedOrder.customerName}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Email"
                    value={selectedOrder.email}
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormInput
                    label="Address"
                    value={selectedOrder.address}
                    disabled
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Job Name"
                    value={selectedOrder.jobName}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormInput
                    label="Quantity"
                    value={selectedOrder.quantity}
                    disabled
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Invoice Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                label="Invoice Number"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                label="Invoice Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                label="Unit Price"
                name="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
                required
              />
            </Grid>

            {selectedOrder && formData.unitPrice && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Totals
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Typography>
                      Subtotal: ₹{calculateTotals().subtotal.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography>
                      GST (18%): ₹{calculateTotals().gst.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography>
                      Total: ₹{calculateTotals().total.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!selectedOrder || !formData.unitPrice}
          >
            Generate Invoice
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}