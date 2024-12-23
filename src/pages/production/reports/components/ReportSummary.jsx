import { Grid } from '@mui/material';
import SummaryCard from '../../../../components/dashboard/SummaryCard';

export default function ReportSummary({ records }) {
  const getTotalProduction = () => records.length;
  
  const getCompletedProduction = () => 
    records.filter(record => record.status === 'completed').length;
  
  const getEfficiencyRate = () => {
    const completed = getCompletedProduction();
    const total = getTotalProduction();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Production"
          value={getTotalProduction()}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Completed"
          value={getCompletedProduction()}
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Efficiency Rate"
          value={`${getEfficiencyRate()}%`}
          color="info"
        />
      </Grid>
    </Grid>
  );
}