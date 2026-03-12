import { useNavigate } from "react-router-dom";
import { priorityBadge } from "../../utils/badges";

function timeAgo(date) {
  const now = new Date();
  const created = new Date(date);
  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";

  return `${days} days ago`;
}

export default function LeadPreview({ leads }) {
  const navigate = useNavigate();

  const visibleLeads = [...leads]
    .filter((lead) => lead.status !== "Closed")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);


  return (
    <div className="row my-4">
      <h4 className="text-success">Recent Leads</h4>
      {visibleLeads.map((lead) => (
        <div key={lead._id || lead.id} className="col-12 col-md-3 mt-2">
          <div
            className="card shadow-sm border-0 p-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/leads/${lead._id || lead.id}`)}
          >
            {/* Top row */}
            <div className="d-flex justify-content-between align-items-start">
              <h6 className="mb-1">{lead.name}</h6>

              <span className={`badge bg-${priorityBadge(lead.priority)}`}>
                {lead.priority}
              </span>
            </div>

            {/* Status */}
            <small className="text-capitalize text-primary">
              {lead.status}
            </small>

            {/* Time ago */}
            <div className="text-muted small mt-1">
              {timeAgo(lead.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}