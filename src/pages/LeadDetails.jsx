import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../context/LeadContext";
import Sidebar from "../layouts/Sidebar";
import { useState } from "react";
import EditLeadModal from "../components/EditLeadModal";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, addComment, updateLead } = useLeads();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const lead = leads?.find((lead) => lead.id === parseInt(id));
  const agents = [...new Set(leads.map((l) => l.agent))];

  if (!lead) {
    return (
      <div className="p-4">
        <h3>Lead not found</h3>
      </div>
    );
  }

  const submit = () => {
    if (!comment.trim() || !author) return;

    addComment(lead.id, {
      text: comment,
      author,
      timestamp: new Date().toLocaleString(),
    });

    setComment("");
    setAuthor("");
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Back button */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

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

        {/* Lead details card */}
        <div className="card p-4 shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <span className="text-muted small">Sales Agent</span>
              <div className="fw-semibold text-capitalize">{lead.agent}</div>
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
          </div>
        </div>

        {/* Comments section */}
        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Comments</h5>

          {lead.comments?.length === 0 && (
            <p className="text-muted">No comments yet.</p>
          )}

          {lead.comments?.map((c) => (
            <div key={c.id} className="border-bottom mb-2 pb-2">
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
            updateLead={updateLead}
            close={() => setOpen(false)}
          />
        )}
      </main>
    </div>
  );
}