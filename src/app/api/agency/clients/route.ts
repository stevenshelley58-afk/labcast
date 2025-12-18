// ============================================================================
// Labcast Agency OS - Clients API
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient, isSupabaseConfigured } from '@/agency/lib/supabase';

export const dynamic = 'force-dynamic';

// Demo data
const DEMO_CLIENTS = [
  { id: '1', company_name: 'Bondi Sands', contact_name: 'Emma Wilson', email: 'emma@bondisands.com', status: 'active', lifetime_value: 5400000, active_project_count: 1, outstanding_amount: 450000, created_at: new Date().toISOString() },
  { id: '2', company_name: 'The Memo', contact_name: 'James Liu', email: 'james@thememo.com', status: 'active', lifetime_value: 1600000, active_project_count: 1, outstanding_amount: 400000, created_at: new Date().toISOString() },
  { id: '3', company_name: 'Eucalyptus', contact_name: 'Sophie Brown', email: 'sophie@eucalyptus.com', status: 'active', lifetime_value: 960000, active_project_count: 1, outstanding_amount: 0, created_at: new Date().toISOString() },
];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEMO_CLIENTS);
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(DEMO_CLIENTS);
  }

  try {
    // Try the view first, fall back to table
    let { data, error } = await supabase
      .from('agency_clients_with_stats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Fallback to basic table
      const result = await supabase
        .from('agency_clients')
        .select('*')
        .order('created_at', { ascending: false });
      data = result.data;
    }

    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(DEMO_CLIENTS);
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
      .from('agency_clients')
      .insert({
        company_name: body.company_name,
        contact_name: body.contact_name,
        email: body.email,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
