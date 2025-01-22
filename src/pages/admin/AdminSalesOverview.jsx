import { useState } from 'react';
import { Grid } from '@mui/material';
import SummaryCard from '../../components/dashboard/SummaryCard';
import SalesOrderList from '../../components/admin/sales/SalesOrderList';
import { useAdminData } from '../../hooks/useAdminData';

export default function AdminSalesOverview() {
  const { data, loading, updateParams } = useAdminData('getSales');

  const handleFilterChange = (filters) => {
    updateParams(filters);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Sales"
          value={`₹${data.totalSales || 0}`}
          increase={data.salesGrowth}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending Orders"
          value={data.pendingOrders || 0}
          increase={data.ordersGrowth}
          color="warning"
        />
      </Grid>
      <Grid item xs={12}>
        <SalesOrderList data={data.orders} onFilterChange={handleFilterChange} />
      </Grid>
    </Grid>
  );
}