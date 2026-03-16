import { useState, useEffect } from "react";
import { useLeads } from "../../context/LeadContext";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { fetchAgents } from "../../services/agentService";
import { fetchTags, createTag } from "../../services/tagService";

export default function LeadForm() {
  const { addLead } = useLeads();
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [showTagInput, setShowTagInput] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [form, setForm] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    priority: "Medium",
    timeToClose: "",
    tags: [],
  });

  // Load agents
  useEffect(() => {
    const loadAgents = async () => {
      const data = await fetchAgents();
      setAgents(data);
    };
    loadAgents();
  }, []);

  // Load tags
  useEffect(() => {
    const loadTags = async () => {
      const tags = await fetchTags();
      setAllTags(tags);
    };
    loadTags();
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

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    const created = await createTag(newTag);

    setAllTags((prev) => [...prev, created]);

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, created.name],
    }));

    setNewTag("");
    setShowTagInput(false);
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

          {/* Agent */}
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

          {/* TAGS */}
          <div className="col-12">
            <label className="form-label">Tags</label>

            <div className="d-flex gap-2 mb-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowTagInput(!showTagInput)}
              >
                Add Tag
              </button>

              <button
                type="button"
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
                  placeholder="Enter new tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddTag}
                >
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
          </div>

          {/* Submit */}
          <div className="mt-3 d-flex justify-content-center">
            <BackButton navigationPath="/leads" className=" me-3" />
            <button className="btn btn-primary">Create Lead</button>
          </div>
        </form>

        {/* TAG MODAL */}
        {showTagsModal && (
          <div
            className="modal show d-block"
            style={{ background: "#00000080" }}
          >
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Available Tags</h5>

                <div className="d-flex flex-wrap gap-2 my-3">
                  {allTags.map((tag) => (
                    <span
                      key={tag._id}
                      className="badge bg-light border text-dark p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleTags(tag.name)}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTagsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
