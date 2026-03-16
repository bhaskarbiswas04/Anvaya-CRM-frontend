import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { useAgents } from "../context/AgentContext";
import BackButton from "../components/ui/BackButton";

export default function AddAgentPage() {
  const { addAgent } = useAgents();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  

  const submit = () => {
    if (!name.trim() || !email.trim()) return;

    addAgent({
      name,
      email,
    });

    navigate("/agents");
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-dark d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h3 className="mb-4 text-center">Add New Sales Agent</h3>

        <div
          className="card shadow-sm p-4 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter agent name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-primary me-3" onClick={submit}>
              Create Agent
            </button>

            <BackButton navigationPath="/agents" />
          </div>
        </div>
      </main>
    </div>
  );
}
