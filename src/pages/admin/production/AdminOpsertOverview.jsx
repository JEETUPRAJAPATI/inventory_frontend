import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import OpsertOrderList from '../../production/components/OpsertOrderList';

export default function AdminOpsertOverview() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Orders"
          value="156"
          increase="+7%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="In Progress"
          value="28"
          increase="+4%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Today"
          value="18"
          increase="+10%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Efficiency Rate"
          value="82%"
          increase="+1%"
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <OpsertOrderList adminView />
      </Grid>
    </Grid>
  );
}