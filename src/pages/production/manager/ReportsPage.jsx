import { Assessment } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export default function ReportsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Assessment fontSize="large" color="primary" />
        <Typography variant="h4">Production Reports</Typography>
      </Box>
      <Typography variant="body1">
        Welcome to the Production Reports page. View comprehensive reports and analytics for all production operations.
      </Typography>
    </Box>
  );
}