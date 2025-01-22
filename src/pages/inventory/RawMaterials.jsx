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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, GetApp } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';

const categoryOptions = [
  { value: 'fabric', label: 'Fabric' },
  { value: 'handle', label: 'Handle' },
  { value: 'thread', label: 'Thread' },
  { value: 'dye', label: 'Dye' },
];

// Dummy data
const mockCategories = [
  {
    id: 1,
    category: 'fabric',
    fabricColor: 'Blue',
    rollSize: '1.6m x 100m',
    gsm: '90',
    fabricQuality: 'Premium',
    quantity: '500',
    subcategories: [
      {
        id: 11,
        fabricColor: 'Blue',
        rollSize: '1.6m x 100m',
        gsm: '90',
        fabricQuality: 'Premium',
        quantity: '300'
      },
      {
        id: 12,
        fabricColor: 'White',
        rollSize: '1.4m x 100m',
        gsm: '70',
        fabricQuality: 'Standard',
        quantity: '200'
      }
    ]
  },
  {
    id: 2,
    category: 'handle',
    fabricColor: 'Black',
    rollSize: '1.4m x 100m',
    gsm: '70',
    fabricQuality: 'Standard',
    quantity: '300',
    subcategories: []
  }
];

export default function RawMaterials() {
  const [categories, setCategories] = useState(mockCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewSubcategoriesOpen, setViewSubcategoriesOpen] = useState(false);
  const [addSubcategoryDialogOpen, setAddSubcategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category: '',
    fabricColor: '',
    rollSize: '',
    gsm: '',
    fabricQuality: '',
    quantity: '',
  });
  const [newSubcategory, setNewSubcategory] = useState({
    fabricColor: '',
    rollSize: '',
    gsm: '',
    fabricQuality: '',
    quantity: '',
  });

  const handleAddCategory = () => {
    if (!newCategory.category) {
      toast.error('Please select a category');
      return;
    }

    const categoryToAdd = {
      ...newCategory,
      id: Date.now(),
      subcategories: []
    };

    setCategories([...categories, categoryToAdd]);
    setNewCategory({
      category: '',
      fabricColor: '',
      rollSize: '',
      gsm: '',
      fabricQuality: '',
      quantity: '',
    });
    setFormOpen(false);
    toast.success('Category added successfully');
  };

  const handleViewSubcategories = (category) => {
    setSelectedCategory(category);
    setViewSubcategoriesOpen(true);
  };

  const handleDeleteCategory = (category) => {
    const updatedCategories = categories.filter(cat => cat.id !== category.id);
    setCategories(updatedCategories);
    toast.success('Category deleted successfully');
  };

  const handleDownloadData = (category) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(`${categoryOptions.find(opt => opt.value === category.category)?.label} Details`, 14, 15);

    // Add category details
    doc.setFontSize(12);
    doc.text(`Category Details:`, 14, 25);
    doc.text(`Fabric Color: ${category.fabricColor}`, 14, 35);
    doc.text(`Roll Size: ${category.rollSize}`, 14, 45);
    doc.text(`GSM: ${category.gsm}`, 14, 55);
    doc.text(`Fabric Quality: ${category.fabricQuality}`, 14, 65);
    doc.text(`Quantity: ${category.quantity} kg`, 14, 75);

    // Add subcategories table
    if (category.subcategories?.length > 0) {
      doc.text('Subcategories:', 14, 90);
      
      const tableColumn = ["Fabric Color", "Roll Size", "GSM", "Fabric Quality", "Quantity (kg)"];
      const tableRows = category.subcategories.map(sub => [
        sub.fabricColor,
        sub.rollSize,
        sub.gsm,
        sub.fabricQuality,
        sub.quantity
      ]);

      doc.autoTable({
        startY: 95,
        head: [tableColumn],
        body: tableRows,
      });
    }

    doc.save(`${category.category}-details.pdf`);
    toast.success('Data downloaded successfully');
  };

  const handleAddNewSubcategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map(cat => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          subcategories: [...(cat.subcategories || []), { ...newSubcategory, id: Date.now() }]
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setSelectedCategory(updatedCategories.find(cat => cat.id === selectedCategory.id));
    setNewSubcategory({
      fabricColor: '',
      rollSize: '',
      gsm: '',
      fabricQuality: '',
      quantity: '',
    });
    setAddSubcategoryDialogOpen(false);
    toast.success('Subcategory added successfully');
  };

  const renderAddCategoryDialog = () => (
    <Dialog
      open={formOpen}
      onClose={() => setFormOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newCategory.category}
                label="Category"
                onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabric Color"
              fullWidth
              value={newCategory.fabricColor}
              onChange={(e) => setNewCategory({ ...newCategory, fabricColor: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll Size"
              fullWidth
              value={newCategory.rollSize}
              onChange={(e) => setNewCategory({ ...newCategory, rollSize: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="GSM"
              fullWidth
              type="number"
              value={newCategory.gsm}
              onChange={(e) => setNewCategory({ ...newCategory, gsm: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabric Quality"
              fullWidth
              value={newCategory.fabricQuality}
              onChange={(e) => setNewCategory({ ...newCategory, fabricQuality: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity (kg)"
              fullWidth
              type="number"
              value={newCategory.quantity}
              onChange={(e) => setNewCategory({ ...newCategory, quantity: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setFormOpen(false)}>Cancel</Button>
        <Button onClick={handleAddCategory} variant="contained" color="primary">
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderActions = (category) => (
    <>
      <IconButton size="small" color="primary">
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={() => handleDeleteCategory(category)}
      >
        <Delete />
      </IconButton>
      <IconButton 
        size="small" 
        color="primary"
        onClick={() => handleViewSubcategories(category)}
      >
        <Visibility />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleDownloadData(category)}
      >
        <GetApp />
      </IconButton>
    </>
  );

  const renderViewSubcategoriesDialog = () => (
    <Dialog
      open={viewSubcategoriesOpen}
      onClose={() => setViewSubcategoriesOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>
            {categoryOptions.find(opt => opt.value === selectedCategory?.category)?.label} - Subcategories
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setAddSubcategoryDialogOpen(true)}
          >
            Add Subcategory
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fabric Color</TableCell>
                <TableCell>Roll Size</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Fabric Quality</TableCell>
                <TableCell>Quantity (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCategory?.subcategories?.map((subcategory, index) => (
                <TableRow key={index}>
                  <TableCell>{subcategory.fabricColor}</TableCell>
                  <TableCell>{subcategory.rollSize}</TableCell>
                  <TableCell>{subcategory.gsm}</TableCell>
                  <TableCell>{subcategory.fabricQuality}</TableCell>
                  <TableCell>{subcategory.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewSubcategoriesOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  const renderAddSubcategoryDialog = () => (
    <Dialog
      open={addSubcategoryDialogOpen}
      onClose={() => setAddSubcategoryDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New Subcategory</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Fabric Color"
              fullWidth
              value={newSubcategory.fabricColor}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, fabricColor: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll Size"
              fullWidth
              value={newSubcategory.rollSize}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, rollSize: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="GSM"
              type="number"
              fullWidth
              value={newSubcategory.gsm}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, gsm: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabric Quality"
              fullWidth
              value={newSubcategory.fabricQuality}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, fabricQuality: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity (kg)"
              type="number"
              fullWidth
              value={newSubcategory.quantity}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, quantity: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddSubcategoryDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleAddNewSubcategory} variant="contained" color="primary">
          Add Subcategory
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Card>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Raw Materials</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Add Category
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Fabric Color</TableCell>
                <TableCell>Roll Size</TableCell>
                <TableCell>GSM</TableCell>
                <TableCell>Fabric Quality</TableCell>
                <TableCell>Quantity (kg)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{categoryOptions.find(opt => opt.value === category.category)?.label}</TableCell>
                  <TableCell>{category.fabricColor}</TableCell>
                  <TableCell>{category.rollSize}</TableCell>
                  <TableCell>{category.gsm}</TableCell>
                  <TableCell>{category.fabricQuality}</TableCell>
                  <TableCell>{category.quantity}</TableCell>
                  <TableCell>
                    {renderActions(category)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {renderAddCategoryDialog()}
      {renderViewSubcategoriesDialog()}
      {renderAddSubcategoryDialog()}
    </>
  );
}