import { Routes, Route } from 'react-router-dom';
import ManagerDashboard from './ManagerDashboard';
import FlexoProductionPage from './FlexoProductionPage';
import WCutProductionPage from './WCutProductionPage';
import DCutProductionPage from './DCutProductionPage';
import OpsertProductionPage from './OpsertProductionPage';
import ReportsPage from './ReportsPage';

export default function ManagerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="flexo/dashboard" element={<FlexoProductionPage />} />
      <Route path="wcut/bagmaking/dashboard" element={<WCutProductionPage />} />
      <Route path="dcut/bagmaking/dashboard" element={<DCutProductionPage />} />
      <Route path="opsert/dashboard" element={<OpsertProductionPage />} />
      <Route path="reports" element={<ReportsPage />} />
    </Routes>
  );
}