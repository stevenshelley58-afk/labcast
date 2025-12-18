// ============================================================================
// Labcast Agency OS - Invoices API
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient, isSupabaseConfigured } from '@/agency/lib/supabase';

export const dynamic = 'force-dynamic';

// Demo data
const DEMO_INVOICES = [
  { id: '1', invoice_number: 'INV-2024-042', status: 'sent', amount_cents: 450000, due_date: '2024-12-31', paid_at: null, project: { id: '1', name: 'Meta Ads - Dec', client: { company_name: 'Bondi Sands' } }, created_at: new Date().toISOString() },
  { id: '2', invoice_number: 'INV-2024-043', status: 'draft', amount_cents: 400000, due_date: null, paid_at: null, project: { id: '2', name: 'Website - Milestone 2', client: { company_name: 'The Memo' } }, created_at: new Date().toISOString() },
  { id: '3', invoice_number: 'INV-2024-041', status: 'paid', amount_cents: 320000, due_date: '2024-12-15', paid_at: '2024-12-14', project: { id: '3', name: 'Creative Sprint', client: { company_name: 'Eucalyptus' } }, created_at: new Date().toISOString() },
];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEMO_INVOICES);
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(DEMO_INVOICES);
  }

  try {
    const { data, error } = await supabase
      .from('agency_invoices')
      .select(`
        *,
        project:agency_projects(
          id,
          name,
          client:agency_clients(id, company_name, contact_name, email)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(DEMO_INVOICES);
  }
}

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from('agency_invoices')
      .insert({
        project_id: body.project_id,
        amount_cents: body.amount_cents,
        due_date: body.due_date || null,
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
