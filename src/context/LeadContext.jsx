import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchLeads,
  fetchLeadById,
  createLead,
  updateLead,
  deleteLead,
  addComment as addCommentAPI,
  getCommentsById,
} from "../services/leadService";
import { useToast } from "./ToastContext";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  // Load Leads
  const loadLeads = async () => {
    try {
      const data = await fetchLeads();

      // Normalize Mongo IDs
      const normalized = data.map((lead) => ({
        ...lead,
        id: lead._id || lead.id,
      }));

      setLeads(normalized);
    } catch (err) {
      console.error("Failed to fetch leads", err);
      showToast("Failed to load leads", "error");
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
      const newLead = await createLead(lead);

      setLeads((prev) => [
        { ...newLead, id: newLead._id || newLead.id },
        ...prev,
      ]);

      showToast("Lead created successfully");

      return true;
    } catch (err) {
      console.error("Failed to create lead", err);

      showToast("Failed to create lead", "error");

      return false;
    }
  };

  // Get Lead by ID
  const getLeadById = async (id) => {
    try {
      const lead = await fetchLeadById(id);

      return {
        ...lead,
        id: lead._id || lead.id,
      };
    } catch (err) {
      console.error("Failed to fetch lead by id", err);
      showToast("Failed to load lead", "error");
      return null;
    }
  };

  // Update Lead
  const updateLeadData = async (lead) => {
    try {
      const updated = await updateLead(lead.id || lead._id, lead);

      const normalized = {
        ...updated,
        id: updated._id || updated.id,
      };

      setLeads((prev) =>
        prev.map((l) => (l.id === normalized.id ? normalized : l)),
      );

      showToast("Lead updated successfully");

      return true;
    } catch (err) {
      console.error("Failed to update lead", err);

      showToast("Failed to update lead", "error");

      return false;
    }
  };

  // Delete Lead
  const deleteLeadData = async (id) => {
    try {
      await deleteLead(id);

      setLeads((prev) => prev.filter((l) => l.id !== id));

      showToast("Lead deleted successfully");

      return true;
    } catch (err) {
      console.error("Failed to delete lead", err);

      showToast("Failed to delete lead", "error");

      return false;
    }
  };

  // Add Comment
  const addComment = async (leadId, comment) => {
    try {
      const newComment = await addCommentAPI(leadId, comment);

      showToast("Comment added");

      return newComment;
    } catch (err) {
      console.error("Failed to add comment", err);

      showToast("Failed to add comment", "error");

      return null;
    }
  };

  // Fetch Comments
  const getComments = async (leadId) => {
    try {
      const comments = await getCommentsById(leadId);
      return comments;
    } catch (err) {
      console.error("Failed to fetch comments", err);
      showToast("Failed to load comments", "error");
      return [];
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
        getComments,
        refreshLeads: loadLeads,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => useContext(LeadContext);