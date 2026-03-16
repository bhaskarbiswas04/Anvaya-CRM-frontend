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

  // Skeleton Loading UI
  if (loading) {
    return (
      <ScreensLayout>
        <div className="p-4 bg-light min-vh-100">
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>
            <h2 className="text-center my-3">CRM Dashboard</h2>

            {/* Stats Skeleton */}
            <div className="row g-3 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="col">
                  <div
                    className="skeleton"
                    style={{ height: "100px", borderRadius: "8px" }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Filters Skeleton */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: "38px", width: "120px" }}
                ></div>
              ))}
            </div>
          </div>
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
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
            <QuickFilters filter={filter} setFilter={setFilter} />

            <AddLeadButton className="align-self-md-start" />
          </div>

          {/* Recent Leads */}
          <LeadPreview leads={filteredLeads} filter={filter} />
        </div>
      </div>
    </ScreensLayout>
  );
}
