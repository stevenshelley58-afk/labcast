// ============================================================================
// Labcast Agency OS - Single Invoice API
// GET /api/agency/invoices/:id - Get a single invoice
// PATCH /api/agency/invoices/:id - Update an invoice
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
import type { UpdateInvoiceRequest, Invoice } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/agency/invoices/:id
 * Get a single invoice
 */
export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = createAgencyServiceRoleClient();

  const { data, error } = await supabase
    .from('agency_invoices')
    .select(`
      *,
      project:agency_projects(
        id,
        name,
        client:agency_clients(id, business_name, contact_name, email, phone)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return notFoundResponse('Invoice');
    }
    return dbErrorResponse('Failed to fetch invoice', error);
  }

  return NextResponse.json({ invoice: data });
}

/**
 * PATCH /api/agency/invoices/:id
 * Update an invoice status
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: UpdateInvoiceRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  const supabase = createAgencyServiceRoleClient();

  // First get the existing invoice
  const { data: existing, error: fetchError } = await supabase
    .from('agency_invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Invoice');
    }
    return dbErrorResponse('Failed to fetch invoice', fetchError);
  }

  // Build update data
  const updateData: Partial<Invoice> = {};

  if (body.description !== undefined) updateData.description = body.description?.trim() || null;
  if (body.amount !== undefined) updateData.amount = body.amount;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.due_date !== undefined) updateData.due_date = body.due_date;

  // Auto-set paid_at when marking as paid
  if (body.status === 'paid' && existing.status !== 'paid') {
    updateData.paid_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('agency_invoices')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to update invoice', error);
  }

  // Log payment received
  if (body.status === 'paid' && existing.status !== 'paid') {
    await logActivity(supabase, 'invoice', id, 'payment_received', {
      amount: data.amount,
      previous_status: existing.status,
    });
  }

  return NextResponse.json({ invoice: data });
}
