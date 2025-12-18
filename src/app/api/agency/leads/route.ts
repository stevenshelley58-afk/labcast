// ============================================================================
// Labcast Agency OS - Leads API
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient, isSupabaseConfigured } from '@/agency/lib/supabase';

export const dynamic = 'force-dynamic';

// Demo data
const DEMO_LEADS = [
  { id: '1', company_name: 'Koala Sleep', contact_name: 'Sarah Chen', email: 'sarah@koala.com', stage: 'qualified', service_interest: 'retainer', budget_signal: 'high', gut_feel: 'hot', next_action: 'Send proposal', next_action_date: null, notes: null, created_at: new Date().toISOString() },
  { id: '2', company_name: 'Who Gives A Crap', contact_name: 'Mike Torres', email: 'mike@wgac.com', stage: 'proposal_sent', service_interest: 'project', budget_signal: 'mid', gut_feel: 'hot', next_action: null, next_action_date: null, notes: null, created_at: new Date().toISOString() },
  { id: '3', company_name: 'Frank Green', contact_name: 'Lisa Park', email: 'lisa@frankgreen.com', stage: 'inquiry', service_interest: 'retainer', budget_signal: 'unknown', gut_feel: 'warm', next_action: 'Discovery call', next_action_date: null, notes: null, created_at: new Date().toISOString() },
];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEMO_LEADS);
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(DEMO_LEADS);
  }

  try {
    const { data, error } = await supabase
      .from('agency_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(DEMO_LEADS);
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
      .from('agency_leads')
      .insert({
        company_name: body.company_name,
        contact_name: body.contact_name,
        email: body.email,
        service_interest: body.service_interest || 'retainer',
        budget_signal: body.budget_signal || 'unknown',
        gut_feel: body.gut_feel || 'neutral',
        stage: 'inquiry',
        notes: body.notes || null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
