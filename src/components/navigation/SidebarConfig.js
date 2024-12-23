// Menu configurations for different roles
export const menuConfigs = {
  admin: [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'Dashboard' },
    { title: 'User Management', path: '/admin/users', icon: 'People' },
    { title: 'Role Management', path: '/admin/roles', icon: 'Security' },
    { title: 'System Settings', path: '/admin/settings', icon: 'Settings' },
    { title: 'Reports', path: '/admin/reports', icon: 'Assessment' },
    { title: 'Sales', path: '/admin/sales', icon: 'ShoppingCart' },
    { title: 'Production', path: '/admin/production', icon: 'Factory' },
    { title: 'Delivery', path: '/admin/delivery', icon: 'LocalShipping' }
  ],
  sales: [
    { title: 'Dashboard', path: '/sales/dashboard', icon: 'Dashboard' },
    { title: 'Reports', path: '/sales/reports', icon: 'Assessment' }
  ],
  flexo_printing: [
    { title: 'Dashboard', path: '/production/flexo/dashboard', icon: 'Dashboard' },
    { title: 'Print Jobs', path: '/production/flexo/jobs', icon: 'Print' },
    { title: 'Job Tracking', path: '/production/flexo/tracking', icon: 'Timeline' },
    { title: 'Reports', path: '/production/flexo/reports', icon: 'Assessment' }
  ],
  bag_making: [
    { title: 'Dashboard', path: '/production/bagmaking/dashboard', icon: 'Dashboard' },
    { title: 'Production', path: '/production/bagmaking/production', icon: 'Factory' },
    { title: 'Quality Control', path: '/production/bagmaking/quality', icon: 'Assignment' },
    { title: 'Reports', path: '/production/bagmaking/reports', icon: 'Assessment' }
  ],
  opsert_printing: [
    { title: 'Dashboard', path: '/production/opsert/dashboard', icon: 'Dashboard' },
    { title: 'Print Jobs', path: '/production/opsert/jobs', icon: 'LocalPrintshop' },
    { title: 'Job Tracking', path: '/production/opsert/tracking', icon: 'Timeline' },
    { title: 'Reports', path: '/production/opsert/reports', icon: 'Assessment' }
  ],
  delivery: [
    { title: 'Dashboard', path: '/delivery/dashboard', icon: 'Dashboard' },
    { title: 'Reports', path: '/delivery/reports', icon: 'Assessment' }
  ]
};