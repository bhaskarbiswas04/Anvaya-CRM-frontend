import { useNavigate } from "react-router-dom";
import { useAgents } from "../context/AgentContext";

import ScreensLayout from "../layouts/ScreensLayout";
import PageLoader from "../components/ui/PageLoader";

export default function SalesAgentsPage() {
  const { agents, loading } = useAgents();
  const navigate = useNavigate();

  if (loading) {
    return (
      <ScreensLayout>
        <PageLoader text="Loading agents..." />
      </ScreensLayout>
    );
  }

  return (
    <ScreensLayout>
      <div className="p-4 bg-light min-vh-100">
        <h3 className="mb-4 text-center">Sales Agent Management</h3>

        <div className="card shadow-sm p-3">
          {agents.length === 0 ? (
            <p className="text-center text-muted py-4">
              No agents found. Add your first sales agent.
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id || agent._id}>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-3 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-agent")}
            >
              Add New Agent
            </button>
          </div>
        </div>
      </div>
    </ScreensLayout>
  );
}