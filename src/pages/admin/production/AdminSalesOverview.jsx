import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import SalesOrderList from '../../../components/admin/sales/SalesOrderList';

export default function AdminSalesOverview() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Sales"
          value="₹45,650"
          increase="+12%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending Orders"
          value="32"
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Orders"
          value="156"
          increase="+8%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Average Order Value"
          value="₹2,850"
          increase="+3%"
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <SalesOrderList adminView />
      </Grid>
    </Grid>
  );
}