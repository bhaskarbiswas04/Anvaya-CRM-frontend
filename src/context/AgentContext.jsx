import { createContext, useContext, useState, useEffect } from "react";
import { fetchAgents, createAgent } from "../services/agentService";

const AgentContext = createContext();

export const useAgents = () => useContext(AgentContext);

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load agents from API
  const loadAgents = async () => {
    try {
      const data = await fetchAgents();
      setAgents(data);
    } catch (err) {
      console.error("Failed to fetch agents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  // Add new agent
  const addAgent = async (agent) => {
    try {
      const newAgent = await createAgent(agent);
      setAgents((prev) => [...prev, newAgent]);
    } catch (err) {
      console.error("Failed to create agent", err);
    }
  };

  return (
    <AgentContext.Provider
      value={{ agents, loading, addAgent, refreshAgents: loadAgents }}
    >
      {children}
    </AgentContext.Provider>
  );
}