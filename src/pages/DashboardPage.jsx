import { useState } from "react";
import { useLeads } from "../context/LeadContext";

import Sidebar from "../layouts/Sidebar";
import LeadPreview from "../components/dashboard-screen/LeadPreview";
import LeadStats from "../components/dashboard-screen/LeadStats";
import QuickFilters from "../components/dashboard-screen/QuickFilters";
import AddLeadButton from "../components/dashboard-screen/AddLeadButton";

export default function DashboardPage() {
  const { leads, loading } = useLeads();

  const [filter, setFilter] = useState("");

  if (loading) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />

        <main className="flex-grow-1 p-4 bg-light">
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>
            <h3>Loading Leads...</h3>
          </div>
        </main>
      </div>
    );
  }

  const filteredLeads = filter
    ? leads.filter((l) => l.status === filter)
    : leads;

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light">
        {/* Fixed width container */}
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>
          <h2 className="text-center my-3">CRM Dashboard</h2>

          {/* Lead Stats */}
          <LeadStats leads={leads} />

          {/* Filters + Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <QuickFilters filter={filter} setFilter={setFilter} />
            <AddLeadButton />
          </div>

          {/* Recent Leads */}
          <LeadPreview leads={filteredLeads} filter={filter} />
        </div>
      </main>
    </div>
  );
}