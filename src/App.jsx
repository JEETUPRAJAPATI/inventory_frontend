import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from './contexts/ColorModeContext';
import AdminLayout from './layouts/AdminLayout';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import LandingPage from './pages/LandingPage';
import Settings from './pages/Settings';
import Sales from './pages/Sales';
import OrdersPage from './pages/sales/OrdersPage';
import Production from './pages/Production';
import FlexoDashboard from './pages/production/FlexoDashboard';
import BagMakingDashboard from './pages/production/BagMakingDashboard';
import OpsertDashboard from './pages/production/OpsertDashboard';
import FlexoReportsPage from './pages/production/reports/FlexoReportsPage';
import OpsertReportsPage from './pages/production/reports/OpsertReportsPage';
import BagMakingReportsPage from './pages/production/reports/BagMakingReportsPage';
import Delivery from './pages/Delivery';
import DeliveryList from './components/delivery/DeliveryList';
import InvoiceList from './components/delivery/InvoiceList';
import PackagingList from './components/delivery/PackagingList';
import DeliveryLogs from './components/delivery/DeliveryLogs';
import AdminSalesPage from './pages/admin/sales/AdminSalesPage';
import AdminProductionPage from './pages/admin/production/AdminProductionPage';
import AdminDeliveryPage from './pages/admin/delivery/AdminDeliveryPage';
import Reports from './pages/Reports';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  return (
    <ColorModeProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Production Routes */}
        <Route
          path="/production/*"
          element={
            <PrivateRoute requiredRole="production">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Production />} />
                  <Route path="flexo/dashboard" element={<FlexoDashboard />} />
                  <Route path="flexo/reports" element={<FlexoReportsPage />} />
                  <Route path="bagmaking/dashboard" element={<BagMakingDashboard />} />
                  <Route path="bagmaking/reports" element={<BagMakingReportsPage />} />
                  <Route path="opsert/dashboard" element={<OpsertDashboard />} />
                  <Route path="opsert/reports" element={<OpsertReportsPage />} />
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
                  <Route path="orders" element={<OrdersPage />} />
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
                  <Route path="deliveries" element={<DeliveryList />} />
                  <Route path="invoices" element={<InvoiceList />} />
                  <Route path="packaging" element={<PackagingList />} />
                  <Route path="logs" element={<DeliveryLogs />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />

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
                  <Route path="reports" element={<Reports />} />

                  {/* Sales Routes */}
                  <Route path="sales/*" element={<AdminSalesPage />} />

                  {/* Production Routes */}
                  <Route path="production/w-cut/flexo" element={<AdminProductionPage />} />
                  <Route path="production/w-cut/bag-making" element={<AdminProductionPage />} />
                  <Route path="production/d-cut/opsert" element={<AdminProductionPage />} />
                  <Route path="production/d-cut/bag-making" element={<AdminProductionPage />} />

                  {/* Delivery Routes */}
                  <Route path="delivery/*" element={<AdminDeliveryPage />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </ColorModeProvider>
  );
}