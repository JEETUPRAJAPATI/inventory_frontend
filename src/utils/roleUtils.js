export const getRoleBasedRoute = (registrationType, operatorType = null) => {
  // Handle production roles with operator types
  if (registrationType === 'production' && operatorType) {
    switch (operatorType) {
      case 'flexo_printing':
        return '/production/flexo/dashboard';
      case 'w_cut_bagmaking':
        return '/production/wcut/bagmaking/dashboard';
      case 'd_cut_bagmaking':
        return '/production/dcut/bagmaking/dashboard';
      case 'opsert_printing':
        return '/production/opsert/dashboard';
      default:
        return '/production/dashboard';
    }
  }

  // Handle other roles
  const roleRoutes = {
    admin: '/admin/dashboard',
    sales: '/sales/dashboard',
    delivery: '/delivery/dashboard',
    production: '/production/dashboard',
    production_manager: '/production/manager/dashboard',
    inventory: '/inventory/dashboard'
  };

  return roleRoutes[registrationType] || '/login';
};