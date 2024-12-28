import { Grid } from '@mui/material';
import SummaryCard from '../../../../components/dashboard/SummaryCard';

export default function DeliveryStats() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Deliveries"
          value="234"
          increase="+10%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending"
          value="45"
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="On the Way"
          value="28"
          increase="+15%"
          color="info"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed"
          value="189"
          increase="+12%"
          color="success"
        />
      </Grid>
    </Grid>
  );
}