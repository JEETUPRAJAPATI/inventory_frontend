import { Box, Button } from '@mui/material';

export default function DeliveryStatusTabs({ activeStatus, onStatusChange }) {
  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
      <Button
        variant={activeStatus === 'pending' ? 'contained' : 'outlined'}
        onClick={() => onStatusChange('pending')}
      >
        Pending Deliveries
      </Button>
      <Button
        variant={activeStatus === 'delivered' ? 'contained' : 'outlined'}
        onClick={() => onStatusChange('delivered')}
      >
        Completed Deliveries
      </Button>
    </Box>
  );
}