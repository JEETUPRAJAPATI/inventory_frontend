import { useState } from 'react';
import { Grid } from '@mui/material';
import ReportFilters from './components/ReportFilters';
import ReportSummary from './components/ReportSummary';
import ReportTable from './components/ReportTable';
import ReportCharts from './components/ReportCharts';
import { useFlexoRecords } from '../../../hooks/useFlexoRecords';
import { filterRecords } from '../../../utils/reportUtils';

export default function FlexoReportsPage() {
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

  if (isLoading) return <div>Loading...</div>;

  return (
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
  );
}