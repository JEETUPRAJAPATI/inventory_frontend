import { useState } from 'react';
import { Grid } from '@mui/material';
import InvoiceList from '../../components/delivery/InvoiceList';
import SummaryCard from '../../components/dashboard/SummaryCard';

export default function InvoicesPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Invoices"
          value="125"
          increase="+12%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Amount"
          value="₹45,650"
          increase="+8%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Pending Payments"
          value="₹12,500"
          increase="-5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12}>
        <InvoiceList />
      </Grid>
    </Grid>
  );
}