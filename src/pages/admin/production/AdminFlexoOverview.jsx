import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import FlexoOrderList from '../../production/components/FlexoOrderList';
import { useState } from 'react';
import VerifyOrderDialog from '../../production/components/VerifyOrderDialog';

export default function AdminFlexoOverview() {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

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
        <FlexoOrderList 
          status="pending"
          onVerify={handleVerify}
        />
      </Grid>

      <VerifyOrderDialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        order={selectedOrder}
      />
    </Grid>
  );
}