import { useState, useEffect } from "react";
import { useLeads } from "../context/LeadContext";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { fetchAgents } from "../services/agentService";

export default function LeadForm() {
  const { addLead } = useLeads();
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  

  const tagOptions = ["High Value", "Follow-up", "Hot", "Cold"];

  const [form, setForm] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    priority: "Medium",
    timeToClose: "",
    tags: [],
  });

  // Load agents from API
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (err) {
        console.error("Failed to fetch agents", err);
      }
    };

    loadAgents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const success = await addLead({
      ...form,
      timeToClose: Number(form.timeToClose),
    });

    if (success) {
      navigate("/leads");
    }
  };

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm p-4 mx-auto w-100"
        style={{ maxWidth: "1200px" }}
      >
        <h4 className="mb-3 text-center">Add New Lead</h4>

        <form onSubmit={submit} className="row g-3">
          {/* Name */}
          <div className="col-12">
            <label className="form-label">Lead Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Source */}
          <div className="col-md-6">
            <label className="form-label">Lead Source</label>
            <select
              className="form-select"
              name="source"
              value={form.source}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Agent (from API) */}
          <div className="col-md-6">
            <label className="form-label">Sales Agent</label>
            <select
              className="form-select"
              name="salesAgent"
              value={form.salesAgent}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>

              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="col-md-6">
            <label className="form-label">Lead Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Time */}
          <div className="col-12">
            <label className="form-label">Time to Close (days)</label>
            <input
              type="number"
              className="form-control"
              name="timeToClose"
              value={form.timeToClose}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tags */}
          <div className="col-12">
            <label className="form-label">Tags</label>

            <div className="d-flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`btn btn-sm ${
                    form.tags.includes(tag)
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => handleTags(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-primary me-3">Create Lead</button>

            <BackButton navigationPath="/leads" />
          </div>
        </form>
      </div>
    </div>
  );
}