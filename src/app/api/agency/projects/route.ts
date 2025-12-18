// ============================================================================
// Labcast Agency OS - Projects API
// GET /api/agency/projects - List all projects (filterable by status)
// POST /api/agency/projects - Create a new project
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
import type { CreateProjectRequest, Project } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/projects
 * List all projects, optionally filtered by status or client
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = createAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get('status');
  const clientId = searchParams.get('client_id');

  let query = supabase
    .from('agency_projects')
    .select(`
      *,
      client:agency_clients(id, business_name, contact_name, email)
    `);

  if (status) {
    query = query.eq('status', status);
  }

  if (clientId) {
    query = query.eq('client_id', clientId);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return dbErrorResponse('Failed to fetch projects', error);
  }

  return NextResponse.json({ projects: data ?? [] });
}

/**
 * POST /api/agency/projects
 * Create a new project
 */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  let body: CreateProjectRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  // Validate required fields
  const clientId = body.client_id?.trim();
  const name = body.name?.trim();

  if (!clientId) {
    return badRequestResponse('Client ID is required');
  }

  if (!name) {
    return badRequestResponse('Project name is required');
  }

  const supabase = createAgencyServiceRoleClient();

  // Verify the client exists
  const { data: client, error: clientError } = await supabase
    .from('agency_clients')
    .select('id, business_name')
    .eq('id', clientId)
    .single();

  if (clientError) {
    if (clientError.code === 'PGRST116') {
      return badRequestResponse('Client not found');
    }
    return dbErrorResponse('Failed to verify client', clientError);
  }

  const insertData: Partial<Project> = {
    client_id: clientId,
    name,
    status: body.status || 'active',
    project_type: body.project_type || 'project',
    value: body.value ?? null,
    start_date: body.start_date || new Date().toISOString().split('T')[0],
    end_date: body.end_date || null,
    notes: body.notes?.trim() || null,
  };

  const { data, error } = await supabase
    .from('agency_projects')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to create project', error);
  }

  // Log activity
  await logActivity(supabase, 'project', data.id, 'created', {
    name: data.name,
    client_id: client.id,
    client_name: client.business_name,
    value: data.value,
  });

  return NextResponse.json({ project: data }, { status: 201 });
}
