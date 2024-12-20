import { Grid } from '@mui/material';
import ProductionMetrics from './components/ProductionMetrics';
import MachineStatus from './components/MachineStatus';

const mockMetrics = {
  rate: '850 units/hr',
  rateChange: '+5%',
  quality: '98.5%',
  qualityChange: '+2%',
  efficiency: '92%',
  efficiencyChange: '+3%',
  downtime: '2.5 hrs',
  downtimeChange: '-15%'
};

const mockStatus = {
  state: 'running',
  lastMaintenance: '2024-02-01',
  nextService: '2024-03-01'
};

export default function FlexoDashboard() {
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