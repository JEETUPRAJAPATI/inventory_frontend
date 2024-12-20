import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Typography
} from '@mui/material';
import {
  Dashboard,
  People,
  Settings,
  Assessment,
  ShoppingCart,
  Factory,
  LocalShipping,
  Security,
  Logout
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'User Management', icon: <People />, path: '/admin/users' },
  { text: 'Role Management', icon: <Security />, path: '/admin/roles' },
  { text: 'Sales', icon: <ShoppingCart />, path: '/admin/sales' },
  { text: 'Production', icon: <Factory />, path: '/admin/production' },
  { text: 'Delivery', icon: <LocalShipping />, path: '/admin/delivery' },
  { text: 'Reports', icon: <Assessment />, path: '/admin/reports' },
  { text: 'Settings', icon: <Settings />, path: '/admin/settings' },
];

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          {user?.role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}