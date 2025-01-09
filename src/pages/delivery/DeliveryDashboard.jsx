import { Grid } from '@mui/material';
import SummaryCard from '../../components/dashboard/SummaryCard';
import DeliveryList from '../../components/delivery/DeliveryList';

export default function DeliveryDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Deliveries"
          value="234"
          increase="+10%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Pending"
          value="45"
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Completed"
          value="189"
          increase="+12%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <DeliveryList />
      </Grid>
    </Grid>
  );
}