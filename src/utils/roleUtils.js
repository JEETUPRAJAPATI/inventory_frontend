export const getRoleBasedRoute = (registrationType, bagType, operatorType = null) => {
  // Handle production roles
  if (registrationType === 'production') {
    if (bagType === 'w_cut') {
      if (operatorType === 'bag_making') {
        return '/production/wcut/bagmaking/dashboard';
      }
      return '/production/flexo/dashboard';
    }
    
    if (bagType === 'd_cut') {
      if (operatorType === 'bag_making') {
        return '/production/dcut/bagmaking/dashboard';
      }
      return '/production/opsert/dashboard';
    }
  }

  // Handle other roles
  const roleRoutes = {
    admin: '/admin/dashboard',
    sales: '/sales/dashboard',
    delivery: '/delivery/dashboard',
    production_manager: '/production/manager/dashboard',
    inventory: '/inventory/dashboard'
  };

  return roleRoutes[registrationType] || '/login';
};