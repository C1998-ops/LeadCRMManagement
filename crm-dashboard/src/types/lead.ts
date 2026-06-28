export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Site Visit"
  | "Negotiation";
export type LeadPriority = "High" | "Medium" | "Low";
export interface Note {
  id: number;
  text: string;
  author: string;
  time: string;
  done: boolean;
}

export interface Activity {
  icon: string;
  text: string;
  time: string;
}

export interface LeadRow {
  id: string;
  name: string;
  contact: string;
  project: string;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  budget: string;
  owner: string;
  lastActivity: string;
  notes: Note[];
  activities: Activity[];
}

export interface DatabaseLead {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status: string;
  priority: string;
  estimated_value?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLeadInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: string;
  priority: string;
  estimated_value: number;
  notes?: string;
  customer_id?: string;
  assigned_to?: string;
}

export type UpdateLeadInput = Partial<CreateLeadInput>;
