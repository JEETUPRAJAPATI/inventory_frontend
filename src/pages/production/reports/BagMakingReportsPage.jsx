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

export default function BagMakingReportsPage() {
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
    navigate('/production/bagmaking/dashboard');
  };

  return (
    <Box sx={{ pb: 7 }}>
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
            Bag Making Reports
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
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
      </Container>
    </Box>
  );
}