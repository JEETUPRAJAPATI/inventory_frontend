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
  Collapse,
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
    if (user.registrationType === 'production' && user.operatorType) {
      return menuConfigs[user.operatorType] || [];
    }
    return menuConfigs[user.registrationType] || [];
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const renderIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon /> : <Icons.Circle />;
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {user?.registrationType?.toUpperCase()}
          {user?.operatorType && ` - ${user.operatorType.replace('_', ' ').toUpperCase()}`}
        </Typography>
      </Box>
      <List>
        {getMenuItems().map((item) => (
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