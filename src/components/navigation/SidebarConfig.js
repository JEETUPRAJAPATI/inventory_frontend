import {
  Dashboard,
  People,
  Settings,
  Assessment,
  ShoppingCart,
  Factory,
  LocalShipping,
  Security,
  Person,
  Print,
  Inventory,
  LocalPrintshop,
  Assignment,
  Schedule,
  QrCode,
  LocalMall,
  LocalOffer,
  Group,
  Timeline
} from '@mui/icons-material';

const menuConfigs = {
  admin: [
    { text: 'Dashboard', icon: Dashboard, path: '/admin/dashboard' },
    { text: 'User Management', icon: People, path: '/admin/users' },
    { text: 'Role Management', icon: Security, path: '/admin/roles' },
    { text: 'System Settings', icon: Settings, path: '/admin/settings' },
    { text: 'Reports', icon: Assessment, path: '/admin/reports' }
  ],
  
  sales: [
    { text: 'Dashboard', icon: Dashboard, path: '/sales/dashboard' },
    { text: 'Orders', icon: ShoppingCart, path: '/sales/orders' },
    { text: 'Customers', icon: Person, path: '/sales/customers' },
    { text: 'Agents', icon: Group, path: '/sales/agents' },
    { text: 'Reports', icon: Assessment, path: '/sales/reports' }
  ],
  
  flexo_printing: [
    { text: 'Dashboard', icon: Dashboard, path: '/production/flexo/dashboard' },
    { text: 'Print Jobs', icon: Print, path: '/production/flexo/jobs' },
    { text: 'Job Tracking', icon: Timeline, path: '/production/flexo/tracking' },
    { text: 'Reports', icon: Assessment, path: '/production/flexo/reports' }
  ],
  
  bag_making: [
    { text: 'Dashboard', icon: Dashboard, path: '/production/bagmaking/dashboard' },
    { text: 'Production', icon: Factory, path: '/production/bagmaking/production' },
    { text: 'Quality Control', icon: Assignment, path: '/production/bagmaking/quality' },
    { text: 'Progress', icon: Timeline, path: '/production/bagmaking/progress' }
  ],
  
  opsert_printing: [
    { text: 'Dashboard', icon: Dashboard, path: '/production/opsert/dashboard' },
    { text: 'Print Jobs', icon: LocalPrintshop, path: '/production/opsert/jobs' },
    { text: 'Job Tracking', icon: Timeline, path: '/production/opsert/tracking' },
    { text: 'Reports', icon: Assessment, path: '/production/opsert/reports' }
  ],
  
  delivery: [
    { text: 'Dashboard', icon: Dashboard, path: '/delivery/dashboard' },
    { text: 'Packaging', icon: Inventory, path: '/delivery/packaging' },
    { text: 'Deliveries', icon: LocalShipping, path: '/delivery/management' },
    { text: 'Delivery Logs', icon: Assignment, path: '/delivery/logs' }
  ]
};

export const getMenuItems = (registrationType, operatorType = null) => {
  if (registrationType === 'production' && operatorType) {
    return menuConfigs[operatorType] || [];
  }
  return menuConfigs[registrationType] || [];
};