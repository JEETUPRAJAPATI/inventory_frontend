import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const DeliveryStatusUpdateModal = ({ open, delivery, status, onStatusChange, onConfirm, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Delivery Status</DialogTitle>
            <DialogContent>
                <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in transit">In Transit</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <strong>Order ID:</strong> {delivery?.orderId || 'N/A'}
                </div>
                <div>
                    <strong>Customer:</strong> {delivery?.orderDetails?.customerName || 'N/A'}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Update Status
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeliveryStatusUpdateModal;
