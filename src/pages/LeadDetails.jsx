import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Context
import { useLeads } from "../context/LeadContext";
import { useAgents } from "../context/AgentContext";

// Layout
import ScreensLayout from "../layouts/ScreensLayout";

// Components
import EditLeadModal from "../components/EditLeadModal";
import BackButton from "../components/ui/BackButton";
import PageLoader from "../components/ui/PageLoader";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addComment, updateLead, getLeadById, getComments, deleteLead } =
    useLeads();
  const { agents } = useAgents();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const loadLead = async () => {
      try {
        const leadData = await getLeadById(id);
        const commentsData = await getComments(id);

        setLead({
          ...leadData,
          comments: commentsData,
        });
      } catch (err) {
        console.error("Failed to load lead", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadLead();
  }, [id]);

  const leadId = lead?._id || lead?.id;

  if (loading) {
    return (
      <ScreensLayout>
        <PageLoader text="Loading lead details..." />
      </ScreensLayout>
    );
  }

  if (!lead) {
    return (
      <ScreensLayout>
        <div className="p-4 text-center">
          <h4>Lead not found</h4>
        </div>
      </ScreensLayout>
    );
  }

  // Add comment
  const submit = async () => {
    if (!comment.trim() || !author) return;

    await addComment(leadId, {
      commentText: comment,
      author: author,
    });

    const commentsData = await getComments(leadId);

    setLead((prev) => ({
      ...prev,
      comments: commentsData,
    }));

    setComment("");
    setAuthor("");
  };

  // Confirm delete
  const confirmDelete = async () => {
    const success = await deleteLead(leadId);

    if (success) navigate("/leads");
  };

  return (
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
        <BackButton navigationPath="/leads" className="mb-3" />

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Lead : {lead.name}</h3>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setOpen(true)}
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Lead Details */}
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

          {/* Add Comment */}
          <div className="row g-2 my-3">
            <div className="col-md-3">
              <select
                className="form-select"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="">Select Agent</option>

                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
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

          {!lead.comments?.length && (
            <p className="text-muted">No comments yet.</p>
          )}

          {lead.comments?.map((c) => (
            <div key={c.id} className="border-bottom mb-2 pb-2">
              <strong>{c.author}</strong>

              <small className="text-muted ms-2">
                {new Date(c.createdAt).toLocaleString()}
              </small>

              <p className="mb-0">{c.commentText}</p>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
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

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="modal fade show d-block"
            style={{ background: "#00000080" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h5 className="text-danger mb-3">Delete Lead</h5>

                <p>Are you sure you want to delete this lead?</p>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScreensLayout>
  );
}