import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Circle } from '@mui/icons-material';

export default function MachineStatus({ status }) {
  const getStatusColor = (machineStatus) => {
    const colors = {
      running: 'success',
      idle: 'warning',
      maintenance: 'error',
      offline: 'default'
    };
    return colors[machineStatus] || 'default';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Machine Status
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Circle color={getStatusColor(status.state)} sx={{ mr: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                Current State:
              </Typography>
              <Chip 
                label={status.state.toUpperCase()} 
                color={getStatusColor(status.state)} 
                size="small" 
              />
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Last Maintenance: {status.lastMaintenance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Next Service: {status.nextService}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}