import { Grid } from '@mui/material';
import OrderList from '../../components/sales/orders/OrderList';
import SummaryCard from '../../components/dashboard/SummaryCard';
import { useOrders } from '../../hooks/useOrders';

export default function OrdersPage() {
  const { orders } = useOrders();

  const getTotalOrders = () => orders.length;
  
  const getPendingOrders = () => 
    orders.filter(order => order.status === 'pending').length;
  
  const getCompletedOrders = () => 
    orders.filter(order => order.status === 'completed').length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Orders"
          value={getTotalOrders()}
          increase="+12%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Pending Orders"
          value={getPendingOrders()}
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Completed Orders"
          value={getCompletedOrders()}
          increase="+8%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <OrderList />
      </Grid>
    </Grid>
  );
}