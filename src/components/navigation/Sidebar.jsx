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
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { menuConfigs } from './SidebarConfig';

const DRAWER_WIDTH = 240;

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getMenuItems = () => {
    if (!user?.registrationType) return [];
    
    // Handle production role with operator types
    if (user.registrationType === 'production' && user.operatorType) {
      const operatorMenus = {
        flexo_printing: menuConfigs.production.flexo_printing,
        w_cut_bagmaking: menuConfigs.production.w_cut_bagmaking,
        d_cut_bagmaking: menuConfigs.production.d_cut_bagmaking,
        opsert_printing: menuConfigs.production.opsert_printing
      };
      return operatorMenus[user.operatorType] || [];
    }
    
    // Return menu items for other roles
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
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {user?.registrationType?.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')} Dashboard
        </Typography>
      </Box>
      <List>
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
    </Drawer>
  );
}