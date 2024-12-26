import { useState } from 'react';
import { Grid, Card, Button, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Add, Edit, Delete, Speed } from '@mui/icons-material';
import ProductionMetrics from './components/ProductionMetrics';
import MachineStatus from './components/MachineStatus';
import OpsertForm from '../../components/production/opsert/OpsertForm';
import MetricsForm from '../../components/production/metrics/MetricsForm';
import DeleteConfirmDialog from '../../components/common/DeleteConfirmDialog';
import { useOpsertRecords } from '../../hooks/useOpsertRecords';
import { useMetrics } from '../../hooks/useMetrics';
import { getStatusColor } from '../../utils/statusColors';
import toast from 'react-hot-toast';

// Default metrics for initial state and fallback
const defaultMetrics = {
  production: {
    rate: '450 units/hr',
    rateChange: '+6%',
    quality: '99.1%',
    qualityChange: '+1.8%',
    efficiency: '94%',
    efficiencyChange: '+2%',
    downtime: '1.8 hrs',
    downtimeChange: '-20%'
  },
  machine: {
    state: 'running',
    lastMaintenance: '2024-02-03',
    nextService: '2024-03-03'
  }
};

export default function OpsertDashboard() {
  const [formOpen, setFormOpen] = useState(false);
  const [metricsFormOpen, setMetricsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const { records, isLoading: recordsLoading, createRecord, updateRecord, deleteRecord } = useOpsertRecords();
  const { metrics, isLoading: metricsLoading, updateMetrics } = useMetrics('opsert');

  // Use default metrics if none are loaded
  const currentMetrics = metrics || defaultMetrics;

  const handleAdd = () => {
    setSelectedRecord(null);
    setFormOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormOpen(true);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedRecord) {
        await updateRecord(selectedRecord.id, formData);
        toast.success('Record updated successfully');
      } else {
        await createRecord(formData);
        toast.success('Record created successfully');
      }
      setFormOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleMetricsSubmit = async (metricsData) => {
    try {
      await updateMetrics(metricsData);
      toast.success('Metrics updated successfully');
      setMetricsFormOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRecord(recordToDelete.id);
      toast.success('Record deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (recordsLoading || metricsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 2 }}>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Production Metrics</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Speed />}
              onClick={() => setMetricsFormOpen(true)}
            >
              Update Metrics
            </Button>
          </div>
          <ProductionMetrics metrics={currentMetrics.production} />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <MachineStatus status={currentMetrics.machine} />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <div className="flex justify-between items-center p-4">
            <Typography variant="h6">Opsert Production Records</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Add Record
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Agent Name</TableCell>
                  <TableCell>Bag Type</TableCell>
                  <TableCell>Job Name</TableCell>

                  <TableCell>Print Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.agent_name}</TableCell>
                    <TableCell>{record.bag_type}</TableCell>
                    <TableCell>{record.jobName}</TableCell>
                    <TableCell>{record.print_type}</TableCell>
                    <TableCell>{record.quantity}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(record.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(record)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(record)}
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
      </Grid>

      <OpsertForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        record={selectedRecord}
      />

      <MetricsForm
        open={metricsFormOpen}
        onClose={() => setMetricsFormOpen(false)}
        onSubmit={handleMetricsSubmit}
        currentMetrics={currentMetrics}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Record"
        content="Are you sure you want to delete this record? This action cannot be undone."
      />
    </Grid>
  );
}