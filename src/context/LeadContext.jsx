import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchLeads,
  fetchLeadById,
  createLead,
  updateLead,
  deleteLead,
  addComment as addCommentAPI,
} from "../services/leadService";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Leads from API
  const loadLeads = async () => {
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Add Lead
  const addLead = async (lead) => {
    try {
      await createLead(lead);
      await loadLeads();
      return true;
    } catch (err) {
      console.error("Failed to create lead", err);
      return false;
    }
  };

  // Load Leads by ID
  const getLeadById = async (id) => {
    try {
      const lead = await fetchLeadById(id);
      return lead;
    } catch (err) {
      console.error("Failed to fetch lead by id", err);
      return null;
    }
  };

  // Update Lead
  const updateLeadData = async (lead) => {
    try {
      const updated = await updateLead(lead.id, lead);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    } catch (err) {
      console.error("Failed to update lead", err);
    }
  };

  // Delete Lead
  const deleteLeadData = async (id) => {
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  // Add Comment
  const addComment = async (leadId, comment) => {
    try {
      const updatedLead = await addCommentAPI(leadId, comment);

      setLeads((prev) => prev.map((l) => (l.id === leadId ? updatedLead : l)));
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        loading,
        addLead,
        getLeadById,
        updateLead: updateLeadData,
        deleteLead: deleteLeadData,
        addComment,
        refreshLeads: loadLeads,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => useContext(LeadContext);