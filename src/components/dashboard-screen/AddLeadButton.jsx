
import { useNavigate } from "react-router-dom";

export default function AddLeadButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={() => navigate("/add-lead")}
    >
      + Add New Lead
    </button>
  );
}