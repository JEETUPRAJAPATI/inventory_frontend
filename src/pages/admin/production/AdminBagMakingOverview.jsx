import { useState } from 'react';
import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import BagMakingOrderList from '../../production/components/BagMakingOrderList';
import { useAdminData } from '../../../hooks/useAdminData';

export default function AdminBagMakingOverview({ type }) {
  const [filters, setFilters] = useState({
    operator_name: '',
    quantity: ''
  });

  const endpoint = type === 'wcut' ? 'getWCutBagMaking' : 'getDCutBagMaking';
  const { data, loading, updateParams } = useAdminData(endpoint, filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateParams(newFilters);
  };

  const bagType = type === 'wcut' ? 'W-Cut' : 'D-Cut';

  if (loading) return <div>Loading...</div>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title={`${bagType} Orders`}
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
        <BagMakingOrderList 
          bagType={type}
          orders={data.orders}
          onFilterChange={handleFilterChange}
          filters={filters}
        />
      </Grid>
    </Grid>
  );
}