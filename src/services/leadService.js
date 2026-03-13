import { API_BASE_URL } from "../api/config";
import LeadList from "../pages/LeadListPage";

export const fetchLeads = async () => {
  const res = await fetch(`${API_BASE_URL}/leads`);
  return await res.json();
};

export const fetchLeadById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/leads/${id}`);
  return await res.json();
};

export const createLead = async (lead) => {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  return await res.json();
};

export const updateLead = async (id, lead) => {
  const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  return await res.json();
};

export const deleteLead = async (id) => {
  const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};

export const addComment = async (leadId, comment) => {
  const res = await fetch(`${API_BASE_URL}/leads/${leadId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  return await res.json();
};

export const getCommentsById = async (leadId) => {
  const res = await fetch(`${API_BASE_URL}/leads/${leadId}/comments`);
  return await res.json();
}