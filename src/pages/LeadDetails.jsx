import { useParams } from "react-router-dom";
import { useLeads } from "../context/LeadContext";
import Sidebar from "../layouts/Sidebar";
import { useState, useEffect } from "react";
import EditLeadModal from "../components/EditLeadModal";
import BackButton from "../components/BackButton";

export default function LeadDetails() {
  const { id } = useParams();

  const { leads, addComment, updateLead, getLeadById } = useLeads();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const loadLead = async () => {
      try {
        const data = await getLeadById(id);
        setLead(data);
      } catch (err) {
        console.error("Failed to load lead", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadLead();
  }, [id]);

  const leadId = lead?._id || lead?.id;

  // Generate agents list safely
  const agents = [
    ...new Set(leads?.map((l) => l.salesAgent?.name).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <h4>Loading lead details...</h4>
        </main>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <h4>Lead not found</h4>
        </main>
      </div>
    );
  }

  const submit = async () => {
    if (!comment.trim() || !author) return;

    await addComment(leadId, {
      text: comment,
      author,
      timestamp: new Date().toLocaleString(),
    });

    setComment("");
    setAuthor("");

    // reload lead after comment
    const updated = await getLeadById(leadId);
    setLead(updated);
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        <BackButton navigationPath="/leads" className="mb-3" />

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Lead : {lead.name}</h3>

          <button
            className="btn btn-outline-primary"
            onClick={() => setOpen(true)}
          >
            Edit Lead
          </button>
        </div>

        {/* Lead details */}
        <div className="card p-4 shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <span className="text-muted small">Sales Agent</span>
              <div className="fw-semibold text-capitalize">
                {lead.salesAgent?.name}
              </div>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Lead Source</span>
              <div className="fw-semibold">{lead.source}</div>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Status</span>
              <div className="fw-semibold text-capitalize">{lead.status}</div>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Priority</span>
              <div className="fw-semibold text-capitalize">{lead.priority}</div>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Time to Close</span>
              <div className="fw-semibold">{lead.timeToClose} days</div>
            </div>

            {/* Tags */}
            <div className="col-12">
              <span className="text-muted small">Tags</span>

              <div className="d-flex flex-wrap gap-2 mt-1">
                {lead.tags?.length ? (
                  lead.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-light text-dark border p-2"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-muted">No Tags</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Comments</h5>

          {lead.comments?.length === 0 && (
            <p className="text-muted">No comments yet.</p>
          )}

          {lead.comments?.map((c, index) => (
            <div key={index} className="border-bottom mb-2 pb-2">
              <strong>{c.author}</strong>
              <small className="text-muted ms-2">{c.timestamp}</small>
              <p className="mb-0">{c.text}</p>
            </div>
          ))}

          {/* Add comment */}
          <div className="row g-2 mt-3">
            <div className="col-md-3">
              <select
                className="form-select"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="">Select Agent</option>
                {agents.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="col-md-7">
              <input
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comment..."
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Edit modal */}
        {open && (
          <EditLeadModal
            lead={lead}
            updateLead={async (updatedLead) => {
              await updateLead(updatedLead);

              const freshLead = await getLeadById(
                updatedLead.id || updatedLead._id,
              );
              setLead(freshLead);
            }}
            close={() => setOpen(false)}
          />
        )}
      </main>
    </div>
  );
}