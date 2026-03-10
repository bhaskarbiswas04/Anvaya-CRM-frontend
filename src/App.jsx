import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"
// import Leads from "./pages/Leads";
// import Sales from "./pages/Sales";
// import Agents from "./pages/Agents";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";

import LeadDetails from "./pages/LeadDetails";
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
      <Route path="/lead/:id" element={<LeadDetails />} />
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
