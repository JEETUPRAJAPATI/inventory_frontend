import { useState } from 'react';
import {
  Grid,
  Card,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import FilterBar from '../../../components/common/FilterBar';
import { useAdminProduction } from '../../../hooks/useAdminProduction';
import SummaryCard from '../../../components/dashboard/SummaryCard';

export default function DCutOpsertPage() {
  const {
    data,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePagination
  } = useAdminProduction('d-cut', 'opsert');

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Orders"
          value={pagination.total}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending"
          value={data.filter(item => item.status === 'pending').length}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="In Progress"
          value={data.filter(item => item.status === 'in_progress').length}
          color="info"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed"
          value={data.filter(item => item.status === 'completed').length}
          color="success"
        />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              D-Cut Opsert Production Records
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
                      <TableCell>
                        <Chip
                          label={record.status.toUpperCase()}
                          color={
                            record.status === 'completed' ? 'success' :
                            record.status === 'in_progress' ? 'warning' :
                            'default'
                          }
                          size="small"
                        />
                      </TableCell>
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
      </Grid>
    </Grid>
  );
}