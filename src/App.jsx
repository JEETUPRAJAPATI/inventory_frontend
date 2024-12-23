import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from './contexts/ColorModeContext';
import AdminLayout from './layouts/AdminLayout';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Sales from './pages/Sales';
import Production from './pages/Production';
import Delivery from './pages/Delivery';
import FlexoDashboard from './pages/production/FlexoDashboard';
import BagMakingDashboard from './pages/production/BagMakingDashboard';
import OpsertDashboard from './pages/production/OpsertDashboard';
import Reports from './pages/Reports';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  return (
    <ColorModeProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="sales" element={<Sales />} />
                  <Route path="production" element={<Production />} />
                  <Route path="delivery" element={<Delivery />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Sales Routes */}
        <Route
          path="/sales/*"
          element={
            <PrivateRoute requiredRole="sales">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Sales />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Production Routes */}
        <Route
          path="/production/*"
          element={
            <PrivateRoute requiredRole="production">
              <AdminLayout>
                <Routes>
                  <Route path="flexo/*" element={<FlexoDashboard />} />
                  <Route path="bagmaking/*" element={<BagMakingDashboard />} />
                  <Route path="opsert/*" element={<OpsertDashboard />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Delivery Routes */}
        <Route
          path="/delivery/*"
          element={
            <PrivateRoute requiredRole="delivery">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Delivery />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </ColorModeProvider>
  );
}