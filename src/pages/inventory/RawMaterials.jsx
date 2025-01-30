import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  GetApp,
  QrCode,
} from "@mui/icons-material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import authService from "../../services/authService";
import QRCodeDialog from "../../components/sales/orders/QRCodeDialog";

const categoryOptions = [
  { value: "fabric", label: "Fabric" },
  { value: "handle", label: "Handle" },
  { value: "thread", label: "Thread" },
  { value: "dye", label: "Dye" },
];

export default function RawMaterials() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedQrOrder, setSelectedQrOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewSubcategoriesOpen, setViewSubcategoriesOpen] = useState(false);
  const [addSubcategoryDialogOpen, setAddSubcategoryDialogOpen] =
    useState(false);
  const [newCategory, setNewCategory] = useState({
    category: "",
    fabricColor: "",
    rollSize: "",
    gsm: "",
    fabricQuality: "",
    quantity: "",
  });
  const [newSubcategory, setNewSubcategory] = useState({
    fabricColor: "",
    rollSize: "",
    gsm: "",
    fabricQuality: "",
    quantity: "",
  });

  //  Add Category
  const handleAddCategory = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      const response = await axios.post(
        `${API_BASE_URL}/inventory/raw-material`,
        {
          category_name: newCategory.category,
          fabric_quality: newCategory.fabricQuality,
          roll_size: newCategory.rollSize,
          gsm: newCategory.gsm,
          fabric_color: newCategory.fabricColor,
          quantity_kgs: newCategory.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Category created response:", response.data);

      setNewCategory({
        category: "",
        fabricColor: "",
        rollSize: "",
        gsm: "",
        fabricQuality: "",
        quantity: "",
      });

      setFormOpen(false);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      const response = await axios.get(
        `${API_BASE_URL}/inventory/raw-materials`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetched categories:", response);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (category) => {
    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }

      // Send DELETE request to backend
      await axios.delete(
        `${API_BASE_URL}/inventory/raw-material/${category?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewSubcategories = (category) => {
    setSelectedCategory(category);
    setViewSubcategoriesOpen(true);
  };

  // Download category pdf file
  const handleDownloadData = (category) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text(
      `${
        categoryOptions.find((opt) => opt.value === category.category_name)
          ?.label
      } Details`,
      14,
      15
    );

    // Add category details
    doc.setFontSize(12);
    doc.text(`Category Details:`, 14, 25);
    doc.text(`Fabric Color: ${category.fabric_color}`, 14, 35);
    doc.text(`Roll Size: ${category.roll_size}`, 14, 45);
    doc.text(`GSM: ${category.gsm}`, 14, 55);
    doc.text(`Fabric Quality: ${category.fabric_quality}`, 14, 65);
    doc.text(`Quantity: ${category.quantity_kgs} kg`, 14, 75);

    // Add subcategories table
    if (category.subcategories?.length > 0) {
      doc.text("Subcategories:", 14, 90);

      const tableColumn = [
        "Fabric Color",
        "Roll Size",
        "GSM",
        "Fabric Quality",
        "Quantity (kg)",
      ];
      const tableRows = category.subcategories.map((sub) => [
        sub.fabricColor,
        sub.rollSize,
        sub.gsm,
        sub.fabricQuality,
        sub.quantity,
      ]);

      doc.autoTable({
        startY: 95,
        head: [tableColumn],
        body: tableRows,
      });
    }

    doc.save(`${category.category_name}-details.pdf`);
    toast.success("Data downloaded successfully");
  };

  // add sub category
  const handleAddNewSubcategory = async () => {
    console.log("selected category : ", selectedCategory);
    if (!selectedCategory) {
      toast.error("Please select a category before adding a subcategory.");
      return;
    }

    // Ensure all required fields are filled
    if (
      !newSubcategory.fabricColor ||
      !newSubcategory.rollSize ||
      !newSubcategory.gsm ||
      !newSubcategory.fabricQuality ||
      !newSubcategory.quantity
    ) {
      toast.error("All fields are required to add a subcategory.");
      return;
    }

    try {
      const token = authService.getToken();
      if (!token) {
        toast.error("Unauthorized: Please log in.");
        throw new Error("Unauthorized: No token provided");
      }

      // Attach category ID to subcategory data
      const requestData = {
        ...newSubcategory,
        category: selectedCategory._id,
      };

      // Send POST request to add subcategory
      const response = await axios.post(
        `${API_BASE_URL}/inventory/raw-material/sub-category`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Subcategory created response:", response);
      toast.success("Subcategory added successfully");

      // Update UI: Add new subcategory to state
      setSubCategories((prev) => [...prev, response.data.data]);

      // Reset form fields after successful submission
      setNewSubcategory({
        fabricColor: "",
        rollSize: "",
        gsm: "",
        fabricQuality: "",
        quantity: "",
      });
      setAddSubcategoryDialogOpen(false);
    } catch (error) {
      console.error(" Error adding subcategory:", error);
    }
  };

  // fetch subcategories
  const fetchSubCategories = async () => {
    if (selectedCategory) {
      try {
        // Make GET request to fetch subcategories by categoryId
        const response = await axios.get(
          `${API_BASE_URL}/inventory/raw-material/sub-category/${selectedCategory?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authService.getToken()}`, // Make sure to add your token here
            },
          }
        );
        setSubCategories(response.data.data);
        console.log("subcat res : ", response);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [selectedCategory]);

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
                onChange={(e) =>
                  setNewCategory({ ...newCategory, category: e.target.value })
                }
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
              onChange={(e) =>
                setNewCategory({ ...newCategory, fabricColor: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll Size"
              fullWidth
              value={newCategory.rollSize}
              onChange={(e) =>
                setNewCategory({ ...newCategory, rollSize: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="GSM"
              fullWidth
              type="number"
              value={newCategory.gsm}
              onChange={(e) =>
                setNewCategory({ ...newCategory, gsm: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabric Quality"
              fullWidth
              value={newCategory.fabricQuality}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  fabricQuality: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity (kg)"
              fullWidth
              type="number"
              value={newCategory.quantity}
              onChange={(e) =>
                setNewCategory({ ...newCategory, quantity: e.target.value })
              }
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {
              categoryOptions.find(
                (opt) => opt.value === selectedCategory?.category
              )?.label
            }{" "}
            - Subcategories
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
                <TableCell>QR Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.map((subcategory, subIndex) => (
                <TableRow key={subIndex}>
                  <TableCell>{subcategory.fabricColor}</TableCell>
                  <TableCell>{subcategory.rollSize}</TableCell>
                  <TableCell>{subcategory.gsm}</TableCell>
                  <TableCell>{subcategory.fabricQuality}</TableCell>
                  <TableCell>{subcategory.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleShowQR(subcategory)}
                    >
                      <QrCode />
                    </IconButton>
                  </TableCell>
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
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  fabricColor: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll Size"
              fullWidth
              value={newSubcategory.rollSize}
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  rollSize: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="GSM"
              type="number"
              fullWidth
              value={newSubcategory.gsm}
              onChange={(e) =>
                setNewSubcategory({ ...newSubcategory, gsm: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fabric Quality"
              fullWidth
              value={newSubcategory.fabricQuality}
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  fabricQuality: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity (kg)"
              type="number"
              fullWidth
              value={newSubcategory.quantity}
              onChange={(e) =>
                setNewSubcategory({
                  ...newSubcategory,
                  quantity: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddSubcategoryDialogOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleAddNewSubcategory}
          variant="contained"
          color="primary"
        >
          Add Subcategory
        </Button>
      </DialogActions>
    </Dialog>
  );

  // handle qr open
  const handleShowQR = (order) => {
    setSelectedQrOrder(order);
    setQrDialogOpen(true);
  };

  return (
    <>
      <Card>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
              {categories?.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    {
                      categoryOptions.find(
                        (opt) => opt.value === category.category_name
                      )?.label
                    }
                  </TableCell>
                  <TableCell>{category.fabric_color}</TableCell>
                  <TableCell>{category.roll_size}</TableCell>
                  <TableCell>{category.gsm}</TableCell>
                  <TableCell>{category.fabric_quality}</TableCell>
                  <TableCell>{category.quantity_kgs}</TableCell>
                  <TableCell>{renderActions(category)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {renderAddCategoryDialog()}
      {renderViewSubcategoriesDialog()}
      {renderAddSubcategoryDialog()}
      <QRCodeDialog
        open={qrDialogOpen}
        onClose={() => setQrDialogOpen(false)}
        orderData={selectedQrOrder}
      />
    </>
  );
}
