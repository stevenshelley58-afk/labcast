// ============================================================================
// Labcast Agency OS - Single Lead API
// GET /api/agency/leads/:id - Get a single lead
// PATCH /api/agency/leads/:id - Update a lead
// DELETE /api/agency/leads/:id - Delete a lead
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
import type { UpdateLeadRequest, Lead, LeadStage } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agency/leads/:id
 * Get a single lead by ID
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = requireAgencyServiceRoleClient();

  const { data, error } = await supabase
    .from('agency_leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return notFoundResponse('Lead');
    }
    return dbErrorResponse('Failed to fetch lead', error);
  }

  return NextResponse.json({ lead: data });
}

/**
 * PATCH /api/agency/leads/:id
 * Update a lead (including stage changes)
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: UpdateLeadRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  const supabase = requireAgencyServiceRoleClient();

  // First, get the current lead to track changes
  const { data: existingLead, error: fetchError } = await supabase
    .from('agency_leads')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Lead');
    }
    return dbErrorResponse('Failed to fetch lead', fetchError);
  }

  // Build update data
  const updateData: Partial<Lead> = {};

  if (body.name !== undefined) updateData.name = body.name.trim();
  if (body.business_name !== undefined) updateData.business_name = body.business_name.trim() || null;
  if (body.email !== undefined) updateData.email = body.email.trim() || null;
  if (body.phone !== undefined) updateData.phone = body.phone.trim() || null;
  if (body.service_type !== undefined) updateData.service_type = body.service_type;
  if (body.budget_signal !== undefined) updateData.budget_signal = body.budget_signal;
  if (body.gut_feel !== undefined) updateData.gut_feel = body.gut_feel;
  if (body.stage !== undefined) updateData.stage = body.stage;
  if (body.proposal_amount !== undefined) updateData.proposal_amount = body.proposal_amount;
  if (body.lost_reason !== undefined) updateData.lost_reason = body.lost_reason?.trim() || null;
  if (body.source !== undefined) updateData.source = body.source?.trim() || null;
  if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null;

  // Handle proposal_sent_at
  if (body.proposal_sent_at !== undefined) {
    updateData.proposal_sent_at = body.proposal_sent_at;
  } else if (body.stage === 'proposal_sent' && existingLead.stage !== 'proposal_sent') {
    // Auto-set proposal_sent_at when transitioning to proposal_sent stage
    updateData.proposal_sent_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('agency_leads')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to update lead', error);
  }

  // Log activity for stage changes
  if (body.stage && body.stage !== existingLead.stage) {
    await logActivity(supabase, 'lead', id, 'stage_changed', {
      from: existingLead.stage,
      to: body.stage,
    });
  }

  return NextResponse.json({ lead: data });
}

/**
 * DELETE /api/agency/leads/:id
 * Delete a lead
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = requireAgencyServiceRoleClient();

  // First verify the lead exists
  const { data: existingLead, error: fetchError } = await supabase
    .from('agency_leads')
    .select('id, name')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Lead');
    }
    return dbErrorResponse('Failed to fetch lead', fetchError);
  }

  const { error } = await supabase.from('agency_leads').delete().eq('id', id);

  if (error) {
    return dbErrorResponse('Failed to delete lead', error);
  }

  return NextResponse.json({ success: true });
}
