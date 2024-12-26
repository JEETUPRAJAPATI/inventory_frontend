export const menuConfigs = {
  admin: [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'Dashboard' },
    {
      title: 'Sales',
      path: '/admin/sales',
      icon: 'ShoppingCart'
    },
    {
      title: 'Production',
      path: '/admin/production',
      icon: 'Factory',
      subMenu: [
        {
          title: 'W-Cut',
          items: [
            { title: 'Flexo Printing', path: '/admin/production/w-cut/flexo' },
            { title: 'Bag Making', path: '/admin/production/w-cut/bag-making' }
          ]
        },
        {
          title: 'D-Cut',
          items: [
            { title: 'Bag Making', path: '/admin/production/d-cut/bag-making' },
            { title: 'Opsert Printing', path: '/admin/production/d-cut/opsert' }
          ]
        }
      ]
    },
    {
      title: 'Delivery',
      path: '/admin/delivery',
      icon: 'LocalShipping'
    },
    { title: 'User Management', path: '/admin/users', icon: 'People' },
    { title: 'Settings', path: '/admin/settings', icon: 'Settings' },
    { title: 'Reports', path: '/admin/reports', icon: 'Assessment' }
  ],
  sales: [
    { title: 'Dashboard', path: '/sales/dashboard', icon: 'Dashboard' },
    { title: 'Orders', path: '/sales/orders', icon: 'ShoppingCart' },
    { title: 'Reports', path: '/sales/reports', icon: 'Assessment' }
  ],
  delivery: [
    { title: 'Dashboard', path: '/delivery/dashboard', icon: 'Dashboard' },
    { title: 'Deliveries', path: '/delivery/deliveries', icon: 'LocalShipping' },
    { title: 'Invoices', path: '/delivery/invoices', icon: 'Receipt' },
    { title: 'Packaging', path: '/delivery/packaging', icon: 'Inventory' },
    { title: 'Delivery Logs', path: '/delivery/logs', icon: 'History' },
    { title: 'Reports', path: '/delivery/reports', icon: 'Assessment' }
  ],
  flexo_printing: [
    { title: 'Dashboard', path: '/production/flexo/dashboard', icon: 'Dashboard' },
    { title: 'Reports', path: '/production/flexo/reports', icon: 'Assessment' }
  ],
  bag_making: [
    { title: 'Dashboard', path: '/production/bagmaking/dashboard', icon: 'Dashboard' },
    { title: 'Reports', path: '/production/bagmaking/reports', icon: 'Assessment' }
  ],
  opsert_printing: [
    { title: 'Dashboard', path: '/production/opsert/dashboard', icon: 'Dashboard' },
    { title: 'Reports', path: '/production/opsert/reports', icon: 'Assessment' }
  ]
};