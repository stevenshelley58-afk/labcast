// ============================================================================
// Labcast Agency OS - Leads API
// GET /api/agency/leads - List all leads (filterable by stage)
// POST /api/agency/leads - Create a new lead
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  badRequestResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';
import { logActivity } from '@/agency/lib/activity';
import type { CreateLeadRequest, Lead } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/leads
 * List all leads, optionally filtered by stage or gut_feel
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = createAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);

  const stage = searchParams.get('stage');
  const gutFeel = searchParams.get('gut_feel');

  let query = supabase.from('agency_leads').select('*');

  if (stage) {
    query = query.eq('stage', stage);
  }

  if (gutFeel) {
    query = query.eq('gut_feel', gutFeel);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return dbErrorResponse('Failed to fetch leads', error);
  }

  return NextResponse.json({ leads: data ?? [] });
}

/**
 * POST /api/agency/leads
 * Create a new lead
 */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  let body: CreateLeadRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  // Validate required fields
  const name = body.name?.trim();
  if (!name) {
    return badRequestResponse('Name is required');
  }

  const supabase = createAgencyServiceRoleClient();

  const insertData: Partial<Lead> = {
    name,
    business_name: body.business_name?.trim() || null,
    email: body.email?.trim() || null,
    phone: body.phone?.trim() || null,
    service_type: body.service_type || 'other',
    budget_signal: body.budget_signal || 'unknown',
    gut_feel: body.gut_feel || 'warm',
    stage: 'new',
    source: body.source?.trim() || null,
    notes: body.notes?.trim() || null,
  };

  const { data, error } = await supabase
    .from('agency_leads')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to create lead', error);
  }

  // Log activity
  await logActivity(supabase, 'lead', data.id, 'created', {
    name: data.name,
    source: data.source,
  });

  return NextResponse.json({ lead: data }, { status: 201 });
}
