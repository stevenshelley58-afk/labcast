// ============================================================================
// Labcast Agency OS - Single Deliverable API
// PATCH /api/agency/deliverables/:id - Update a deliverable
// DELETE /api/agency/deliverables/:id - Delete a deliverable
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
import type { UpdateDeliverableRequest, Deliverable } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * PATCH /api/agency/deliverables/:id
 * Update a deliverable
 */
export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;

  let body: UpdateDeliverableRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  const supabase = createAgencyServiceRoleClient();

  // First verify the deliverable exists
  const { data: existing, error: fetchError } = await supabase
    .from('deliverables')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Deliverable');
    }
    return dbErrorResponse('Failed to fetch deliverable', fetchError);
  }

  // Build update data
  const updateData: Partial<Deliverable> = {};

  if (body.name !== undefined) updateData.name = body.name.trim();
  if (body.status !== undefined) updateData.status = body.status;
  if (body.sort_order !== undefined) updateData.sort_order = body.sort_order;

  const { data, error } = await supabase
    .from('deliverables')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to update deliverable', error);
  }

  return NextResponse.json({ deliverable: data });
}

/**
 * DELETE /api/agency/deliverables/:id
 * Delete a deliverable
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = createAgencyServiceRoleClient();

  // First verify the deliverable exists
  const { data: existing, error: fetchError } = await supabase
    .from('deliverables')
    .select('id')
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Deliverable');
    }
    return dbErrorResponse('Failed to fetch deliverable', fetchError);
  }

  const { error } = await supabase.from('deliverables').delete().eq('id', id);

  if (error) {
    return dbErrorResponse('Failed to delete deliverable', error);
  }

  return NextResponse.json({ success: true });
}
