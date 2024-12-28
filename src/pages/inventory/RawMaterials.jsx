import { useState } from 'react';
import {
  Grid,
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
import { Add, Edit, Delete, QrCode } from '@mui/icons-material';
import RawMaterialForm from '../../components/inventory/forms/RawMaterialForm';
import QRCodeDialog from '../../components/inventory/QRCodeDialog';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';

const mockMaterials = [
  {
    id: 'RM-001',
    name: 'Non-woven Fabric',
    category: 'fabric',
    quantity: 1500,
    unit: 'meters',
    reorderPoint: 500,
    supplier: 'ABC Fabrics',
    unitPrice: 45.50,
    status: 'In Stock',
  },
  {
    id: 'RM-002',
    name: 'Handle Rope',
    category: 'handle',
    quantity: 300,
    unit: 'rolls',
    reorderPoint: 100,
    supplier: 'XYZ Materials',
    unitPrice: 25.75,
    status: 'Low Stock',
  },
];

export default function RawMaterials() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrMaterial, setSelectedQrMaterial] = useState(null);

  const handleAdd = () => {
    setSelectedMaterial(null);
    setFormOpen(true);
  };

  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setFormOpen(true);
  };

  const handleDelete = (material) => {
    setMaterialToDelete(material);
    setDeleteDialogOpen(true);
  };

  const handleViewQR = (material) => {
    setSelectedQrMaterial(material);
    setQrDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    toast.success(selectedMaterial ? 'Material updated successfully' : 'Material added successfully');
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.success('Material deleted successfully');
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Raw Materials</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add Material
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Reorder Point</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>{material.unit}</TableCell>
                  <TableCell>{material.reorderPoint}</TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>₹{material.unitPrice}</TableCell>
                  <TableCell>
                    <Chip
                      label={material.status}
                      color={material.status === 'In Stock' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(material)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(material)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewQR(material)}
                    >
                      <QrCode />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <RawMaterialForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        material={selectedMaterial}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Material"
        content="Are you sure you want to delete this material? This action cannot be undone."
      />

      <QRCodeDialog
        open={qrDialogOpen}
        onClose={() => setQrDialogOpen(false)}
        material={selectedQrMaterial}
      />
    </>
  );
}