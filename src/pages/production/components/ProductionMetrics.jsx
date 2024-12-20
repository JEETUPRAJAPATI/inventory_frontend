import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';

export default function ProductionMetrics({ metrics }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Production Rate"
          value={metrics.rate}
          increase={metrics.rateChange}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Quality Score"
          value={metrics.quality}
          increase={metrics.qualityChange}
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Efficiency"
          value={metrics.efficiency}
          increase={metrics.efficiencyChange}
          color="info"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SummaryCard
          title="Downtime"
          value={metrics.downtime}
          increase={metrics.downtimeChange}
          color="warning"
        />
      </Grid>
    </Grid>
  );
}