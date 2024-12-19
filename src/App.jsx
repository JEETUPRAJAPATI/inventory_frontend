import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from './contexts/ColorModeContext';
import AdminLayout from './layouts/AdminLayout';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ColorModeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </ColorModeProvider>
  );
}