// ============================================================================
// Labcast Agency OS - Single Project API
// GET /api/agency/projects/:id - Get a single project with deliverables + invoices
// PATCH /api/agency/projects/:id - Update a project
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
import type { UpdateProjectRequest, Project } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agency/projects/:id
 * Get a single project with its deliverables and invoices
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = createAgencyServiceRoleClient();

  // Get project with client info
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(id, business_name, contact_name, email, phone)
    `)
    .eq('id', id)
    .single();

  if (projectError) {
    if (projectError.code === 'PGRST116') {
      return notFoundResponse('Project');
    }
    return dbErrorResponse('Failed to fetch project', projectError);
  }

  // Get deliverables
  const { data: deliverables, error: delivError } = await supabase
    .from('deliverables')
    .select('*')
    .eq('project_id', id)
    .order('sort_order', { ascending: true });

  if (delivError) {
    return dbErrorResponse('Failed to fetch deliverables', delivError);
  }

  // Get invoices
  const { data: invoices, error: invError } = await supabase
    .from('invoices')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: false });

  if (invError) {
    return dbErrorResponse('Failed to fetch invoices', invError);
  }

  // Calculate payment percentage
  const totalInvoiced = invoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) ?? 0;
  const totalPaid = invoices
    ?.filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + Number(inv.amount), 0) ?? 0;
  const paymentPercentage = totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0;

  return NextResponse.json({
    project,
    deliverables: deliverables ?? [],
    invoices: invoices ?? [],
    payment_summary: {
      total_invoiced: totalInvoiced,
      total_paid: totalPaid,
      payment_percentage: paymentPercentage,
    },
  });
}

/**
 * PATCH /api/agency/projects/:id
 * Update a project
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: UpdateProjectRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  const supabase = createAgencyServiceRoleClient();

  // First verify the project exists
  const { data: existingProject, error: fetchError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Project');
    }
    return dbErrorResponse('Failed to fetch project', fetchError);
  }

  // Build update data
  const updateData: Partial<Project> = {};

  if (body.name !== undefined) updateData.name = body.name.trim();
  if (body.status !== undefined) updateData.status = body.status;
  if (body.project_type !== undefined) updateData.project_type = body.project_type;
  if (body.value !== undefined) updateData.value = body.value;
  if (body.start_date !== undefined) updateData.start_date = body.start_date;
  if (body.end_date !== undefined) updateData.end_date = body.end_date;
  if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null;

  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to update project', error);
  }

  // Log status changes
  if (body.status && body.status !== existingProject.status) {
    await logActivity(supabase, 'project', id, 'status_changed', {
      from: existingProject.status,
      to: body.status,
    });
  }

  return NextResponse.json({ project: data });
}
