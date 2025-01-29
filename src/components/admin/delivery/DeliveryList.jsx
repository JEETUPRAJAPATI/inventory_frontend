import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import toast from 'react-hot-toast';
import deliveryService from '/src/services/adminService.js'; // Make sure the service is correctly imported
import { Edit, Delete, Add, Search } from '@mui/icons-material';
export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });

  // State for Edit Form Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    status: '',
    deliveryDate: '',
    driverContact: '',
    driverName: '',
    vehicleNo: '',
  });

  // Fetch Deliveries with Filters
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await deliveryService.getDeliveries(filters);
      console.log('Deliveries:', response.data);
      setDeliveries(response.data);
    } catch (error) {
      toast.error('Error fetching deliveries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [filters]);

  // Format date to 'YYYY-MM-DD'
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  };

  const handleEditClick = (delivery) => {
    setSelectedDelivery(delivery);
    setEditForm({
      status: delivery.status,
      deliveryDate: formatDate(delivery.deliveryDate),
      driverContact: delivery.driverContact,
      driverName: delivery.driverName,
      vehicleNo: delivery.vehicleNo,
    });
    setOpenEditDialog(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await deliveryService.updateDelivery(selectedDelivery._id, editForm);
      toast.success('Delivery updated successfully');
      setOpenEditDialog(false);
      fetchDeliveries(); // Refresh the list after saving
    } catch (error) {
      toast.error('Error updating delivery');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deliveryService.deleteDelivery(id);
      toast.success('Delivery deleted successfully');
      fetchDeliveries(); // Refresh the list after deletion
    } catch (error) {
      toast.error('Error deleting delivery');
    }
  };

  const filterOptions = {
    status: ['Pending', 'In Transit', 'Delivered'],
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Dispatch Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.orderId || 'N/A'}</TableCell>
                  <TableCell>{record.orderDetails?.customerName || 'N/A'}</TableCell>
                  <TableCell>{record.orderDetails?.jobName || 'N/A'}</TableCell>
                  <TableCell>{record.deliveryDate ? new Date(record.deliveryDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status || 'N/A'}
                      color={
                        record.status === 'Delivered'
                          ? 'success'
                          : record.status === 'In Transit'
                            ? 'warning'
                            : 'default'
                      }
                      size="small"
                    />
                  </TableCell>


                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(record)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(record._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Edit Form Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Delivery</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={editForm.status}
            onChange={handleEditFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Delivery Date"
            name="deliveryDate"
            type="date"
            value={editForm.deliveryDate}
            onChange={handleEditFormChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Driver Contact"
            name="driverContact"
            value={editForm.driverContact}
            onChange={handleEditFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Driver Name"
            name="driverName"
            value={editForm.driverName}
            onChange={handleEditFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Vehicle Number"
            name="vehicleNo"
            value={editForm.vehicleNo}
            onChange={handleEditFormChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
