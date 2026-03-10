import { useState } from "react";
import { useLeads } from "../context/LeadContext";
import { useNavigate } from "react-router-dom";

export default function LeadForm() {
  const { addLead, leads } = useLeads();
  const navigate = useNavigate();

  const agents = [...new Set(leads.map((l) => l.agent))];
  const tagOptions = ["High Value", "Follow-up", "Hot", "Cold"];

  const [form, setForm] = useState({
    name: "",
    source: "",
    agent: "",
    status: "new",
    priority: "medium",
    timeToClose: "",
    tags: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(value)
        ? prev.tags.filter((t) => t !== value)
        : [...prev.tags, value],
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    addLead(form);
    navigate("/leads");
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
              <option>Website</option>
              <option>Referral</option>
              <option>Cold Call</option>
            </select>
          </div>

          {/* Agent */}
          <div className="col-md-6">
            <label className="form-label">Sales Agent</label>
            <select
              className="form-select"
              name="agent"
              value={form.agent}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {agents.map((a) => (
                <option key={a}>{a}</option>
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
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal sent">Proposal Sent</option>
              <option value="closed">Closed</option>
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
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
                  onClick={() => handleTags({ target: { value: tag } })}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="col-12 text-end">
            <button className="btn btn-primary">Create Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}