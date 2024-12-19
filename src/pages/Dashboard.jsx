import { Grid } from '@mui/material';
import SummaryCard from '../components/dashboard/SummaryCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivities from '../components/dashboard/RecentActivities';

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Sales"
          value="$15,350"
          increase="+12%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Active Orders"
          value="125"
          increase="+5%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Pending Deliveries"
          value="48"
          increase="-2%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          title="Total Users"
          value="1,250"
          increase="+8%"
          color="info"
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