import { createContext, useContext, useState } from "react";

const AgentContext = createContext();

export const useAgents = () => useContext(AgentContext);

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([
    { id: 1, name: "John Doe", email: "john@email.com" },
    { id: 2, name: "Sarah", email: "sarah@email.com" },
    { id: 3, name: "Mike Tyson", email: "mike@email.com" },
  ]);

  const addAgent = (agent) => {
    setAgents((prev) => [...prev, { id: Date.now(), ...agent }]);
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent }}>
      {children}
    </AgentContext.Provider>
  );
}
