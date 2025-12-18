-- =============================================
-- DROP ALL RENDER VAULT TABLES
-- Run this FIRST, then run 002_create_agency_tables_prefixed.sql
-- =============================================

-- Drop tables in order (respecting foreign key dependencies)
DROP TABLE IF EXISTS image_comments CASCADE;
DROP TABLE IF EXISTS image_versions CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS project_notes CASCADE;
DROP TABLE IF EXISTS project_assets CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS billing_transactions CASCADE;
DROP TABLE IF EXISTS billing_accounts CASCADE;
DROP TABLE IF EXISTS brands CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop any enums that might exist from Render Vault
DROP TYPE IF EXISTS project_type CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS image_status CASCADE;
DROP TYPE IF EXISTS version_status CASCADE;
DROP TYPE IF EXISTS asset_type CASCADE;
DROP TYPE IF EXISTS author_type CASCADE;

-- Clean up any leftover functions or triggers
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Verify cleanup
DO $$
BEGIN
  RAISE NOTICE 'Render Vault tables dropped successfully!';
END $$;
