import { Grid } from '@mui/material';
import ChartCard from '../components/dashboard/ChartCard';

export default function Reports() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ChartCard />
      </Grid>
    </Grid>
  );
}