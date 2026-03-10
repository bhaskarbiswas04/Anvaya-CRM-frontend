import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { useAgents } from "../context/AgentContext";

export default function SalesAgentsPage() {
  const { agents } = useAgents();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex vh-100">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Mobile toggle */}
        <button
          className="btn btn-dark d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h3 className="mb-4 text-center">Sales Agent Management</h3>

        <div className="card shadow-sm p-3">
          <table className="table">
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-agent")}
            >
              Add New Agent
            </button>
          </div>
        </div>

        {/* {open && <AddAgentModal close={() => setOpen(false)} />} */}
      </main>
    </div>
  );
}