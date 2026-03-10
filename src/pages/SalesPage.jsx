import { useState } from "react";
import Sidebar from "../layouts/Sidebar";

import LeadStatusView from "../components/sales-screen/LeadStatusView";
import SalesAgentView from "../components/sales-screen/SalesAgentView";

export default function SalesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex vh-100">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Mobile Toggle */}
        <button
          className="btn btn-dark d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h2 className="mb-4 text-center">Sales Overview</h2>

        <div className="row g-4">
          <div className="col-lg-6 col-12">
            <LeadStatusView />
          </div>

          <div className="col-lg-6 col-12">
            <SalesAgentView />
          </div>
        </div>
      </main>
    </div>
  );
}
