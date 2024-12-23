import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  Button,
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.registrationType?.toUpperCase()} Dashboard
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
}