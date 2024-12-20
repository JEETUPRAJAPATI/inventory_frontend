import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRoleBasedRoute, getRolePermissions } from '../utils/roleUtils';

export default function PrivateRoute({ children, requiredPermissions = [] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userPermissions = getRolePermissions(user.role);
  const hasAccess = 
    userPermissions.includes('all') || 
    requiredPermissions.length === 0 ||
    requiredPermissions.some(permission => userPermissions.includes(permission));

  if (!hasAccess) {
    return <Navigate to={getRoleBasedRoute(user.role)} replace />;
  }

  return children;
}