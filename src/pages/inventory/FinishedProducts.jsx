import { useState, useEffect } from 'react';
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
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import FinishedProductForm from '../../components/inventory/forms/FinishedProductForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';
import productService from '../../services/productService';

export default function FinishedProducts() {
  const [products, setProducts] = useState([]);  // Holds the list of products
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);  // To track loading state

  // Fetch the list of products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        console.log('response', response.data)
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        setProducts([]);  // Fallback to an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    console.log('form data', selectedProduct);
    try {
      if (selectedProduct) {
        // Update product
        await productService.updateProduct(formData._id, formData);
        toast.success('Product updated successfully');
      } else {
        // Add new product
        await productService.addProduct(formData);
        toast.success('Product added successfully');
      }
      setFormOpen(false);
      // Re-fetch products after update or add
      const response = await productService.getProducts();
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await productService.deleteProduct(productToDelete._id);  // Call API to delete product
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
      // Re-fetch products after deletion
      const response = await productService.getProducts();
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      low_stock: 'warning',
      out_of_stock: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <Typography variant="h6">Loading products...</Typography>;
  }

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Finished Products</Typography>
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
              {products.map((product) => (
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
