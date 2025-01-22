import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import FilterBar from '../../common/FilterBar';
import { useAdminProduction } from '../../../hooks/useAdminProduction';

export default function ProductionList({ type, category }) {
  const {
    data,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePagination
  } = useAdminProduction(type, category);

  const handlePageChange = (event, newPage) => {
    updatePagination(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    updatePagination(1, parseInt(event.target.value, 10));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Production Records
        </Typography>

        <FilterBar
          filters={filters}
          onFilterChange={updateFilters}
          filterOptions={{
            status: ['pending', 'in_progress', 'completed']
          }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Job Name</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Completion Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.orderId}</TableCell>
                  <TableCell>{record.jobName}</TableCell>
                  <TableCell>{record.operator}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.startDate}</TableCell>
                  <TableCell>{record.completionDate || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page - 1}
          rowsPerPage={pagination.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Card>
  );
}