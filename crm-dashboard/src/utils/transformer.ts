import { DatabaseLead, LeadRow } from "@/types/lead";

export const transformedLeads = (data: DatabaseLead[]) => {
  return data.map(
    (dbLead: DatabaseLead): LeadRow => ({
      id: dbLead.id,
      name: `${dbLead.first_name} ${dbLead.last_name}`,
      contact: dbLead.phone || "",
      project: dbLead.company || "N/A",
      source: dbLead.source || "N/A",
      status:
        dbLead.status === "new"
          ? "New"
          : dbLead.status === "contacted"
          ? "Contacted"
          : dbLead.status === "qualified"
          ? "Qualified"
          : dbLead.status === "site_visit"
          ? "Site Visit"
          : dbLead.status === "negotiation"
          ? "Negotiation"
          : "New",
      priority:
        dbLead.priority === "high"
          ? "High"
          : dbLead.priority === "medium"
          ? "Medium"
          : dbLead.priority === "low"
          ? "Low"
          : "Medium",
      budget: dbLead.estimated_value
        ? `₹${(dbLead.estimated_value / 100000).toFixed(0)}L`
        : "N/A",
      owner: "Unassigned",
      lastActivity: new Date(dbLead.updated_at).toLocaleDateString(),
      notes: dbLead.notes
        ? [
            {
              id: 1,
              text: dbLead.notes,
              author: "System",
              time: new Date(dbLead.created_at).toLocaleString(),
              done: false,
            },
          ]
        : [],
      activities: [],
    })
  );
};
