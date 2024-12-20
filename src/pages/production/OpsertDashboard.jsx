import { Grid } from '@mui/material';
import ProductionMetrics from './components/ProductionMetrics';
import MachineStatus from './components/MachineStatus';

const mockMetrics = {
  rate: '450 units/hr',
  rateChange: '+6%',
  quality: '99.1%',
  qualityChange: '+1.8%',
  efficiency: '94%',
  efficiencyChange: '+2%',
  downtime: '1.8 hrs',
  downtimeChange: '-20%'
};

const mockStatus = {
  state: 'running',
  lastMaintenance: '2024-02-03',
  nextService: '2024-03-03'
};

export default function OpsertDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProductionMetrics metrics={mockMetrics} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MachineStatus status={mockStatus} />
      </Grid>
    </Grid>
  );
}