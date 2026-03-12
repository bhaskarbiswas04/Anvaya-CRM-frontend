import { API_BASE_URL } from "../api/config";

// --GET : fetch all agents
export const fetchAgents = async () => {
  const res = await fetch(`${API_BASE_URL}/agents`);

  if (!res.ok) {
    throw new Error("Failed to fetch agents");
  }

  return await res.json();
};

// --POST : create an agent
export const createAgent = async (agent) => {
  const res = await fetch(`${API_BASE_URL}/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
  });

  if (!res.ok) {
    throw new Error("Failed to create agent");
  }

  return await res.json();
};