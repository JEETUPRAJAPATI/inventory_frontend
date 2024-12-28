import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For production role, check operator type
  if (requiredRole === 'production' && user?.registrationType === 'production') {
    return children;
  }

  // For other roles, check registration type
  if (requiredRole && user?.registrationType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}