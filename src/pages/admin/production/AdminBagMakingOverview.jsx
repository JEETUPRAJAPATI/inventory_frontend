import { Grid } from '@mui/material';
import SummaryCard from '../../../components/dashboard/SummaryCard';
import BagMakingOrderList from '../../production/components/BagMakingOrderList';

export default function AdminBagMakingOverview({ type }) {
  const bagType = type === 'wcut' ? 'W-Cut' : 'D-Cut';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title={`${bagType} Orders`}
          value="186"
          increase="+8%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="In Progress"
          value="34"
          increase="+12%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Completed Today"
          value="22"
          increase="+5%"
          color="success"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryCard
          title="Efficiency Rate"
          value="88%"
          increase="+3%"
          color="info"
        />
      </Grid>
      <Grid item xs={12}>
        <BagMakingOrderList bagType={type} adminView />
      </Grid>
    </Grid>
  );
}