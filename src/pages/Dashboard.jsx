import { Grid, Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SummaryCard from '../components/dashboard/SummaryCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivities from '../components/dashboard/RecentActivities';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const theme = useTheme();
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          background: theme.palette.primary.main,
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            {getWelcomeMessage()}, {user?.fullName}
          </Typography>
          <Typography variant="subtitle1">
            Welcome to your {user?.registrationType} dashboard
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Sales"
            value="₹15,350"
            increase="+12%"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Active Orders"
            value="125"
            increase="+5%"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Pending Deliveries"
            value="48"
            increase="-2%"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Total Users"
            value="1,250"
            increase="+8%"
            color="info"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ChartCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentActivities />
        </Grid>
      </Grid>
    </>
  );
}