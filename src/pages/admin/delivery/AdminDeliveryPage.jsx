import { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import DeliveryList from './components/DeliveryList';
import DeliveryStats from './components/DeliveryStats';

export default function AdminDeliveryPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DeliveryStats />
      </Grid>
      
      <Grid item xs={12}>
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <Button
            variant={activeTab === 'pending' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('pending')}
            size="large"
          >
            Pending Deliveries
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('completed')}
            size="large"
          >
            Completed Deliveries
          </Button>
        </Box>
        <DeliveryList status={activeTab} />
      </Grid>
    </Grid>
  );
}