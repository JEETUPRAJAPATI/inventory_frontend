import { Grid } from '@mui/material';
import SummaryCard from '../components/dashboard/SummaryCard';
import DeliveryList from '../components/delivery/DeliveryList';

export default function Delivery() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Pending Deliveries"
          value="32"
          increase="-8%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Delivered Today"
          value="45"
          increase="+18%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <DeliveryList />
      </Grid>
    </Grid>
  );
}