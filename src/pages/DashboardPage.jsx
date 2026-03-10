import { useState } from "react";
import { useLeads } from "../context/LeadContext";

import Sidebar from "../layouts/Sidebar";
import LeadPreview from "../components/dashboard-screen/LeadPreview";
import LeadStats from "../components/dashboard-screen/LeadStats";
import QuickFilters from "../components/dashboard-screen/QuickFilters";
import AddLeadButton from "../components/dashboard-screen/AddLeadButton";


export default function DashboardPage() {
  // Get leads from context
  const { leads } = useLeads();

  const [filter, setFilter] = useState("");

  const filteredLeads = filter
    ? leads.filter((l) => l.status === filter)
    : leads;

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light">
        <h2 className="text-center my-3">CRM Dashboard</h2>

        <LeadPreview leads={filteredLeads} />
        <LeadStats leads={leads} />
        <QuickFilters setFilter={setFilter} />
        <AddLeadButton />
      </main>
    </div>
  );
}