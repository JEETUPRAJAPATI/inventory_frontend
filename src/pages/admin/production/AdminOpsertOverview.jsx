import { useState } from 'react';
import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import OpsertOrderList from '../../production/components/OpsertOrderList';
import { useAdminData } from '../../../hooks/useAdminData';

export default function AdminOpsertOverview() {
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });

  const { data, loading, updateParams } = useAdminData('getDCutOpsert', filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateParams(newFilters);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Orders"
          value={data.totalOrders || 0}
          increase={data.ordersGrowth}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="In Progress"
          value={data.inProgressOrders || 0}
          increase={data.progressGrowth}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Today"
          value={data.completedToday || 0}
          increase={data.completionGrowth}
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Efficiency Rate"
          value={`${data.efficiencyRate || 0}%`}
          increase={data.efficiencyGrowth}
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <OpsertOrderList 
          orders={data.orders}
          onFilterChange={handleFilterChange}
          filters={filters}
        />
      </Grid>
    </Grid>
  );
}