import { Grid } from '@mui/material';
import SummaryCard from '../components/dashboard/SummaryCard';
import RecentOrders from '../components/sales/dashboard/RecentOrders';

export default function Sales() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Total Sales"
          value="₹45,650"
          increase="+15%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="New Orders"
          value="156"
          increase="+8%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <RecentOrders />
      </Grid>
    </Grid>
  );
}