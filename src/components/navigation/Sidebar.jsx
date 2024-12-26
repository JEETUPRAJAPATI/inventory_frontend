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
import { useState } from 'react';
import { menuConfigs } from './SidebarConfig';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
const DRAWER_WIDTH = 240;

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});
  const { user } = useAuth();

  const getMenuItems = () => {
    if (user.registrationType === 'production' && user.operatorType) {
      return menuConfigs[user.operatorType] || [];
    }
    return menuConfigs[user.registrationType] || [];
  };

  const handleNavigation = (path, hasSubMenu) => {
    if (!hasSubMenu) {
      navigate(path);
      if (isMobile) onClose();
    }
  };

  const handleMenuExpand = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  const renderIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon /> : <Icons.Circle />;
  };

  const renderSubMenu = (item) => {
    if (!item.subMenu) return null;

    return (
      <Collapse in={expandedMenus[item.title]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subMenu.map((subItem, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle2"
                sx={{ pl: 4, pt: 1, pb: 1, color: 'text.secondary' }}
              >
                {subItem.title}
              </Typography>
              {subItem.items.map((subMenuItem, subIndex) => (
                <ListItemButton
                  key={subIndex}
                  sx={{ pl: 6 }}
                  selected={location.pathname === subMenuItem.path}
                  onClick={() => handleNavigation(subMenuItem.path, false)}
                >
                  <ListItemText primary={subMenuItem.title} />
                </ListItemButton>
              ))}
            </Box>
          ))}
        </List>
      </Collapse>
    );
  };


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
       <Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {user?.registrationType?.toUpperCase()}
          </Typography>
        </Box>
        <List>
          {getMenuItems().map((item) => (
            <Box key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => item.subMenu
                    ? handleMenuExpand(item.title)
                    : handleNavigation(item.path, false)
                  }
                >
                  <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.subMenu && (
                    expandedMenus[item.title] ? <ExpandLess /> : <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              {renderSubMenu(item)}
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}