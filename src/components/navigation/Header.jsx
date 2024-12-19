import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { Menu, Brightness4, Brightness7, Notifications } from '@mui/icons-material';
import { useColorMode } from '../../contexts/ColorModeContext';

export default function Header({ onMenuClick }) {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

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
          Admin Panel
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}