import { useNavigate } from "react-router-dom";

export default function BackButton({navigationPath, className=""}) {
    const navigate = useNavigate();

    return (
      <div>
        <button
          className={`btn btn-secondary ${className}`}
          onClick={() => navigate(navigationPath)}
        >
          ← Back
        </button>
      </div>
    );
}