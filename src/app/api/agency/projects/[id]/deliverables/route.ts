// ============================================================================
// Labcast Agency OS - Project Deliverables API
// GET /api/agency/projects/:id/deliverables - List deliverables for a project
// POST /api/agency/projects/:id/deliverables - Create a new deliverable
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
import type { CreateDeliverableRequest, Deliverable } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agency/projects/:id/deliverables
 * List all deliverables for a project
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id: projectId } = await context.params;
  const supabase = createAgencyServiceRoleClient();

  // Verify project exists
  const { data: project, error: projectError } = await supabase
    .from('agency_projects')
    .select('id')
    .eq('id', projectId)
    .single();

  if (projectError) {
    if (projectError.code === 'PGRST116') {
      return notFoundResponse('Project');
    }
    return dbErrorResponse('Failed to verify project', projectError);
  }

  // Get deliverables
  const { data, error } = await supabase
    .from('agency_deliverables')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true });

  if (error) {
    return dbErrorResponse('Failed to fetch deliverables', error);
  }

  return NextResponse.json({ deliverables: data ?? [] });
}

/**
 * POST /api/agency/projects/:id/deliverables
 * Create a new deliverable for a project
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id: projectId } = await context.params;

  let body: CreateDeliverableRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  // Validate required fields
  const name = body.name?.trim();
  if (!name) {
    return badRequestResponse('Deliverable name is required');
  }

  const supabase = createAgencyServiceRoleClient();

  // Verify project exists
  const { data: project, error: projectError } = await supabase
    .from('agency_projects')
    .select('id')
    .eq('id', projectId)
    .single();

  if (projectError) {
    if (projectError.code === 'PGRST116') {
      return notFoundResponse('Project');
    }
    return dbErrorResponse('Failed to verify project', projectError);
  }

  // Get max sort_order for this project
  const { data: maxOrderResult } = await supabase
    .from('agency_deliverables')
    .select('sort_order')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const nextSortOrder = body.sort_order ?? ((maxOrderResult?.sort_order ?? 0) + 1);

  const insertData: Partial<Deliverable> = {
    project_id: projectId,
    name,
    status: body.status || 'pending',
    sort_order: nextSortOrder,
  };

  const { data, error } = await supabase
    .from('agency_deliverables')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to create deliverable', error);
  }

  return NextResponse.json({ deliverable: data }, { status: 201 });
}
