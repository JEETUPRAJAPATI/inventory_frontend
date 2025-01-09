import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Circle } from '@mui/icons-material';

export default function MachineStatus({ status = {} }) {
  const getStatusColor = (machineStatus) => {
    const colors = {
      running: 'success',
      idle: 'warning',
      maintenance: 'error',
      offline: 'default'
    };
    return colors[machineStatus] || 'default';
  };

  const state = status.state || 'offline';
  const lastMaintenance = status.lastMaintenance || 'Not available';
  const nextService = status.nextService || 'Not scheduled';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Machine Status
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Circle color={getStatusColor(state)} sx={{ mr: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                Current State:
              </Typography>
              <Chip 
                label={state.toUpperCase()} 
                color={getStatusColor(state)} 
                size="small" 
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Last Maintenance: {lastMaintenance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Next Service: {nextService}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}