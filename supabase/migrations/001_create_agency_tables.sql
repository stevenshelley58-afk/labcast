-- ============================================================================
-- Labcast Agency OS - Database Schema
-- Migration 001: Create all core tables
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

-- Service types for leads
CREATE TYPE service_type AS ENUM (
  'website',
  'meta_ads',
  'website_and_ads',
  'creative',
  'other'
);

-- Budget signals for qualifying leads
CREATE TYPE budget_signal AS ENUM (
  'unknown',
  'under_2k',
  '2k_5k',
  '5k_10k',
  '10k_plus'
);

-- Gut feel / lead temperature
CREATE TYPE gut_feel AS ENUM (
  'hot',
  'warm',
  'cool'
);

-- Lead pipeline stages
CREATE TYPE lead_stage AS ENUM (
  'new',
  'talking',
  'proposal_sent',
  'won',
  'lost'
);

-- Client status
CREATE TYPE client_status AS ENUM (
  'active',
  'retainer',
  'past'
);

-- Project status
CREATE TYPE project_status AS ENUM (
  'active',
  'waiting_on_client',
  'in_progress',
  'completed'
);

-- Project type
CREATE TYPE project_type AS ENUM (
  'project',
  'retainer'
);

-- Deliverable status
CREATE TYPE deliverable_status AS ENUM (
  'pending',
  'in_progress',
  'in_review',
  'approved'
);

-- Invoice status
CREATE TYPE invoice_status AS ENUM (
  'draft',
  'sent',
  'paid',
  'overdue'
);

-- Activity entity types
CREATE TYPE activity_entity_type AS ENUM (
  'lead',
  'client',
  'project',
  'invoice'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CLIENTS
-- People/businesses we've worked with
-- ----------------------------------------------------------------------------
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  status client_status NOT NULL DEFAULT 'active',
  notes TEXT,
  client_since DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

-- ----------------------------------------------------------------------------
-- 2. LEADS
-- Track people from first contact through to won/lost
-- ----------------------------------------------------------------------------
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  business_name TEXT,
  email TEXT,
  phone TEXT,
  service_type service_type DEFAULT 'other',
  budget_signal budget_signal DEFAULT 'unknown',
  gut_feel gut_feel DEFAULT 'warm',
  stage lead_stage NOT NULL DEFAULT 'new',
  proposal_amount DECIMAL(10, 2),
  proposal_sent_at TIMESTAMPTZ,
  lost_reason TEXT,
  source TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  converted_to_client_id UUID REFERENCES clients(id) ON DELETE SET NULL
);

-- Indexes for common queries
CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_gut_feel ON leads(gut_feel);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ----------------------------------------------------------------------------
-- 3. PROJECTS
-- Active work for clients
-- ----------------------------------------------------------------------------
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'active',
  project_type project_type NOT NULL DEFAULT 'project',
  value DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- ----------------------------------------------------------------------------
-- 4. DELIVERABLES
-- Items within a project
-- ----------------------------------------------------------------------------
CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status deliverable_status NOT NULL DEFAULT 'pending',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_deliverables_project_id ON deliverables(project_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);

-- ----------------------------------------------------------------------------
-- 5. INVOICES
-- Payment tracking, synced with Stripe
-- ----------------------------------------------------------------------------
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT,
  description TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  status invoice_status NOT NULL DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invoices_project_id ON invoices(project_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_invoices_stripe_id ON invoices(stripe_invoice_id);

-- ----------------------------------------------------------------------------
-- 6. ACTIVITY LOG
-- Track what happened for the activity feed
-- ----------------------------------------------------------------------------
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type activity_entity_type NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- ============================================================================
-- VIEWS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Clients with computed stats
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW clients_with_stats AS
SELECT
  c.*,
  COALESCE(SUM(p.value), 0)::DECIMAL(10, 2) AS lifetime_value,
  COUNT(p.id)::INTEGER AS project_count,
  EXTRACT(MONTH FROM AGE(NOW(), c.client_since))::INTEGER AS months_as_client
FROM clients c
LEFT JOIN projects p ON p.client_id = c.id
GROUP BY c.id;

-- ----------------------------------------------------------------------------
-- Pipeline summary by stage
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW pipeline_summary AS
SELECT
  stage,
  COUNT(*)::INTEGER AS count,
  COALESCE(SUM(CASE WHEN proposal_amount IS NOT NULL THEN proposal_amount ELSE 0 END), 0)::DECIMAL(10, 2) AS value
FROM leads
WHERE stage NOT IN ('won', 'lost')
GROUP BY stage;

-- ----------------------------------------------------------------------------
-- Monthly revenue summary
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW monthly_revenue AS
SELECT
  DATE_TRUNC('month', i.paid_at) AS month,
  SUM(i.amount)::DECIMAL(10, 2) AS revenue,
  COUNT(i.id)::INTEGER AS invoice_count
FROM invoices i
WHERE i.status = 'paid'
GROUP BY DATE_TRUNC('month', i.paid_at)
ORDER BY month DESC;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Auto-update updated_at timestamp
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliverables_updated_at
  BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Activity logging function
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION log_activity(
  p_entity_type activity_entity_type,
  p_entity_id UUID,
  p_action TEXT,
  p_details JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO activity_log (entity_type, entity_id, action, details)
  VALUES (p_entity_type, p_entity_id, p_action, p_details)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can do everything (two-person agency)
CREATE POLICY "Authenticated users full access" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON deliverables
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON invoices
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON activity_log
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE clients IS 'People/businesses we have worked with';
COMMENT ON TABLE leads IS 'Track leads from first contact through to won/lost';
COMMENT ON TABLE projects IS 'Active work for clients';
COMMENT ON TABLE deliverables IS 'Items/tasks within a project';
COMMENT ON TABLE invoices IS 'Payment tracking, synced with Stripe';
COMMENT ON TABLE activity_log IS 'Audit log for tracking changes';

COMMENT ON VIEW clients_with_stats IS 'Clients with computed lifetime value and project count';
COMMENT ON VIEW pipeline_summary IS 'Lead pipeline summary grouped by stage';
COMMENT ON VIEW monthly_revenue IS 'Monthly revenue from paid invoices';
