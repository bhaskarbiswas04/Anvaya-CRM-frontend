import { useLeads } from "../context/LeadContext";

import ScreensLayout from "../layouts/ScreensLayout";
import PageLoader from "../components/ui/PageLoader";

import LeadStatusView from "../components/sales-screen/LeadStatusView";
import SalesAgentView from "../components/sales-screen/SalesAgentView";

export default function SalesPage() {
  const { loading } = useLeads();

  if (loading) {
    return (
      <ScreensLayout>
        <PageLoader text="Loading sales data..." />
      </ScreensLayout>
    );
  }

  return (
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
        <h2 className="mb-4 text-center">Sales Overview</h2>

        <div className="row g-4">
          <div className="col-lg-6 col-12">
            <LeadStatusView />
          </div>

          <div className="col-lg-6 col-12">
            <SalesAgentView />
          </div>
        </div>
      </div>
    </ScreensLayout>
  );
}