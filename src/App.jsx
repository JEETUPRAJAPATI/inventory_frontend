import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from './contexts/ColorModeContext';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Sales from './pages/Sales';
import Production from './pages/Production';
import Delivery from './pages/Delivery';
import Reports from './pages/Reports';
import RoleManagement from './pages/RoleManagement';
import PrivateRoute from './components/PrivateRoute';

// Production-specific dashboards
import FlexoDashboard from './pages/production/FlexoDashboard';
import BagMakingDashboard from './pages/production/BagMakingDashboard';
import OpsertDashboard from './pages/production/OpsertDashboard';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ColorModeProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="roles" element={<RoleManagement />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* Sales Routes */}
            <Route
              path="/sales/*"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Sales />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* Delivery Routes */}
            <Route
              path="/delivery/*"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Delivery />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* Production Routes */}
            <Route
              path="/production/*"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Production />} />
                      <Route path="flexo/dashboard" element={<FlexoDashboard />} />
                      <Route path="bagmaking/dashboard" element={<BagMakingDashboard />} />
                      <Route path="opsert/dashboard" element={<OpsertDashboard />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ColorModeProvider>
      </AuthProvider>
    </Router>
  );
}