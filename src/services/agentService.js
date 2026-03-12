import { API_BASE_URL } from "../api/config";

export const fetchAgents = async ()=>{
    const res = await fetch(`${API_BASE_URL}/agents`);
    return await res.json();
}

export const createAgent = async (agent)=>{
    const res = await fetch(`${API_BASE_URL}/agents`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(agent)
    });

    return await res.json();
}