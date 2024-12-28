import { Grid } from '@mui/material';
import SummaryCard from '../../dashboard/SummaryCard';

export default function ReportSummary({ data }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Stock Value"
          value={`₹${data.totalValue.toLocaleString()}`}
          increase={data.valueChange}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Total Items"
          value={data.totalItems}
          increase={data.itemsChange}
          color="info"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Low Stock Items"
          value={data.lowStockItems}
          increase={data.lowStockChange}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Purchase Orders"
          value={data.purchaseOrders}
          increase={data.ordersChange}
          color="success"
        />
      </Grid>
    </Grid>
  );
}