export const ROLES = {
  ADMIN: 'admin',
  SALES: 'sales',
  PRODUCTION: 'production',
  DELIVERY: 'delivery',
};

export const OPERATOR_TYPES = {
  FLEXO_PRINTING: 'flexo_printing',
  BAG_MAKING: 'bag_making',
  OPSERT_PRINTING: 'opsert_printing',
};

export const getRoleBasedRoute = (registrationType, operatorType = null) => {
  // Handle production roles with operator types
  if (registrationType === ROLES.PRODUCTION && operatorType) {
    switch (operatorType) {
      case OPERATOR_TYPES.FLEXO_PRINTING:
        return '/production/flexo/dashboard';
      case OPERATOR_TYPES.BAG_MAKING:
        return '/production/bagmaking/dashboard';
      case OPERATOR_TYPES.OPSERT_PRINTING:
        return '/production/opsert/dashboard';
      default:
        return '/production/dashboard';
    }
  }

  // Handle other roles
  switch (registrationType) {
    case ROLES.ADMIN:
      return '/admin/dashboard';
    case ROLES.SALES:
      return '/sales/dashboard';
    case ROLES.DELIVERY:
      return '/delivery/dashboard';
    case ROLES.PRODUCTION:
      return '/production/dashboard';
    default:
      return '/login';
  }
};

export const getRolePermissions = (registrationType, operatorType = null) => {
  const basePermissions = ['view_profile', 'edit_profile'];

  const rolePermissions = {
    [ROLES.ADMIN]: ['all'],
    [ROLES.SALES]: ['view_sales', 'create_order', 'edit_order', 'delete_order'],
    [ROLES.DELIVERY]: ['view_deliveries', 'update_delivery_status'],
    [ROLES.PRODUCTION]: ['view_production']
  };

  if (registrationType === ROLES.PRODUCTION && operatorType) {
    const operatorPermissions = [`manage_${operatorType}`];
    return [...basePermissions, ...rolePermissions[ROLES.PRODUCTION], ...operatorPermissions];
  }

  return [...basePermissions, ...(rolePermissions[registrationType] || [])];
};