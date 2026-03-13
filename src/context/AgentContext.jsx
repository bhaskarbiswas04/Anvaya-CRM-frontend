import { createContext, useContext, useState, useEffect } from "react";
import { fetchAgents, createAgent } from "../services/agentService";
import { useToast } from "./ToastContext";

const AgentContext = createContext();

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgents must be used inside AgentProvider");
  }
  return context;
};

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  // Load agents
  const loadAgents = async () => {
    try {
      const data = await fetchAgents();

      // Normalize Mongo IDs
      const normalized = data.map((agent) => ({
        ...agent,
        id: agent._id || agent.id,
      }));

      setAgents(normalized);
    } catch (err) {
      console.error("Failed to fetch agents", err);
      showToast("Failed to load agents", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  // Add agent
  const addAgent = async (agent) => {
    try {
      const newAgent = await createAgent(agent);

      const normalized = {
        ...newAgent,
        id: newAgent._id || newAgent.id,
      };

      setAgents((prev) => [...prev, normalized]);

      showToast("Agent created successfully");

      return true;
    } catch (err) {
      console.error("Failed to create agent", err);
      showToast("Failed to create agent", "error");
      return false;
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        loading,
        addAgent,
        refreshAgents: loadAgents,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}
