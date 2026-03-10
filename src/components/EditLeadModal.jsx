import { useState, useEffect } from "react";

export default function EditLeadModal({ lead, updateLead, close }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (lead) setForm({ ...lead });
  }, [lead]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = () => {
    updateLead(form);
    close();
  };

  if (!lead) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#0f0f0f80" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="mb-3">Edit Lead</h4>

          {/* Agent */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Sales Agent</label>
            <input
              className="form-control"
              name="agent"
              value={form.agent || ""}
              onChange={handleChange}
            />
          </div>

          {/* Source */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Lead Source</label>
            <select
              className="form-select"
              name="source"
              value={form.source}
              onChange={handleChange}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Lead Status</label>
            <select
              className="form-control"
              name="status"
              value={form.status || ""}
              onChange={handleChange}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Priority</label>
            <select
              className="form-control"
              name="priority"
              value={form.priority || ""}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Time to Close */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Time to Close (days)
            </label>
            <input
              className="form-control"
              name="timeToClose"
              type="number"
              value={form.timeToClose || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={close}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}