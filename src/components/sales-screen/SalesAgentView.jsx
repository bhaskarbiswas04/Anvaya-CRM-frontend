import { useState } from "react";
import { useLeads } from "../../context/LeadContext";

import { priorityBadge } from "../../utils/badges";

export default function SalesAgentView() {
  const { leads } = useLeads();

  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("");

  const agents = [...new Set(leads.map((l) => l.agent))];

  const getLeads = (agent) => {
    let filtered = leads.filter((l) => l.agent === agent);

    if (statusFilter !== "all") {
      filtered = filtered.filter((l) => l.status === statusFilter);
    }

    if (sort === "time") {
      filtered.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    return filtered;
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="mb-3 text-center">Leads by Sales Agent</h4>

      {/* Filters */}
      <div className="row g-2 mb-3 ">
        <div className="col">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
          </select>
        </div>

        {/* <div className="col">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="time">Time to Close</option>
          </select>
        </div> */}
      </div>

      {agents.map((agent) => {
        const agentLeads = getLeads(agent);

        if (agentLeads.length === 0) return null;

        return (
          <div key={agent} className="mb-4">
            <h6 className="mb-2">
              {agent} ({agentLeads.length})
            </h6>

            <div className="table-responsive">
              <table className="table table-sm">
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
                          className={`badge bg-${priorityBadge(lead.priority)}`}
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
  );
}