import { useState } from 'react';
import { 
  Box, 
  Card, 
  Button, 
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Grid,
  Container,
  Divider
} from '@mui/material';
import { 
  Assessment, 
  ExitToApp, 
  Brightness4, 
  Brightness7,
  Dashboard
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../../contexts/ColorModeContext';
import { useAuth } from '../../hooks/useAuth';
import FlexoOrderList from './components/FlexoOrderList';
import VerifyOrderDialog from './components/VerifyOrderDialog';
import { mockFlexoOrders } from '../../data/mockData';

export default function FlexoDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { logout } = useAuth();
  const [activeStatus, setActiveStatus] = useState('pending');
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setVerifyDialogOpen(true);
  };

  const filteredOrders = mockFlexoOrders.filter(order => order.status === activeStatus);

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            W-Cut Box Bag PRODUCTION Dashboard
          </Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={logout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Dashboard />}
              onClick={() => navigate('/production/flexo/dashboard')}
              sx={{ height: '60px' }}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Assessment />}
              onClick={() => navigate('/production/flexo/reports')}
              sx={{ height: '60px' }}
            >
              Reports
            </Button>
          </Grid>
        </Grid>

        <Card sx={{ mb: 3 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Production Orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button
                  variant={activeStatus === 'pending' ? 'contained' : 'outlined'}
                  onClick={() => setActiveStatus('pending')}
                  fullWidth
                >
                  Pending
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant={activeStatus === 'in_progress' ? 'contained' : 'outlined'}
                  onClick={() => setActiveStatus('in_progress')}
                  fullWidth
                >
                  Active
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant={activeStatus === 'completed' ? 'contained' : 'outlined'}
                  onClick={() => setActiveStatus('completed')}
                  fullWidth
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>

        <FlexoOrderList 
          orders={filteredOrders}
          onVerify={handleVerify}
        />
      </Container>

      <VerifyOrderDialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
        order={selectedOrder}
      />
    </Box>
  );
}