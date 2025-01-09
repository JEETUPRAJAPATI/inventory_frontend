import { Grid } from '@mui/material';
import SummaryCard from '../dashboard/SummaryCard';
import RecentOrders from '../sales/dashboard/RecentOrders';
import DeliveryList from '../delivery/DeliveryList';
import ProductionOverview from './ProductionOverview';
import InventoryOverview from './InventoryOverview';

export default function AdminDashboard() {
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
          title="Production Orders"
          value="156"
          increase="+8%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending Deliveries"
          value="32"
          increase="-5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Inventory Value"
          value="₹1,25,000"
          increase="+10%"
          color="info"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RecentOrders adminView />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProductionOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <DeliveryList adminView />
      </Grid>
      <Grid item xs={12} md={6}>
        <InventoryOverview />
      </Grid>
    </Grid>
  );
}