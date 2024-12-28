import { useState } from 'react';
import { Grid } from '@mui/material';
import DeliveryListTable from '../../components/delivery/DeliveryList';
import DeliveryFilters from '../../components/delivery/DeliveryFilters';

export default function DeliveryList() {
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all'
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DeliveryFilters 
          filters={filters}
          onFilterChange={setFilters}
        />
      </Grid>
      <Grid item xs={12}>
        <DeliveryListTable filters={filters} />
      </Grid>
    </Grid>
  );
}