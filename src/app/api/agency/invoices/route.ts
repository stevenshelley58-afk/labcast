// ============================================================================
// Labcast Agency OS - Invoices API
// GET /api/agency/invoices - List all invoices (filterable by status)
// POST /api/agency/invoices - Create a new invoice
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
import type { CreateInvoiceRequest, Invoice } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/invoices
 * List all invoices, optionally filtered by status
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = createAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get('status');
  const projectId = searchParams.get('project_id');

  // First, update any overdue invoices
  const today = new Date().toISOString().split('T')[0];
  await supabase
    .from('invoices')
    .update({ status: 'overdue' })
    .eq('status', 'sent')
    .lt('due_date', today);

  let query = supabase
    .from('invoices')
    .select(`
      *,
      project:projects(
        id,
        name,
        client:clients(id, business_name, contact_name, email)
      )
    `);

  if (status) {
    query = query.eq('status', status);
  }

  if (projectId) {
    query = query.eq('project_id', projectId);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return dbErrorResponse('Failed to fetch invoices', error);
  }

  return NextResponse.json({ invoices: data ?? [] });
}

/**
 * POST /api/agency/invoices
 * Create a new invoice
 */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  let body: CreateInvoiceRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  // Validate required fields
  const projectId = body.project_id?.trim();
  if (!projectId) {
    return badRequestResponse('Project ID is required');
  }

  if (body.amount === undefined || body.amount <= 0) {
    return badRequestResponse('Valid amount is required');
  }

  const supabase = createAgencyServiceRoleClient();

  // Verify the project exists and get client info
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      client:clients(id, business_name, email)
    `)
    .eq('id', projectId)
    .single();

  if (projectError) {
    if (projectError.code === 'PGRST116') {
      return badRequestResponse('Project not found');
    }
    return dbErrorResponse('Failed to verify project', projectError);
  }

  const insertData: Partial<Invoice> = {
    project_id: projectId,
    description: body.description?.trim() || null,
    amount: body.amount,
    status: body.status || 'draft',
    due_date: body.due_date || null,
  };

  const { data, error } = await supabase
    .from('invoices')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to create invoice', error);
  }

  // Log activity
  await logActivity(supabase, 'invoice', data.id, 'created', {
    amount: data.amount,
    project_id: project.id,
    project_name: project.name,
  });

  return NextResponse.json({ invoice: data }, { status: 201 });
}
