import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Button,
  Chip,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import UserForm from '../components/users/UserForm';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import { useAdminData } from '../hooks/useAdminData';
import adminService from '../services/adminService';
import toast from 'react-hot-toast';

export default function UserManagement() {

  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [loading, setLoading] = useState(false);

  // Fetch users based on filters
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(filters);
      console.log('Users response:', response); // Debug log
      setUsers(response?.data || []);
    } catch (error) {
      console.error('Error fetching users:', error); // Debug log
      toast.error('Error fetching users data');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to page 1 when filters change
    }));
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleEdit = async (userId) => {
    try {
      const user = await adminService.getUserById(userId);
      setSelectedUser(user);
      setFormOpen(true);
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminService.deleteUser(userToDelete._id); // Assuming _id is the unique identifier
      toast.success('User deleted successfully');
      setDeleteDialogOpen(false);
      fetchUsers(); // Refresh users list after delete operation
    } catch (error) {
      toast.error('Failed to delete user');
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await adminService.updateUser(selectedUser.data._id, formData);
        toast.success('User updated successfully');
      } else {
        await adminService.createUser(formData);
        toast.success('User added successfully');
      }
      setFormOpen(false);
      fetchUsers(); // Refresh users list after add or update operation
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add User
          </Button>
        </div>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            size="small"
            placeholder="Search..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
          />
          <TextField
            select
            size="small"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          <Button variant="outlined" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id || user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>
                    {user.registrationType.charAt(0).toUpperCase() +
                      user.registrationType.slice(1)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(user._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user)}
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

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        user={selectedUser}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        content="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
}
