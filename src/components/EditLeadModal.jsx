import { useState, useEffect } from "react";
import { fetchTags, createTag } from "../services/tagService";

export default function EditLeadModal({ lead, updateLead, close }) {
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
        salesAgent: lead.salesAgent?.id || lead.salesAgent?._id,
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

          {/* TAGS */}
          <div className="mb-3">
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
          <div className="d-flex justify-content-center gap-2">
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