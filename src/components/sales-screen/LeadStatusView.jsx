import { useState } from "react";
import { useLeads } from "../../context/LeadContext";
import { useAgents } from "../../context/AgentContext";

import { priorityBadge } from "../../utils/badges";

export default function LeadStatusView() {
  const { leads } = useLeads();
  const { agents } = useAgents();

  const [agentFilter, setAgentFilter] = useState("all");

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent"];

  const filterLeads = (status) => {
    let filtered = leads.filter((l) => l.status === status);

    if (agentFilter !== "all") {
      filtered = filtered.filter((l) => l.salesAgent?.name === agentFilter);
    }

    return filtered;
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="mb-3 text-center">Leads by Status</h4>

      {/* Filters */}
      <div className="row g-2 mb-3">
        <div className="col">
          <select
            className="form-select"
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
          >
            <option value="all">All Agents</option>

            {agents.map((agent) => (
              <option key={agent.id || agent._id}>{agent.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable leads container */}
      <div
        style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "5px" }}
      >
        {statuses.map((status) => {
          const statusLeads = filterLeads(status);

          if (statusLeads.length === 0) return null;

          return (
            <div key={status} className="mb-4">
              <h6 className="text-capitalize mb-2">
                {status} ({statusLeads.length})
              </h6>

              <div className="table-responsive">
                <table className="table table-sm table-fixed">
                  <thead className="table-light">
                    <tr>
                      <th>Lead</th>
                      <th>Agent</th>
                      <th>Priority</th>
                      <th>Time to Close</th>
                    </tr>
                  </thead>

                  <tbody>
                    {statusLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>{lead.name}</td>

                        <td>{lead.salesAgent?.name}</td>

                        <td>
                          <span
                            className={`badge bg-${priorityBadge(
                              lead.priority,
                            )}`}
                          >
                            {lead.priority}
                          </span>
                        </td>

                        <td>{lead.timeToClose} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}