import { createContext, useContext, useState } from "react";
import leads_data from "../dummy_datas/leads_data"

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(leads_data);

  // addComment function
  const addComment = (leadId, commentObj) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              comments: [
                ...(l.comments || []),
                { id: Date.now(), ...commentObj }, // spread object
              ],
            }
          : l,
      ),
    );
  };

  // updateLead function
  const updateLead = (updatedLead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
    );
  };

  // Add Lead function
  const addLead = (lead) => {
    setLeads((prev) => [
      ...prev,
      {
        ...lead,
        id: Date.now(),
        comments: [],
      },
    ]);
  };

  return (
    <LeadContext.Provider value={{ leads, addComment, updateLead, addLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => useContext(LeadContext);