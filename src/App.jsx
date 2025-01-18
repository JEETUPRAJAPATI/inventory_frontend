import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './layouts/AdminLayout';
import AdminRoutes from './pages/admin/AdminRoutes';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import ManagerDashboard from './pages/production/manager/ManagerDashboard';
import ManagerRoutes from './pages/production/manager/ManagerRoutes';

// Sales pages
import Sales from './pages/Sales';
import OrdersPage from './pages/sales/OrdersPage';

// Production pages
import FlexoDashboard from './pages/production/FlexoDashboard';
import OpsertDashboard from './pages/production/OpsertDashboard';
import BagMakingDashboard from './pages/production/BagMakingDashboard';
import FlexoReportsPage from './pages/production/reports/FlexoReportsPage';
import OpsertReportsPage from './pages/production/reports/OpsertReportsPage';
import BagMakingReportsPage from './pages/production/reports/BagMakingReportsPage';

// Inventory pages
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import RawMaterials from './pages/inventory/RawMaterials';
import FinishedProducts from './pages/inventory/FinishedProducts';
import PurchaseOrders from './pages/inventory/PurchaseOrders';
import PackagingManagement from './pages/inventory/PackagingManagement';
import DeliveryManagement from './pages/inventory/DeliveryManagement';
import InvoiceManagement from './pages/inventory/InvoiceManagement';

// Delivery pages
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryList from './pages/delivery/DeliveryList';

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Production Manager Routes */}
        <Route
          path="/production/manager/*"
          element={
            <PrivateRoute requiredRole="production_manager">
              <AdminLayout>
                <ManagerRoutes />
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
                  <Route path="flexo/dashboard" element={<FlexoDashboard />} />
                  <Route path="flexo/reports" element={<FlexoReportsPage />} />
                  <Route path="opsert/dashboard" element={<OpsertDashboard />} />
                  <Route path="opsert/reports" element={<OpsertReportsPage />} />
                  <Route path="wcut/bagmaking/dashboard" element={<BagMakingDashboard type="wcut" />} />
                  <Route path="wcut/bagmaking/reports" element={<BagMakingReportsPage type="wcut" />} />
                  <Route path="dcut/bagmaking/dashboard" element={<BagMakingDashboard type="dcut" />} />
                  <Route path="dcut/bagmaking/reports" element={<BagMakingReportsPage type="dcut" />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* Inventory Routes */}
        <Route
          path="/inventory/*"
          element={
            <PrivateRoute requiredRole="inventory">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<InventoryDashboard />} />
                  <Route path="raw-materials" element={<RawMaterials />} />
                  <Route path="finished-products" element={<FinishedProducts />} />
                  <Route path="purchase-orders" element={<PurchaseOrders />} />
                  <Route path="packaging" element={<PackagingManagement />} />
                  <Route path="delivery" element={<DeliveryManagement />} />
                  <Route path="invoices" element={<InvoiceManagement />} />
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
                  <Route path="dashboard" element={<DeliveryDashboard />} />
                  <Route path="list" element={<DeliveryList />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}