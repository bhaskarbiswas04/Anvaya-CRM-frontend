import { useState } from "react";
import { useLeads } from "../../context/LeadContext";

import { priorityBadge } from "../../utils/badges";

export default function LeadStatusView() {
  const { leads } = useLeads();

  const [agentFilter, setAgentFilter] = useState("all");
  const [sort, setSort] = useState("");

  const agents = [...new Set(leads.map((l) => l.agent))];
  const statuses = ["new", "contacted", "qualified"];

  const filterLeads = (status) => {
    let filtered = leads.filter((l) => l.status === status);

    if (agentFilter !== "all") {
      filtered = filtered.filter((l) => l.agent === agentFilter);
    }

    if (sort === "time") {
      filtered.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    return filtered;
  };

  return (
    <div className="card shadow-sm p-3">
      <h4 className="mb-3 text-center" >Leads by Status</h4>

      {/* Filters */}
      <div className="row g-2 mb-3">
        <div className="col">
          <select
            className="form-select"
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
          >
            <option value="all">All Agents</option>
            {agents.map((a) => (
              <option key={a}>{a}</option>
            ))}
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

      {statuses.map((status) => {
        const statusLeads = filterLeads(status);

        if (statusLeads.length === 0) return null;

        return (
          <div key={status} className="mb-4">
            <h6 className="text-capitalize mb-2">
              {status} ({statusLeads.length})
            </h6>

            <div className="table-responsive">
              <table className="table">
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

                      <td>{lead.agent}</td>

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