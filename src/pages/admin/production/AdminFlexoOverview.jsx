import { useState } from 'react';
import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import FlexoOrderList from '../../production/components/FlexoOrderList';
import VerifyOrderDialog from '../../production/components/VerifyOrderDialog';
import { useAdminData } from '../../../hooks/useAdminData';

export default function AdminFlexoOverview() {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });

  const { data, loading, updateParams } = useAdminData('getWCutFlexo', filters);

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

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
        <FlexoOrderList 
          orders={data.orders}
          onVerify={handleVerify}
          onFilterChange={handleFilterChange}
          filters={filters}
        />
      </Grid>

      <VerifyOrderDialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        order={selectedOrder}
      />
    </Grid>
  );
}