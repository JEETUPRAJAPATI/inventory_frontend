import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import FlexoOrderList from '../../production/components/FlexoOrderList';
import { mockFlexoOrders } from '../../../data/mockData';

export default function AdminFlexoOverview() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Orders"
          value="234"
          increase="+10%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="In Progress"
          value="45"
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Today"
          value="28"
          increase="+15%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Efficiency Rate"
          value="85%"
          increase="+2%"
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <FlexoOrderList orders={mockFlexoOrders} adminView />
      </Grid>
    </Grid>
  );
}