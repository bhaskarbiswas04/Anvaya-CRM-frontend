import { useState } from "react";
import { useLeads } from "../context/LeadContext";

import ScreensLayout from "../layouts/ScreensLayout";
import LeadPreview from "../components/dashboard-screen/LeadPreview";
import LeadStats from "../components/dashboard-screen/LeadStats";
import QuickFilters from "../components/dashboard-screen/QuickFilters";
import AddLeadButton from "../components/dashboard-screen/AddLeadButton";

export default function DashboardPage() {
  const { leads, loading } = useLeads();

  const [filter, setFilter] = useState("");

  if (loading) {
    return (
      <ScreensLayout>
        <div className="p-4">
          <h3>Loading Leads...</h3>
        </div>
      </ScreensLayout>
    );
  }

  const filteredLeads = filter
    ? leads.filter((l) => l.status === filter)
    : leads;

  return (
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
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
      </div>
    </ScreensLayout>
  );
}