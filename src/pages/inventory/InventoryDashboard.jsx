import { Grid } from '@mui/material';
import SummaryCard from '../../components/dashboard/SummaryCard';
import ChartCard from '../../components/dashboard/ChartCard';
import RecentActivities from '../../components/dashboard/RecentActivities';

export default function InventoryDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Total Stock Value"
          value="₹12,45,650"
          increase="+8%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Raw Materials"
          value="1,234 units"
          increase="+5%"
          color="info"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Finished Products"
          value="856 units"
          increase="+12%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Low Stock Items"
          value="23"
          increase="-15%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <ChartCard />
      </Grid>
      <Grid item xs={12} md={4}>
        <RecentActivities />
      </Grid>
    </Grid>
  );
}