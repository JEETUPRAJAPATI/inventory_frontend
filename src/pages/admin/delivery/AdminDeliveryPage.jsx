import { useState } from 'react';
import { Grid } from '@mui/material';
import DeliveryList from '../../../components/admin/delivery/DeliveryList';
import DeliveryStats from '../../../components/admin/delivery/DeliveryStats';
import { useAdminData } from '../../../hooks/useAdminData';

export default function AdminDeliveryPage() {
  const [filters, setFilters] = useState({
    delivery_status: '',
    date: ''
  });

  const { data, loading, updateParams } = useAdminData('getDeliveries', filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateParams(newFilters);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DeliveryStats stats={data.stats} />
      </Grid>
      <Grid item xs={12}>
        <DeliveryList 
          deliveries={data.deliveries} 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </Grid>
    </Grid>
  );
}