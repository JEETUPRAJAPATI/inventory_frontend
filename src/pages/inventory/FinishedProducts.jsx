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
import { Add, Edit, Delete } from '@mui/icons-material';
import FinishedProductForm from '../../components/inventory/forms/FinishedProductForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';

const mockProducts = [
  {
    id: 1,
    name: 'Premium Shopping Bag',
    category: 'shopping_bag',
    quantity: 500,
    size: '12x15x4',
    color: 'Blue',
    price: 25.00,
    status: 'available',
  },
  {
    id: 2,
    name: 'Luxury Gift Bag',
    category: 'gift_bag',
    quantity: 200,
    size: '10x12x3',
    color: 'Red',
    price: 35.00,
    status: 'low_stock',
  },
];

export default function FinishedProducts() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    toast.success(selectedProduct ? 'Product updated successfully' : 'Product added successfully');
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.success('Product deleted successfully');
    setDeleteDialogOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      low_stock: 'warning',
      out_of_stock: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Finished Products</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add Product
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.replace('_', ' ')}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(product.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(product)}
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

      <FinishedProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        content="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
}