import { useNavigate } from "react-router-dom";

export default function LeadPreview({ leads }) {
  const navigate = useNavigate();

  return (
    <div className="row mb-4">
      {leads.map((lead) => (
        <div key={lead.id} className="col-12 col-md-3 mt-2">
          <div
            className="card shadow-sm border-0 p-3 cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/lead/${lead.id}`)}
          >
            <h6 className="mb-0">{lead.name}</h6>
            <small className="text-muted text-capitalize">{lead.status}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
