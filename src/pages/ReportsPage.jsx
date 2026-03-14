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
  const closedLeads = leads.filter((l) => l.status === "Closed").length;
  const pipelineLeads = leads.length - closedLeads;

  const pipelineData = {
    labels: ["Closed", "In Pipeline"],
    datasets: [
      {
        data: [closedLeads, pipelineLeads],
        backgroundColor: ["#10B981", "#3B82F6"],
      },
    ],
  };

  // Leads Closed by Sales Agent
  const agentMap = {};

  leads.forEach((lead) => {
    const agentName = lead.salesAgent?.name || "Unassigned";

    if (!agentMap[agentName]) {
      agentMap[agentName] = 0;
    }

    if (lead.status === "Closed") {
      agentMap[agentName] += 1;
    }
  });

  const agents = Object.keys(agentMap);
  const agentCounts = Object.values(agentMap);

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
          "#00FFFF",
          "#198754",
          "#6c757d",
          "#0d6efd",
          "#ffc107",
        ],
      },
    ],
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        <h3 className="mb-4 text-center">Anvaya CRM Reports</h3>

        <div className="row g-4 justify-content-center">
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