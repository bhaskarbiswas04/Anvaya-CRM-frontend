import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import DashboardPage from "./pages/DashboardPage"
import LeadDetailsPage from "./pages/LeadDetails";
import LeadListPage from "./pages/LeadListPage";
import AddLeadsPage from "./pages/AddLeadsPage";
import SalesAgentsPage from "./pages/SalesAgentsPage";
import AddAgentPage from "./pages/AddAgentPage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/leads/:id" element={<LeadDetailsPage />} />
      <Route path="/leads" element={<LeadListPage />} />
      <Route path="/add-lead" element={<AddLeadsPage />} />

      <Route path="/sales" element={<SalesPage />} />

      <Route path="/agents" element={<SalesAgentsPage />} />
      <Route path="/add-agent" element={<AddAgentPage />} />

      <Route path="/reports" element={<ReportsPage />} />

      {/* <Route path="/leads" element={<Leads />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}
