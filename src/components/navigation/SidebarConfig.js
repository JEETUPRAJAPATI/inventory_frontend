export const menuConfigs = {
  admin: [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'Dashboard' },
    { title: 'User Management', path: '/admin/users', icon: 'People' },
    { title: 'Role Management', path: '/admin/roles', icon: 'Security' },
    { title: 'Sales', path: '/admin/sales', icon: 'ShoppingCart' },
    { title: 'flexo', path: '/admin/flexo', icon: 'Assessment' },
    { title: 'w-cut Bag Making', path: '/admin/wcut', icon: 'Assessment' },
    { title: 'd-cut Bag Making', path: '/admin/dcut', icon: 'Assessment' },
    { title: 'Opsert', path: '/admin/opsert', icon: 'Assessment' },
  ],

  production_manager: [
    { title: 'Dashboard', path: '/production/manager/dashboard', icon: 'Dashboard' },
    { title: 'Flexo Production', path: '/production/flexo/dashboard', icon: 'Engineering' },
    { title: 'W-Cut Production', path: '/production/wcut/bagmaking/dashboard', icon: 'Engineering' },
    { title: 'D-Cut Production', path: '/production/dcut/bagmaking/dashboard', icon: 'Engineering' },
    { title: 'Opsert Production', path: '/production/opsert/dashboard', icon: 'Engineering' },
    { title: 'Reports', path: '/production/reports', icon: 'Assessment' }
  ],

  production: {
    flexo_printing: [
      { title: 'Dashboard', path: '/production/flexo/dashboard', icon: 'Dashboard' },
      { title: 'Reports', path: '/production/flexo/reports', icon: 'Assessment' }
    ],
    opsert_printing: [
      { title: 'Dashboard', path: '/production/opsert/dashboard', icon: 'Dashboard' },
      { title: 'Reports', path: '/production/opsert/reports', icon: 'Assessment' }
    ],
    w_cut_bagmaking: [
      { title: 'Dashboard', path: '/production/wcut/bagmaking/dashboard', icon: 'Dashboard' },
      { title: 'Reports', path: '/production/bagmaking/reports', icon: 'Assessment' }
    ],
    d_cut_bagmaking: [
      { title: 'Dashboard', path: '/production/dcut/bagmaking/dashboard', icon: 'Dashboard' },
      { title: 'Reports', path: '/production/bagmaking/reports', icon: 'Assessment' }
    ]
  },

  inventory: [
    { title: 'Dashboard', path: '/inventory/dashboard', icon: 'Dashboard' },
    { title: 'Raw Materials', path: '/inventory/raw-materials', icon: 'Inventory' },
    { title: 'Finished Products', path: '/inventory/finished-products', icon: 'Category' },
    { title: 'Purchase Orders', path: '/inventory/purchase-orders', icon: 'ShoppingCart' },
    { title: 'Invoices', path: '/inventory/invoices', icon: 'Receipt' },
    { title: 'Packaging', path: '/inventory/packaging', icon: 'Inventory' },
    { title: 'Delivery', path: '/inventory/delivery', icon: 'LocalShipping' }
  ],

  sales: [
    { title: 'Dashboard', path: '/sales/dashboard', icon: 'Dashboard' },
    { title: 'Orders', path: '/sales/orders', icon: 'ShoppingCart' }
  ],

  delivery: [
    { title: 'Dashboard', path: '/delivery/dashboard', icon: 'Dashboard' },
    { title: 'Deliveries', path: '/delivery/list', icon: 'LocalShipping' },
    { title: 'Invoices', path: '/delivery/invoices', icon: 'Receipt' }
  ]
};