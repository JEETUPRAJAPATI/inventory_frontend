import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import ProductionOverview from '../../../components/admin/ProductionOverview';
import InventoryOverview from '../../../components/admin/InventoryOverview';

export default function ManagerDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Production"
          value="156"
          increase="+8%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Active Orders"
          value="45"
          increase="+12%"
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
        <ProductionOverview />
      </Grid>
      <Grid item xs={12}>
        <InventoryOverview />
      </Grid>
    </Grid>
  );
}