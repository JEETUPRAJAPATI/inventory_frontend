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
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const mockJobs = [
  {
    id: 1,
    name: 'Product A Production',
    status: 'In Progress',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
  },
  {
    id: 2,
    name: 'Product B Production',
    status: 'Pending',
    startDate: '2024-02-12',
    endDate: '2024-02-18',
  },
];

export default function ProductionJobList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDelete = (job) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'primary',
      'Pending': 'warning',
      'Completed': 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Card>
      <div className="flex justify-between items-center p-4">
        <Typography variant="h6">Production Jobs</Typography>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.name}</TableCell>
                <TableCell>
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{job.startDate}</TableCell>
                <TableCell>{job.endDate}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(job)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => setDeleteDialogOpen(false)}
        title="Delete Production Job"
        content="Are you sure you want to delete this production job? This action cannot be undone."
      />
    </Card>
  );
}