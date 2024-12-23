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
import { Edit, Delete, Add, Download } from '@mui/icons-material';
import ReportForm from '../components/reports/ReportForm';
import DeleteConfirmDialog from '../components/common/DeleteConfirmDialog';
import toast from 'react-hot-toast';

const mockReports = [
  {
    id: 1,
    title: 'Monthly Sales Report - January',
    dateRange: 'Jan 2024',
    status: 'completed',
    createdAt: '2024-01-31',
  },
  {
    id: 2,
    title: 'Monthly Sales Report - February',
    dateRange: 'Feb 2024',
    status: 'draft',
    createdAt: '2024-02-15',
  },
  {
    id: 3,
    title: 'Q1 Sales Analysis',
    dateRange: 'Jan 2024 - Mar 2024',
    status: 'in_progress',
    createdAt: '2024-02-20',
  }
];

export default function Reports() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedReport(null);
    setFormOpen(true);
  };

  const handleEdit = (report) => {
    setSelectedReport(report);
    setFormOpen(true);
  };

  const handleDelete = (report) => {
    setReportToDelete(report);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    toast.success(selectedReport ? 'Report updated successfully' : 'Report created successfully');
    setFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.success('Report deleted successfully');
    setDeleteDialogOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      draft: 'warning',
      in_progress: 'info',
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <Typography variant="h6">Reports</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Create Report
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date Range</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.dateRange}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      color={getStatusColor(report.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(report)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(report)}
                    >
                      <Delete />
                    </IconButton>
                    {report.status === 'completed' && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => toast.success('Report downloaded successfully')}
                      >
                        <Download />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <ReportForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        report={selectedReport}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Report"
        content="Are you sure you want to delete this report? This action cannot be undone."
      />
    </>
  );
}