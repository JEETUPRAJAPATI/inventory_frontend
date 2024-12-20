import { Grid } from '@mui/material';
import ProductionMetrics from './components/ProductionMetrics';
import MachineStatus from './components/MachineStatus';

const mockMetrics = {
  rate: '620 units/hr',
  rateChange: '+8%',
  quality: '97.8%',
  qualityChange: '+1.5%',
  efficiency: '89%',
  efficiencyChange: '+4%',
  downtime: '3.2 hrs',
  downtimeChange: '-10%'
};

const mockStatus = {
  state: 'running',
  lastMaintenance: '2024-02-05',
  nextService: '2024-03-05'
};

export default function BagMakingDashboard() {
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