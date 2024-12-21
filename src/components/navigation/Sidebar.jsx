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
} from '@mui/material';
import {
  Dashboard,
  People,
  Settings,
  Assessment,
  ShoppingCart,
  Factory,
  LocalShipping,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'User Management', icon: <People />, path: '/admin/users' },
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

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawer = (
    <Box>
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