import { useState } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReportSummary from './components/ReportSummary';
import ReportTable from './components/ReportTable';
import ReportCharts from './components/ReportCharts';
import ReportFilters from './components/ReportFilters';

// Mock data for Opsert reports
const mockOpsertRecords = [
  {
    id: 'OPS-001',
    order_id: 'PO-001',
    job_name: 'Premium D-Cut Bags',
    bag_type: 'D-Cut',
    quantity: 1000,
    status: 'completed',
    completion_date: '2024-02-20'
  },
  {
    id: 'OPS-002',
    order_id: 'PO-002',
    job_name: 'Eco Friendly D-Cut',
    bag_type: 'D-Cut',
    quantity: 2000,
    status: 'completed',
    completion_date: '2024-02-19'
  }
];

export default function OpsertReportsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateRange: 'monthly',
    startDate: '',
    endDate: '',
    status: 'all',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  const handleBack = () => {
    navigate('/production/opsert/dashboard');
  };
  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ReportFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ReportSummary records={mockOpsertRecords} />
          </Grid>

          <Grid item xs={12}>
            <ReportCharts records={mockOpsertRecords} />
          </Grid>

          <Grid item xs={12}>
            <ReportTable records={mockOpsertRecords} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}