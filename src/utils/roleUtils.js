export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  SALES_MANAGER: 'Sales Manager',
  PRODUCTION_MANAGER: 'Production Manager',
  DELIVERY_MANAGER: 'Delivery Manager',
};

export const getRoleBasedRoute = (role) => {
  const routes = {
    [ROLES.SUPER_ADMIN]: '/admin/dashboard',
    [ROLES.SALES_MANAGER]: '/admin/sales',
    [ROLES.PRODUCTION_MANAGER]: '/admin/production',
    [ROLES.DELIVERY_MANAGER]: '/admin/delivery',
  };
  return routes[role] || '/admin/dashboard';
};

export const getRolePermissions = (role) => {
  const permissions = {
    [ROLES.SUPER_ADMIN]: ['all'],
    [ROLES.SALES_MANAGER]: ['sales', 'reports'],
    [ROLES.PRODUCTION_MANAGER]: ['production', 'reports'],
    [ROLES.DELIVERY_MANAGER]: ['delivery', 'reports'],
  };
  return permissions[role] || [];
};