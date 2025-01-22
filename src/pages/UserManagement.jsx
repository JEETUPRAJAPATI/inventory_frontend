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
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import UserForm from '../components/users/UserForm';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import { useAdminData } from '../hooks/useAdminData';
import adminService from '../services/adminService';
import toast from 'react-hot-toast';

export default function UserManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { data, loading, updateParams, refetch } = useAdminData('getUsers', {
    page: page + 1,
    limit: rowsPerPage
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    updateParams({ page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    updateParams({ page: 1, limit: newRowsPerPage });
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
      refetch();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminService.deleteUser(userToDelete._id);
      toast.success('User deleted successfully');
      setDeleteDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;

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
              {data?.data?.map((user) => (
                <TableRow key={user.id}>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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