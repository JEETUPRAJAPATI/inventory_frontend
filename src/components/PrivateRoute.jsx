import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getRolePermissions } from '../utils/roleUtils';

export default function PrivateRoute({ children, requiredPermissions = [] }) {
  const { user, token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userPermissions = getRolePermissions(user.registrationType, user.operatorType);
  const hasAccess = 
    userPermissions.includes('all') || 
    requiredPermissions.length === 0 ||
    requiredPermissions.some(permission => userPermissions.includes(permission));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}