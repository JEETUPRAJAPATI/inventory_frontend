import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminSalesOverview from './production/AdminSalesOverview';
import AdminFlexoOverview from './production/AdminFlexoOverview';
import AdminBagMakingOverview from './production/AdminBagMakingOverview';
import AdminOpsertOverview from './production/AdminOpsertOverview';
import UserManagement from '../UserManagement';
import RoleManagement from '../RoleManagement';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="roles" element={<RoleManagement />} />
      <Route path="sales" element={<AdminSalesOverview />} />
      <Route path="flexo" element={<AdminFlexoOverview />} />
      <Route path="wcut" element={<AdminBagMakingOverview type="wcut" />} />
      <Route path="dcut" element={<AdminBagMakingOverview type="dcut" />} />
      <Route path="opsert" element={<AdminOpsertOverview />} />
    </Routes>
  );
}