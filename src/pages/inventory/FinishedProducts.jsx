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
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

import FinishedProductForm from '../../components/inventory/forms/FinishedProductForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';
import productService from '../../services/productService';
import FinishedProductModel from './FinishedProductModel';

export default function FinishedProducts() {
  const [products, setProducts] = useState([]);  // Holds the list of products
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(true);  // To track loading state

  const [selectedFinishedProduct, setSelectedFinishedProduct] = useState(null);

  // Fetch the list of products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
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
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await productService.deleteProduct(productToDelete._id);
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
      // Re-fetch products after deletion
      const response = await productService.getProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };
  const handleView = async (id) => {
    try {
      const productDetails = await productService.getFullDetailById(id);
      console.log('productDetails', productDetails);
      setSelectedFinishedProduct(productDetails);  // Set the product data for the modal
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getStatusColor = (status) => {
    const colors = {
      delivered: 'success',
      pending: 'warning',
      completed: 'primary',
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
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Order Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.order_id || 'N/A'}</TableCell>
                  <TableCell>{product.orderDetails?.customerName || 'N/A'}</TableCell>
                  <TableCell>{product.orderDetails?.quantity || 'N/A'}</TableCell>
                  <TableCell>₹{product.orderDetails?.orderPrice || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
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
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleView(product._id)}  // Open view modal
                    >
                      <Visibility />
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

      {/* Finished Product Model */}
      <FinishedProductModel
        open={!!selectedFinishedProduct}  // Only show if product is selected
        production={selectedFinishedProduct}  // Pass the product data
        onClose={() => setSelectedFinishedProduct(null)}  // Close the modal
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
