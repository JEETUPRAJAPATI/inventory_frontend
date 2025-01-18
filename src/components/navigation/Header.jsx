import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  Button,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  Brightness4,
  Brightness7,
  Notifications,
  ExitToApp,
} from '@mui/icons-material';
import { useColorMode } from '../../contexts/ColorModeContext';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ onMenuClick }) {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getTitle = () => {
    const registrationType = user?.registrationType ? capitalizeWords(user.registrationType) : 'Production';
    const operatorType = user?.operatorType ? capitalizeWords(user.operatorType.replace('_', ' ')) : '';
    const bagTypeTitle = user?.bagType ? capitalizeWords(user.bagType.replace('_', ' ')) : '';
    return `${bagTypeTitle} ${operatorType} ${registrationType} Dashboard`.trim();
  };
  // Helper function to capitalize each word using inbuilt methods
  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        {/* Title - Hidden on mobile */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getTitle()}
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={toggleColorMode}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Button
              color="inherit"
              onClick={logout}
              startIcon={<ExitToApp />}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}