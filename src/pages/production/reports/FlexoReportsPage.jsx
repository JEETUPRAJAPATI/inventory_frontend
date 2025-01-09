import { useState } from 'react';
import { 
  Grid, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Box,
  Container
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ReportFilters from './components/ReportFilters';
import ReportSummary from './components/ReportSummary';
import ReportTable from './components/ReportTable';
import ReportCharts from './components/ReportCharts';
import { useFlexoRecords } from '../../../hooks/useFlexoRecords';
import { filterRecords } from '../../../utils/reportUtils';

export default function FlexoReportsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    dateRange: 'monthly',
    startDate: '',
    endDate: '',
    status: 'all',
  });

  const { records, isLoading } = useFlexoRecords();
  const filteredRecords = filterRecords(records, filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBack = () => {
    navigate('/production/flexo/dashboard');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ pb: 7 }}>
      {/* Mobile App Bar with Back Button */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div">
            Flexo Reports
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ReportFilters filters={filters} onFilterChange={handleFilterChange} />
          </Grid>
          
          <Grid item xs={12}>
            <ReportSummary records={filteredRecords} />
          </Grid>

          <Grid item xs={12}>
            <ReportCharts records={filteredRecords} />
          </Grid>

          <Grid item xs={12}>
            <ReportTable records={filteredRecords} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}