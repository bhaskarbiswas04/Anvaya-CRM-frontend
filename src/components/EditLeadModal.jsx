import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

export default function EditLeadModal({ lead, updateLead, close }) {
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: "",
    salesAgent: "",
    tags: [],
  });

  // Separate state for tag input
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (lead) {
      const tags = lead.tags || [];

      setForm({
        id: lead.id || lead._id,
        name: lead.name,
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        timeToClose: lead.timeToClose,
        salesAgent: lead.salesAgent?.id || lead.salesAgent?._id,
        tags,
      });

      setTagInput(tags.join(", "));
    }
  }, [lead]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "timeToClose"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const save = async () => {
    const updatedLead = {
      ...form,
      tags: tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    await updateLead(updatedLead);

    showToast("Lead updated successfully.");
    close();
  };

  if (!lead) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000080" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="mb-3">Edit Lead</h4>

          {/* Lead Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Lead Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
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
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Lead Status</label>
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
          <div className="mb-3">
            <label className="form-label fw-semibold">Priority</label>
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

          {/* Time to Close */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Time to Close (days)
            </label>
            <input
              className="form-control"
              name="timeToClose"
              type="number"
              value={form.timeToClose}
              onChange={handleChange}
            />
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Tags</label>

            <input
              type="text"
              className="form-control"
              placeholder="High Value, Follow-up, Hot"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />

            <small className="text-muted">Separate tags using commas</small>

            {/* Tag Preview */}
            <div className="d-flex flex-wrap gap-2 mt-2">
              {tagInput
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="badge bg-light text-dark border p-2"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 my-2">
            <button className="btn btn-secondary" onClick={close}>
              Cancel
            </button>

            <button className="btn btn-primary" onClick={save}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}