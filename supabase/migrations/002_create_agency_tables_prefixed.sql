-- ============================================================================
-- Labcast Agency OS - Database Schema (Prefixed)
-- Migration 002: Create all core tables with agency_ prefix
-- This avoids conflicts with existing Render Vault tables
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUM TYPES (prefixed to avoid conflicts)
-- ============================================================================

-- Service types for leads
CREATE TYPE agency_service_type AS ENUM (
  'website',
  'meta_ads',
  'website_and_ads',
  'creative',
  'other'
);

-- Budget signals for qualifying leads
CREATE TYPE agency_budget_signal AS ENUM (
  'unknown',
  'under_2k',
  '2k_5k',
  '5k_10k',
  '10k_plus'
);

-- Gut feel / lead temperature
CREATE TYPE agency_gut_feel AS ENUM (
  'hot',
  'warm',
  'cool'
);

-- Lead pipeline stages
CREATE TYPE agency_lead_stage AS ENUM (
  'new',
  'talking',
  'proposal_sent',
  'won',
  'lost'
);

-- Client status
CREATE TYPE agency_client_status AS ENUM (
  'active',
  'retainer',
  'past'
);

-- Project status
CREATE TYPE agency_project_status AS ENUM (
  'active',
  'waiting_on_client',
  'in_progress',
  'completed'
);

-- Project type
CREATE TYPE agency_project_type AS ENUM (
  'project',
  'retainer'
);

-- Deliverable status
CREATE TYPE agency_deliverable_status AS ENUM (
  'pending',
  'in_progress',
  'in_review',
  'approved'
);

-- Invoice status
CREATE TYPE agency_invoice_status AS ENUM (
  'draft',
  'sent',
  'paid',
  'overdue'
);

-- Activity entity types
CREATE TYPE agency_activity_entity_type AS ENUM (
  'lead',
  'client',
  'project',
  'invoice'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. AGENCY_CLIENTS
-- People/businesses we've worked with
-- ----------------------------------------------------------------------------
CREATE TABLE agency_clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  status agency_client_status NOT NULL DEFAULT 'active',
  notes TEXT,
  client_since DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_agency_clients_status ON agency_clients(status);
CREATE INDEX idx_agency_clients_created_at ON agency_clients(created_at DESC);

-- ----------------------------------------------------------------------------
-- 2. AGENCY_LEADS
-- Track people from first contact through to won/lost
-- ----------------------------------------------------------------------------
CREATE TABLE agency_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  business_name TEXT,
  email TEXT,
  phone TEXT,
  service_type agency_service_type DEFAULT 'other',
  budget_signal agency_budget_signal DEFAULT 'unknown',
  gut_feel agency_gut_feel DEFAULT 'warm',
  stage agency_lead_stage NOT NULL DEFAULT 'new',
  proposal_amount DECIMAL(10, 2),
  proposal_sent_at TIMESTAMPTZ,
  lost_reason TEXT,
  source TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  converted_to_client_id UUID REFERENCES agency_clients(id) ON DELETE SET NULL
);

-- Indexes for common queries
CREATE INDEX idx_agency_leads_stage ON agency_leads(stage);
CREATE INDEX idx_agency_leads_gut_feel ON agency_leads(gut_feel);
CREATE INDEX idx_agency_leads_created_at ON agency_leads(created_at DESC);

-- ----------------------------------------------------------------------------
-- 3. AGENCY_PROJECTS
-- Active work for clients
-- ----------------------------------------------------------------------------
CREATE TABLE agency_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES agency_clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status agency_project_status NOT NULL DEFAULT 'active',
  project_type agency_project_type NOT NULL DEFAULT 'project',
  value DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_agency_projects_client_id ON agency_projects(client_id);
CREATE INDEX idx_agency_projects_status ON agency_projects(status);
CREATE INDEX idx_agency_projects_created_at ON agency_projects(created_at DESC);

-- ----------------------------------------------------------------------------
-- 4. AGENCY_DELIVERABLES
-- Items within a project
-- ----------------------------------------------------------------------------
CREATE TABLE agency_deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES agency_projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status agency_deliverable_status NOT NULL DEFAULT 'pending',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_agency_deliverables_project_id ON agency_deliverables(project_id);
CREATE INDEX idx_agency_deliverables_status ON agency_deliverables(status);

