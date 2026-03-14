import { API_BASE_URL } from "../api/config";

export const fetchTags = async ()=>{
    const res = await fetch(`${API_BASE_URL}/tags`);
    return await res.json();
}

export const createTag = async (name) =>{
    const res = await fetch(`${API_BASE_URL}/tags`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name }),
    });

    return await res.json();
};