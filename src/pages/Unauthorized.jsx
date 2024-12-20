import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getRoleBasedRoute } from '../utils/roleUtils';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedirect = () => {
    const route = getRoleBasedRoute(user?.registrationType, user?.operatorType);
    navigate(route);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 3
      }}
    >
      <Typography variant="h4" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        You don't have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}