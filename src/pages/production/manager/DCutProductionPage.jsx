import { Engineering } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import ProductionTable from '../../../components/production/manager/ProductionTable';

export default function DCutProductionPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Engineering fontSize="large" color="primary" />
        <Typography variant="h4">D-Cut Production Dashboard</Typography>
      </Box>
      <ProductionTable type="D-Cut" />
    </Box>
  );
}