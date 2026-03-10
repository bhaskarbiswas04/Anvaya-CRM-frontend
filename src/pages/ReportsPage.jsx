import { useLeads } from "../context/LeadContext";
import Sidebar from "../layouts/Sidebar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function ReportsPage() {
  const { leads } = useLeads();

  // Closed vs Pipeline leads
  const closedLeads = leads.filter((l) => l.status === "closed").length;
  const pipelineLeads = leads.length - closedLeads;

  const pipelineData = {
    labels: ["Closed", "In Pipeline"],
    datasets: [
      {
        data: [closedLeads, pipelineLeads],
        backgroundColor: ["#198754", "#0d6efd"],
      },
    ],
  };

  // Leads by Sales Agent
  const agents = [...new Set(leads.map((l) => l.agent))];

  const agentCounts = agents.map(
    (agent) =>
      leads.filter((l) => l.agent === agent && l.status === "closed").length,
  );

  const agentData = {
    labels: agents,
    datasets: [
      {
        label: "Closed Leads",
        data: agentCounts,
        backgroundColor: "#0d6efd",
      },
    ],
  };

  // Status Distribution
  const statuses = [...new Set(leads.map((l) => l.status))];

  const statusCounts = statuses.map(
    (status) => leads.filter((l) => l.status === status).length,
  );

  const statusData = {
    labels: statuses,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: [
          "#198754",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
          "#6c757d",
        ],
      },
    ],
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        <h3 className="mb-4 text-center">Anvaya CRM Reports</h3>

        <div className="row g-4">
          {/* Closed vs Pipeline */}

          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3 shadow-sm h-100">
              <h6 className="text-center">Leads Closed vs Pipeline</h6>

              <Pie data={pipelineData} />
            </div>
          </div>

          {/* Leads by Agent */}

          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3 shadow-sm h-100">
              <h6 className="text-center">Leads Closed by Sales Agent</h6>

              <Bar data={agentData} />
            </div>
          </div>

          {/* Status Distribution */}

          <div className="col-lg-4 col-md-12 col-12">
            <div className="card p-3 shadow-sm h-100">
              <h6 className="text-center">Lead Status Distribution</h6>

              <Pie data={statusData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}