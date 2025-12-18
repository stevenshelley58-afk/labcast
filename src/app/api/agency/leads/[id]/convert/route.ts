// ============================================================================
// Labcast Agency OS - Convert Lead to Client
// POST /api/agency/leads/:id/convert - Convert lead to client + project
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';
import { logActivity } from '@/agency/lib/activity';
import type { ConvertLeadRequest } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * POST /api/agency/leads/:id/convert
 * Convert a lead to a client and create an initial project
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: ConvertLeadRequest = {};
  try {
    body = await req.json();
  } catch {
    // Empty body is fine
  }

  const supabase = requireAgencyServiceRoleClient();

  // Get the lead
  const { data: lead, error: leadError } = await supabase
    .from('agency_leads')
    .select('*')
    .eq('id', id)
    .single();

  if (leadError) {
    if (leadError.code === 'PGRST116') {
      return notFoundResponse('Lead');
    }
    return dbErrorResponse('Failed to fetch lead', leadError);
  }

  // Check if already converted
  if (lead.converted_to_client_id) {
    return badRequestResponse('Lead has already been converted to a client');
  }

  // Check if lead is in a valid stage to convert
  if (lead.stage === 'lost') {
    return badRequestResponse('Cannot convert a lost lead');
  }

  // Create the client
  const { data: client, error: clientError } = await supabase
    .from('agency_clients')
    .insert({
      business_name: lead.business_name || lead.name,
      contact_name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: 'active',
      notes: lead.notes,
      client_since: new Date().toISOString().split('T')[0], // Today's date
    })
    .select()
    .single();

  if (clientError) {
    return dbErrorResponse('Failed to create client', clientError);
  }

  // Log client creation
  await logActivity(supabase, 'client', client.id, 'created', {
    converted_from_lead: lead.id,
    lead_name: lead.name,
  });

  // Create the initial project
  const projectName = body.project_name ||
    `${client.business_name} - ${lead.service_type?.replace('_', ' ').replace('meta ads', 'Meta Ads') || 'Project'}`;

  const { data: project, error: projectError } = await supabase
    .from('agency_projects')
    .insert({
      client_id: client.id,
      name: projectName,
      status: 'active',
      project_type: body.project_type || 'project',
      value: lead.proposal_amount,
      start_date: new Date().toISOString().split('T')[0],
    })
    .select()
    .single();

  if (projectError) {
    // Rollback: delete the client if project creation fails
    await supabase.from('agency_clients').delete().eq('id', client.id);
    return dbErrorResponse('Failed to create project', projectError);
  }

  // Log project creation
  await logActivity(supabase, 'project', project.id, 'created', {
    client_id: client.id,
    converted_from_lead: lead.id,
    value: lead.proposal_amount,
  });

  // Update the lead to mark it as converted
  const { error: updateError } = await supabase
    .from('agency_leads')
    .update({
      stage: 'won',
      converted_to_client_id: client.id,
    })
    .eq('id', id);

  if (updateError) {
    return dbErrorResponse('Failed to update lead', updateError);
  }

  // Log lead conversion
  await logActivity(supabase, 'lead', id, 'converted', {
    client_id: client.id,
    project_id: project.id,
    proposal_amount: lead.proposal_amount,
  });

  return NextResponse.json(
    {
      success: true,
      client,
      project,
    },
    { status: 201 }
  );
}
