import { useState } from "react";
import { useLeads } from "../../context/LeadContext";

import { priorityBadge } from "../../utils/badges";

export default function SalesAgentView() {
  const { leads } = useLeads();

  const [statusFilter, setStatusFilter] = useState("all");

  // Get unique agents from API structure
  const agents = [
    ...new Set(leads.map((l) => l.salesAgent?.name).filter(Boolean)),
  ];

  const getLeads = (agent) => {
    let filtered = leads.filter((l) => l.salesAgent?.name === agent);

    if (statusFilter !== "all") {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    return filtered;
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="mb-3 text-center">Leads by Sales Agent</h4>

      {/* Filters */}
      <div className="row g-2 mb-3">
        <div className="col">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Scrollable container (same pattern as LeadStatusView) */}
      <div
        style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "5px" }}
      >
        {agents.map((agent) => {
          const agentLeads = getLeads(agent);

          if (agentLeads.length === 0) return null;

          return (
            <div key={agent} className="mb-4">
              <h6 className="mb-2">
                {agent} ({agentLeads.length})
              </h6>

              <div className="table-responsive">
                <table className="table table-sm table-fixed">
                  <thead className="table-light">
                    <tr>
                      <th>Lead</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Time to Close</th>
                    </tr>
                  </thead>

                  <tbody>
                    {agentLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>{lead.name}</td>

                        <td className="text-capitalize">{lead.status}</td>

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