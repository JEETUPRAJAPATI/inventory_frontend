import { Grid } from '@mui/material';
import OrderList from '../../components/sales/orders/OrderList';
import SummaryCard from '../../components/dashboard/SummaryCard';
import { useOrders } from '../../hooks/useOrders';
import { useOrderMetrics } from '../../hooks/orders/useOrderMetrics';

export default function OrdersPage() {
  const { orders } = useOrders();
  const { totalOrders, pendingOrders, completedOrders, totalAmount } = useOrderMetrics(orders);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Orders"
          value={totalOrders}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Pending Orders"
          value={pendingOrders}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Orders"
          value={completedOrders}
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <OrderList />
      </Grid>
    </Grid>
  );
}