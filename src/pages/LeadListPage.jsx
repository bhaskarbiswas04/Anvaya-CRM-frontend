import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLeads } from "../context/LeadContext";

import ScreensLayout from "../layouts/ScreensLayout";
import AddLeadButton from "../components/dashboard-screen/AddLeadButton";

export default function LeadList() {
  const { leads } = useLeads();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status") || "all";
  const agentParam = searchParams.get("agent") || "all";
  const sourceParam = searchParams.get("source") || "all";

  const [status, setStatus] = useState(statusParam);
  const [agent, setAgent] = useState(agentParam);
  const [source, setSource] = useState(sourceParam);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};

    if (status !== "all") params.status = status;
    if (agent !== "all") params.agent = agent;
    if (source !== "all") params.source = source;

    setSearchParams(params);
  }, [status, agent, source]);

  let filtered = [...leads];

  // --Search_Logic
  if (search.trim() !== "") {
    const searchLower = search.toLowerCase();

    filtered = filtered.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(searchLower) ||
        lead.salesAgent?.name?.toLowerCase().includes(searchLower) ||
        lead.source?.toLowerCase().includes(searchLower),
    );
  }

  if (status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }

  if (agent !== "all") {
    filtered = filtered.filter((l) => l.salesAgent?.name === agent);
  }

  if (source !== "all") {
    filtered = filtered.filter((l) => l.source === source);
  }

  if (sort === "priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sort === "time") {
    filtered.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  const agents = [
    ...new Set(leads.map((l) => l.salesAgent?.name).filter(Boolean)),
  ];

  const sources = [...new Set(leads.map((l) => l.source))];

  return (
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
        <h3 className="mb-4 text-center">Lead List</h3>

        {/* SEARCH */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search leads by name, agent, or source..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER BAR */}
        <div className="row g-2 mb-3">
          <div className="col-12 col-md">
            <label className="my-2">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

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
        <div className="card shadow-sm" style={{ maxHeight: "65vh" }}>
          <div
            className="table-responsive overflow-auto"
            style={{ maxHeight: "65vh" }}
          >
            <table className="table table-hover mb-0">
              <thead className="table-light">
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
                    key={lead.id || lead._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/leads/${lead.id || lead._id}`)}
                  >
                    <td>{lead.name}</td>
                    <td>{lead.status}</td>
                    <td>{lead.salesAgent?.name}</td>
                    <td>{lead.source}</td>
                    <td>{lead.priority}</td>
                    <td>{lead.timeToClose} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScreensLayout>
  );
}