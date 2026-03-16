import { useState, useEffect } from "react";
import { fetchTags, createTag } from "../services/tagService";
import { useAgents } from "../context/AgentContext";

export default function EditLeadModal({ lead, updateLead, close }) {
  const { agents } = useAgents();

  const [form, setForm] = useState({
    name: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: "",
    salesAgent: "",
    tags: [],
  });

  const [allTags, setAllTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      const tags = await fetchTags();
      setAllTags(tags);
    };
    loadTags();
  }, []);

  useEffect(() => {
    if (lead) {
      setForm({
        id: lead.id || lead._id,
        name: lead.name,
        source: lead.source,
        status: lead.status,
        priority: lead.priority,
        timeToClose: lead.timeToClose,
        salesAgent: lead.salesAgent?.id || lead.salesAgent?._id || "",
        tags: lead.tags || [],
      });
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

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const addNewTag = async () => {
    if (!newTag.trim()) return;

    const created = await createTag(newTag);

    setAllTags((prev) => [...prev, created]);

    toggleTag(created.name);

    setNewTag("");
    setShowTagInput(false);
  };

  const save = async () => {
    await updateLead(form);
    close();
  };

  if (!lead) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000080" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">
          <h4 className="mb-3">Edit Lead</h4>

          <div className="row g-3">
            {/* Lead Name */}
            <div className="col-md-12">
              <label className="form-label fw-semibold">Lead Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Sales Agent */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Sales Agent</label>
              <select
                className="form-select"
                name="salesAgent"
                value={form.salesAgent}
                onChange={handleChange}
              >
                <option value="">Select Agent</option>

                {agents.map((agent) => (
                  <option
                    key={agent.id || agent._id}
                    value={agent.id || agent._id}
                  >
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>
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

            {/* Lead Source */}
            <div className="col-md-6">
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

            {/* Priority */}
            <div className="col-md-6">
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
            <div className="col-md-6">
              <label className="form-label fw-semibold">Time to Close</label>
              <input
                type="number"
                className="form-control"
                name="timeToClose"
                value={form.timeToClose}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* TAG SYSTEM (Your original code preserved) */}
          <div className="mt-3">
            <label className="form-label fw-semibold">Tags</label>

            <div className="d-flex gap-2 mb-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowTagInput(!showTagInput)}
              >
                Add Tag
              </button>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowTagsModal(true)}
              >
                Show All Tags
              </button>
            </div>

            {showTagInput && (
              <div className="d-flex gap-2 mb-2">
                <input
                  className="form-control"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button className="btn btn-success" onClick={addNewTag}>
                  Add
                </button>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="badge bg-primary">
                  {tag}
                </span>
              ))}
            </div>

            {showTagsModal && (
              <div
                className="modal fade show d-block"
                style={{ background: "#00000080" }}
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Available Tags</h6>

                      <button
                        className="btn-close"
                        onClick={() => setShowTagsModal(false)}
                      />
                    </div>

                    <div className="d-flex flex-wrap gap-2 my-2">
                      {allTags.map((tag) => (
                        <span
                          key={tag._id}
                          className={`badge ${
                            form.tags.includes(tag.name)
                              ? "bg-primary"
                              : "bg-light text-dark border"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleTag(tag.name)}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="text-end mt-2">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setShowTagsModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-2 mt-4">
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