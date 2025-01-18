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
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReportSummary from './components/ReportSummary';
import ReportTable from './components/ReportTable';
import ReportCharts from './components/ReportCharts';
import ReportFilters from './components/ReportFilters';
import { bagMakingOrders } from '../../../data/bagMakingData';

export default function BagMakingReportsPage({ type }) {
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
  const bagType = type === 'wcut' ? 'W-Cut' : 'D-Cut';
  const basePath = `/production/${type}/bagmaking/dashboard`;
  console.log('basePath', basePath);
  const handleBack = () => {
    const navigatePath = type ? basePath : '/production/bagmaking/dashboard';
    navigate(navigatePath);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ mt: 2, px: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ReportFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Grid>

          <Grid item xs={12}>
            <ReportSummary records={bagMakingOrders} />
          </Grid>

          <Grid item xs={12}>
            <ReportCharts records={bagMakingOrders} />
          </Grid>

          <Grid item xs={12}>
            <ReportTable records={bagMakingOrders} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}