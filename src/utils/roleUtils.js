export const getRoleBasedRoute = (registrationType, operatorType = null) => {
  // Handle production roles with operator types
  if (registrationType === 'production' && operatorType) {
    const operatorRoutes = {
      flexo_printing: '/production/flexo/dashboard',
      bag_making: '/production/bagmaking/dashboard',
      opsert_printing: '/production/opsert/dashboard'
    };
    return operatorRoutes[operatorType] || '/production/dashboard';
  }

  // Handle other roles
  const roleRoutes = {
    admin: '/admin/dashboard',
    sales: '/sales/dashboard',
    delivery: '/delivery/dashboard',
    production: '/production/dashboard'
  };

  return roleRoutes[registrationType] || '/login';
};