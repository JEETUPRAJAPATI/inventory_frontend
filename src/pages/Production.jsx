import { Grid } from '@mui/material';
import SummaryCard from '../components/dashboard/SummaryCard';
import ProductionJobList from '../components/production/ProductionJobList';

export default function Production() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Active Production"
          value="24"
          increase="+5%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Completed Today"
          value="18"
          increase="+12%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <ProductionJobList />
      </Grid>
    </Grid>
  );
}