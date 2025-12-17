// ============================================================================
// Labcast Agency OS - Single Client API
// GET /api/agency/clients/:id - Get a single client with projects
// PATCH /api/agency/clients/:id - Update a client
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';
import { logActivity } from '@/agency/lib/activity';
import type { UpdateClientRequest, Client } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agency/clients/:id
 * Get a single client by ID with their projects
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = createAgencyServiceRoleClient();

  // Try to get from the view first (includes computed stats)
  const { data: clientWithStats, error: viewError } = await supabase
    .from('clients_with_stats')
    .select('*')
    .eq('id', id)
    .single();

  let client = clientWithStats;

  // If view doesn't exist, fall back to regular table
  if (viewError && viewError.message?.includes('clients_with_stats')) {
    const { data: regularClient, error: fetchError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return notFoundResponse('Client');
      }
      return dbErrorResponse('Failed to fetch client', fetchError);
    }

    client = {
      ...regularClient,
      lifetime_value: 0,
      project_count: 0,
      months_as_client: null,
    };
  } else if (viewError) {
    if (viewError.code === 'PGRST116') {
      return notFoundResponse('Client');
    }
    return dbErrorResponse('Failed to fetch client', viewError);
  }

  // Get client's projects
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false });

  if (projectsError) {
    return dbErrorResponse('Failed to fetch client projects', projectsError);
  }

  return NextResponse.json({
    client,
    projects: projects ?? [],
  });
}

/**
 * PATCH /api/agency/clients/:id
 * Update a client
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: UpdateClientRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  const supabase = createAgencyServiceRoleClient();

  // First verify the client exists
  const { data: existingClient, error: fetchError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Client');
    }
    return dbErrorResponse('Failed to fetch client', fetchError);
  }

  // Build update data
  const updateData: Partial<Client> = {};

  if (body.business_name !== undefined) updateData.business_name = body.business_name.trim();
  if (body.contact_name !== undefined) updateData.contact_name = body.contact_name.trim() || null;
  if (body.email !== undefined) updateData.email = body.email.trim() || null;
  if (body.phone !== undefined) updateData.phone = body.phone.trim() || null;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null;
  if (body.client_since !== undefined) updateData.client_since = body.client_since;

  const { data, error } = await supabase
    .from('clients')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to update client', error);
  }

  // Log status changes
  if (body.status && body.status !== existingClient.status) {
    await logActivity(supabase, 'client', id, 'status_changed', {
      from: existingClient.status,
      to: body.status,
    });
  }

  return NextResponse.json({ client: data });
}
