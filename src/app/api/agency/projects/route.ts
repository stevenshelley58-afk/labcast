// ============================================================================
// Labcast Agency OS - Projects API
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient, isSupabaseConfigured } from '@/agency/lib/supabase';

export const dynamic = 'force-dynamic';

// Demo data
const DEMO_PROJECTS = [
  { id: '1', name: 'Meta Ads Retainer', status: 'active', service_type: 'retainer', monthly_value: 450000, start_date: '2024-01-01', client: { id: '1', company_name: 'Bondi Sands' }, created_at: new Date().toISOString() },
  { id: '2', name: 'Website Rebuild', status: 'active', service_type: 'project', monthly_value: 800000, start_date: '2024-11-01', client: { id: '2', company_name: 'The Memo' }, created_at: new Date().toISOString() },
  { id: '3', name: 'Creative Sprint', status: 'active', service_type: 'project', monthly_value: 320000, start_date: '2024-12-01', client: { id: '3', company_name: 'Eucalyptus' }, created_at: new Date().toISOString() },
];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEMO_PROJECTS);
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(DEMO_PROJECTS);
  }

  try {
    const { data, error } = await supabase
      .from('agency_projects')
      .select(`
        *,
        client:agency_clients(id, company_name, contact_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(DEMO_PROJECTS);
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
      .from('agency_projects')
      .insert({
        client_id: body.client_id,
        name: body.name,
        service_type: body.service_type || 'retainer',
        monthly_value: body.monthly_value || 0,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
