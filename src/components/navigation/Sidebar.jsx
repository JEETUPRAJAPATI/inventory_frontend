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
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { menuConfigs } from './SidebarConfig';
import { useColorMode } from '../../contexts/ColorModeContext';
import { Brightness4, Brightness7, ExitToApp } from '@mui/icons-material';
import logo from '../../assets/logo.jpg';
const DRAWER_WIDTH = 240;

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleColorMode } = useColorMode();

  const getMenuItems = () => {
    const currentUser = user || {};

    if (!currentUser.registrationType) {
      console.warn('Missing registrationType or operatorType');
      return [];
    }

    if (user.registrationType === 'production') {
      const operatorMenus = {
        flexo_printing: menuConfigs.production.flexo_printing,
        opsert_printing: menuConfigs.production.opsert_printing,
        w_cut_bagmaking: menuConfigs.production.w_cut_bagmaking,
        d_cut_bagmaking: menuConfigs.production.d_cut_bagmaking,
      };

      if (user.operatorType === 'bag_making') {
        if (user.bagType === 'w_cut') {
          return operatorMenus.w_cut_bagmaking || [];
        }
        if (user.bagType === 'd_cut') {
          return operatorMenus.d_cut_bagmaking || [];
        }
      }
      return operatorMenus[user.operatorType] || [];
    }
    return menuConfigs[user.registrationType] || [];
  };

  const renderIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon /> : <Icons.Circle />;
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const menuItems = getMenuItems();

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
      {/* Logo and Company Name */}
      <Box
        sx={{
          p: 2,
          display: 'block', // Ensures block layout
          gap: 2,
          bgcolor: 'background.default', // Optional: Sets a theme-friendly background
          borderRadius: 1, // Optional: Adds a slight border radius for better visuals
        }}
      >
        <Box sx={{ display: 'block', alignItems: 'center', gap: 2, }}>
          <img src={logo} alt="Company Logo" style={{ height: '50px', objectFit: 'contain' }}
          />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.registrationType
              ?.split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}{' '}
            Dashboard
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Mobile-only controls at bottom */}
      {isMobile && (
        <>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={toggleColorMode}>
                <ListItemIcon>
                  {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </ListItemIcon>
                <ListItemText primary={`${theme.palette.mode === 'dark' ? 'Light' : 'Dark'} Mode`} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Drawer>
  );
}