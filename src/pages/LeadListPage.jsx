import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLeads } from "../context/LeadContext";

import Sidebar from "../layouts/Sidebar";
import AddLeadButton from "../components/dashboard-screen/AddLeadButton";

export default function LeadList() {
  const { leads } = useLeads();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL
  const statusParam = searchParams.get("status") || "all";
  const agentParam = searchParams.get("agent") || "all";
  const sourceParam = searchParams.get("source") || "all";

  const [status, setStatus] = useState(statusParam);
  const [agent, setAgent] = useState(agentParam);
  const [source, setSource] = useState(sourceParam);
  const [sort, setSort] = useState("");

  // Sync filters with URL
  useEffect(() => {
    const params = {};

    if (status !== "all") params.status = status;
    if (agent !== "all") params.agent = agent;
    if (source !== "all") params.source = source;

    setSearchParams(params);
  }, [status, agent, source]);

  let filtered = [...leads];

  // Apply filters
  if (status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }

  if (agent !== "all") {
    filtered = filtered.filter((l) => l.agent === agent);
  }

  if (source !== "all") {
    filtered = filtered.filter((l) => l.source === source);
  }

  // Sorting
  if (sort === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sort === "time") {
    filtered.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  const agents = [...new Set(leads.map((l) => l.agent))];
  const sources = [...new Set(leads.map((l) => l.source))];

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        <h3 className="mb-4">Lead List</h3>

        {/* FILTER BAR */}
        <div className="row g-2 mb-3">
          {/* Status */}
          <div className="col-12 col-md">
            <label className="my-2">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          {/* Agent */}
          <div className="col-12 col-md">
            <label className="my-2">Sales Agent</label>
            <select
              className="form-select"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="all">All</option>
              {agents.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Source */}
          <div className="col-12 col-md">
            <label className="my-2">Lead Source</label>
            <select
              className="form-select"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="all">All</option>
              {sources.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="col-12 col-md">
            <label className="my-2">Sort By</label>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="time">Time to Close</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-12 col-md-auto d-flex align-items-end gap-2">
            <AddLeadButton />

            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setStatus("all");
                setAgent("all");
                setSource("all");
                setSearchParams({});
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="card shadow-sm table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status</th>
                <th>Sales Agent</th>
                <th>Source</th>
                <th>Priority</th>
                <th>Time to Close</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/lead/${lead.id}`)}
                >
                  <td>{lead.name}</td>
                  <td className="text-capitalize">{lead.status}</td>
                  <td>{lead.agent}</td>
                  <td>{lead.source}</td>
                  <td className="text-capitalize">{lead.priority}</td>
                  <td>{lead.timeToClose} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}