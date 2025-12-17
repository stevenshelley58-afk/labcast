// ============================================================================
// Labcast Agency OS - TypeScript Types
// ============================================================================

// ----------------------------------------------------------------------------
// Enum Types
// ----------------------------------------------------------------------------

export type ServiceType =
  | 'website'
  | 'meta_ads'
  | 'website_and_ads'
  | 'creative'
  | 'other';

export type BudgetSignal =
  | 'unknown'
  | 'under_2k'
  | '2k_5k'
  | '5k_10k'
  | '10k_plus';

export type GutFeel = 'hot' | 'warm' | 'cool';

export type LeadStage =
  | 'new'
  | 'talking'
  | 'proposal_sent'
  | 'won'
  | 'lost';

export type ClientStatus = 'active' | 'retainer' | 'past';

export type ProjectStatus =
  | 'active'
  | 'waiting_on_client'
  | 'in_progress'
  | 'completed';

export type ProjectType = 'project' | 'retainer';

export type DeliverableStatus =
  | 'pending'
  | 'in_progress'
  | 'in_review'
  | 'approved';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type ActivityEntityType = 'lead' | 'client' | 'project' | 'invoice';

// ----------------------------------------------------------------------------
// Database Records
// ----------------------------------------------------------------------------

export interface Client {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  status: ClientStatus;
  notes: string | null;
  client_since: string | null; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface ClientWithStats extends Client {
  lifetime_value: number;
  project_count: number;
  months_as_client: number | null;
}

export interface Lead {
  id: string;
  name: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  service_type: ServiceType;
  budget_signal: BudgetSignal;
  gut_feel: GutFeel;
  stage: LeadStage;
  proposal_amount: number | null;
  proposal_sent_at: string | null;
  lost_reason: string | null;
  source: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  converted_to_client_id: string | null;
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  status: ProjectStatus;
  project_type: ProjectType;
  value: number | null;
  start_date: string | null; // ISO date string
  end_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithRelations extends Project {
  client?: Client;
  deliverables?: Deliverable[];
  invoices?: Invoice[];
}

export interface Deliverable {
  id: string;
  project_id: string;
  name: string;
  status: DeliverableStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  stripe_invoice_id: string | null;
  description: string | null;
  amount: number;
  status: InvoiceStatus;
  due_date: string | null; // ISO date string
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceWithProject extends Invoice {
  project?: Project;
}

export interface ActivityLog {
  id: string;
  entity_type: ActivityEntityType;
  entity_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

// ----------------------------------------------------------------------------
// API Request/Response Types
// ----------------------------------------------------------------------------

// Leads
export interface CreateLeadRequest {
  name: string;
  business_name?: string;
  email?: string;
  phone?: string;
  service_type?: ServiceType;
  budget_signal?: BudgetSignal;
  gut_feel?: GutFeel;
  source?: string;
  notes?: string;
}

export interface UpdateLeadRequest {
  name?: string;
  business_name?: string;
  email?: string;
  phone?: string;
  service_type?: ServiceType;
  budget_signal?: BudgetSignal;
  gut_feel?: GutFeel;
  stage?: LeadStage;
  proposal_amount?: number;
  proposal_sent_at?: string;
  lost_reason?: string;
  source?: string;
  notes?: string;
}

export interface ConvertLeadRequest {
  project_name?: string;
  project_type?: ProjectType;
}

// Clients
export interface CreateClientRequest {
  business_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  status?: ClientStatus;
  notes?: string;
  client_since?: string;
}

export interface UpdateClientRequest {
  business_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  status?: ClientStatus;
  notes?: string;
  client_since?: string;
}

// Projects
export interface CreateProjectRequest {
  client_id: string;
  name: string;
  status?: ProjectStatus;
  project_type?: ProjectType;
  value?: number;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  status?: ProjectStatus;
  project_type?: ProjectType;
  value?: number;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

// Deliverables
export interface CreateDeliverableRequest {
  name: string;
  status?: DeliverableStatus;
  sort_order?: number;
}

export interface UpdateDeliverableRequest {
  name?: string;
  status?: DeliverableStatus;
  sort_order?: number;
}

// Invoices
export interface CreateInvoiceRequest {
  project_id: string;
  description?: string;
  amount: number;
  status?: InvoiceStatus;
  due_date?: string;
}

export interface UpdateInvoiceRequest {
  description?: string;
  amount?: number;
  status?: InvoiceStatus;
  due_date?: string;
}

// ----------------------------------------------------------------------------
// Dashboard Stats Types
// ----------------------------------------------------------------------------

export interface DashboardStats {
  leads: {
    new: number;
    proposals_out: number;
    pipeline_value: number;
  };
  money: {
    collected_this_month: number;
    outstanding: number;
    overdue: number;
  };
  projects: {
    active: number;
  };
  conversion: {
    won: number;
    total: number;
    rate: number;
  };
}

export interface MoneyStats {
  period: string;
  revenue: number;
  collected: number;
  outstanding: number;
  overdue: number;
}

// ----------------------------------------------------------------------------
// Pipeline Summary Types
// ----------------------------------------------------------------------------

export interface PipelineSummary {
  stage: LeadStage;
  count: number;
  value: number;
}

// ----------------------------------------------------------------------------
// API Response Types
// ----------------------------------------------------------------------------

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: string;
}

export interface ListResponse<T> {
  data: T[];
  count: number;
}
