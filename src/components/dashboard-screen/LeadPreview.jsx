import { useNavigate } from "react-router-dom";

export default function LeadPreview({ leads }) {
  const navigate = useNavigate();

  return (
    <div className="row mb-4">
      {leads.slice(0, 8).map((lead) => (
        <div key={lead._id} className="col-12 col-md-3 mt-2">
          <div
            className="card shadow-sm border-0 p-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/leads/${lead.id}`)}
          >
            <h6 className="mb-0">{lead.name}</h6>
            <small className="text-muted text-capitalize">{lead.status}</small>
          </div>
        </div>
      ))}
    </div>
  );
}