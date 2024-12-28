import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';

const mockVehicles = [
  {
    id: 1,
    vehicleNumber: 'MH-12-AB-1234',
    type: 'Truck',
    capacity: '1000 kg',
    driver: 'John Doe',
    status: 'Available',
    lastMaintenance: '2024-02-01',
    nextService: '2024-03-01',
  },
  {
    id: 2,
    vehicleNumber: 'MH-12-CD-5678',
    type: 'Van',
    capacity: '500 kg',
    driver: 'Jane Smith',
    status: 'On Delivery',
    lastMaintenance: '2024-01-15',
    nextService: '2024-02-15',
  },
];

export default function VehicleManagement() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleDelete = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    toast.success('Vehicle deleted successfully');
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Vehicle Management</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add Vehicle
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Maintenance</TableCell>
                <TableCell>Next Service</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.vehicleNumber}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.capacity}</TableCell>
                  <TableCell>{vehicle.driver}</TableCell>
                  <TableCell>
                    <Chip
                      label={vehicle.status}
                      color={vehicle.status === 'Available' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{vehicle.lastMaintenance}</TableCell>
                  <TableCell>{vehicle.nextService}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(vehicle)}
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

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Vehicle"
        content="Are you sure you want to delete this vehicle? This action cannot be undone."
      />
    </>
  );
}