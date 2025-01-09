import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 2,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)'
            : 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)',
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Streamline Your Bag Manufacturing
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Comprehensive software solution for inventory, production, invoice, and delivery management.
            Designed specifically for fabric bag manufacturers.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://plus.unsplash.com/premium_photo-1664202219863-da9af140d286?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaXZlcnklMjBiYWd8ZW58MHx8MHx8fDA%3D"
            alt="Manufacturing Software"
            sx={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              display: 'block',
              margin: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}