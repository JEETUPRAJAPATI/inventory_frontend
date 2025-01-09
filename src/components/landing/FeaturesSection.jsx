import { Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import {
  Inventory,
  Engineering,
  Receipt,
  LocalShipping,
  Security,
  Analytics,
} from '@mui/icons-material';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Inventory />,
      title: 'Inventory Management',
      description: 'Track raw materials and finished products in real-time with automated alerts.',
    },
    {
      icon: <Engineering />,
      title: 'Production Tracking',
      description: 'Monitor all stages of production with detailed progress tracking.',
    },
    {
      icon: <Receipt />,
      title: 'Invoice Generation',
      description: 'Automated invoice creation and management system.',
    },
    {
      icon: <LocalShipping />,
      title: 'Delivery Management',
      description: 'Streamline your delivery process with route optimization.',
    },
    {
      icon: <Security />,
      title: 'Quality Control',
      description: 'Maintain high standards with integrated quality control systems.',
    },
    {
      icon: <Analytics />,
      title: 'Analytics & Reports',
      description: 'Comprehensive reporting tools for data-driven decisions.',
    },
  ];

  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        Key Features
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center">
        Everything you need to manage your bag manufacturing business
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'primary.main',
                }}
              >
                {feature.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom align="center">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}