import { Typography, Grid, Paper, Box } from '@mui/material';
import { Timeline, Factory, Speed } from '@mui/icons-material';

export default function AboutSection() {
  const benefits = [
    {
      icon: <Timeline />,
      title: 'Streamlined Operations',
      description: 'Optimize your manufacturing process with real-time tracking and automated workflows.',
    },
    {
      icon: <Factory />,
      title: 'Enhanced Productivity',
      description: 'Increase output and reduce errors with our integrated production management system.',
    },
    {
      icon: <Speed />,
      title: 'Data-Driven Decisions',
      description: 'Make informed decisions with comprehensive analytics and reporting tools.',
    },
  ];

  return (
    <>
      <Typography variant="h3" component="h2" gutterBottom align="center">
        About Our Solution
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph align="center">
        Transforming bag manufacturing through innovative software solutions
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  mb: 2,
                }}
              >
                {benefit.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {benefit.title}
              </Typography>
              <Typography color="text.secondary">
                {benefit.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}