-- ----------------------------------------------------------------------------
-- 5. AGENCY_INVOICES
-- Payment tracking, synced with Stripe
-- ----------------------------------------------------------------------------
CREATE TABLE agency_invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES agency_projects(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT,
  description TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  status agency_invoice_status NOT NULL DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_agency_invoices_project_id ON agency_invoices(project_id);
CREATE INDEX idx_agency_invoices_status ON agency_invoices(status);
CREATE INDEX idx_agency_invoices_due_date ON agency_invoices(due_date);
CREATE INDEX idx_agency_invoices_stripe_id ON agency_invoices(stripe_invoice_id);

-- ----------------------------------------------------------------------------
-- 6. AGENCY_ACTIVITY_LOG
-- Track what happened for the activity feed
-- ----------------------------------------------------------------------------
CREATE TABLE agency_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type agency_activity_entity_type NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX idx_agency_activity_log_entity ON agency_activity_log(entity_type, entity_id);
CREATE INDEX idx_agency_activity_log_created_at ON agency_activity_log(created_at DESC);

-- ============================================================================
-- VIEWS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Clients with computed stats
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW agency_clients_with_stats AS
SELECT
  c.*,
  COALESCE(SUM(p.value), 0)::DECIMAL(10, 2) AS lifetime_value,
  COUNT(p.id)::INTEGER AS project_count,
  EXTRACT(MONTH FROM AGE(NOW(), c.client_since))::INTEGER AS months_as_client
FROM agency_clients c
LEFT JOIN agency_projects p ON p.client_id = c.id
GROUP BY c.id;

-- ----------------------------------------------------------------------------
-- Pipeline summary by stage
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW agency_pipeline_summary AS
SELECT
  stage,
  COUNT(*)::INTEGER AS count,
  COALESCE(SUM(CASE WHEN proposal_amount IS NOT NULL THEN proposal_amount ELSE 0 END), 0)::DECIMAL(10, 2) AS value
FROM agency_leads
WHERE stage NOT IN ('won', 'lost')
GROUP BY stage;

-- ----------------------------------------------------------------------------
-- Monthly revenue summary
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW agency_monthly_revenue AS
SELECT
  DATE_TRUNC('month', i.paid_at) AS month,
  SUM(i.amount)::DECIMAL(10, 2) AS revenue,
  COUNT(i.id)::INTEGER AS invoice_count
FROM agency_invoices i
WHERE i.status = 'paid'
GROUP BY DATE_TRUNC('month', i.paid_at)
ORDER BY month DESC;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Auto-update updated_at timestamp
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION agency_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_agency_clients_updated_at
  BEFORE UPDATE ON agency_clients
  FOR EACH ROW EXECUTE FUNCTION agency_update_updated_at_column();

CREATE TRIGGER update_agency_leads_updated_at
  BEFORE UPDATE ON agency_leads
  FOR EACH ROW EXECUTE FUNCTION agency_update_updated_at_column();

CREATE TRIGGER update_agency_projects_updated_at
  BEFORE UPDATE ON agency_projects
  FOR EACH ROW EXECUTE FUNCTION agency_update_updated_at_column();

CREATE TRIGGER update_agency_deliverables_updated_at
  BEFORE UPDATE ON agency_deliverables
  FOR EACH ROW EXECUTE FUNCTION agency_update_updated_at_column();

CREATE TRIGGER update_agency_invoices_updated_at
  BEFORE UPDATE ON agency_invoices
  FOR EACH ROW EXECUTE FUNCTION agency_update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Activity logging function
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION agency_log_activity(
  p_entity_type agency_activity_entity_type,
  p_entity_id UUID,
  p_action TEXT,
  p_details JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO agency_activity_log (entity_type, entity_id, action, details)
  VALUES (p_entity_type, p_entity_id, p_action, p_details)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE agency_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can do everything (two-person agency)
CREATE POLICY "Authenticated users full access" ON agency_clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON agency_leads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON agency_projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON agency_deliverables
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON agency_invoices
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON agency_activity_log
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE agency_clients IS 'Agency OS: People/businesses we have worked with';
COMMENT ON TABLE agency_leads IS 'Agency OS: Track leads from first contact through to won/lost';
COMMENT ON TABLE agency_projects IS 'Agency OS: Active work for clients';
COMMENT ON TABLE agency_deliverables IS 'Agency OS: Items/tasks within a project';
COMMENT ON TABLE agency_invoices IS 'Agency OS: Payment tracking, synced with Stripe';
COMMENT ON TABLE agency_activity_log IS 'Agency OS: Audit log for tracking changes';

COMMENT ON VIEW agency_clients_with_stats IS 'Agency OS: Clients with computed lifetime value and project count';
COMMENT ON VIEW agency_pipeline_summary IS 'Agency OS: Lead pipeline summary grouped by stage';
COMMENT ON VIEW agency_monthly_revenue IS 'Agency OS: Monthly revenue from paid invoices';
