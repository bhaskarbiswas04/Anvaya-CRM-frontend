import { useLeads } from "../context/LeadContext";
import { useAgents } from "../context/AgentContext";
import ScreensLayout from "../layouts/ScreensLayout";

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
  const { agents } = useAgents();

  // Closed vs Pipeline
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

  // Leads Closed by Agent (Using Agents API)
  const agentDataMap = {};

  agents.forEach((agent) => {
    const agentName = agent.name;

    const closedCount = leads.filter(
      (lead) => lead.salesAgent?.name === agentName && lead.status === "Closed",
    ).length;

    agentDataMap[agentName] = closedCount;
  });

  const agentLabels = Object.keys(agentDataMap);
  const agentCounts = Object.values(agentDataMap);

  const agentData = {
    labels: agentLabels,
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
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
        <h3 className="mb-4 text-center">Anvaya CRM Reports</h3>

        <div className="row g-4 justify-content-center">
          {/* Closed vs Pipeline */}
          <div className="col-lg-4 col-md-6 col-12">
            <div className="card p-3 shadow-sm h-100">
              <h6 className="text-center">Leads Closed vs Pipeline</h6>
              <Pie data={pipelineData} />
            </div>
          </div>

          {/* Leads Closed by Agent */}
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
      </div>
    </ScreensLayout>
  );
}