import { useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onMenuClick={toggleSidebar} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Breadcrumbs />
          {children}
        </Box>
      </Box>
    </Box>
  );
}