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
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="roles" element={<RoleManagement />} />
                      <Route path="sales" element={<Sales />} />
                      <Route path="production" element={<Production />} />
                      <Route path="delivery" element={<Delivery />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </ColorModeProvider>
      </AuthProvider>
    </Router>
  );
}