// ============================================================================
// Labcast Agency OS - Clients API
// GET /api/agency/clients - List all clients with computed stats
// POST /api/agency/clients - Create a new client
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
import type { CreateClientRequest, Client } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/clients
 * List all clients with computed fields (lifetime_value, project_count, months_as_client)
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = createAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);

  const status = searchParams.get('status');

  // Use the clients_with_stats view for computed fields
  let query = supabase.from('agency_clients_with_stats').select('*');

  if (status) {
    query = query.eq('status', status);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    // If view doesn't exist, fall back to regular clients table
    if (error.message?.includes('agency_clients_with_stats')) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('agency_clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (fallbackError) {
        return dbErrorResponse('Failed to fetch clients', fallbackError);
      }

      // Add default computed values
      const clientsWithDefaults = (fallbackData ?? []).map(client => ({
        ...client,
        lifetime_value: 0,
        project_count: 0,
        months_as_client: null,
      }));

      return NextResponse.json({ clients: clientsWithDefaults });
    }

    return dbErrorResponse('Failed to fetch clients', error);
  }

  return NextResponse.json({ clients: data ?? [] });
}

/**
 * POST /api/agency/clients
 * Create a new client
 */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  let body: CreateClientRequest;
  try {
    body = await req.json();
  } catch {
    return badRequestResponse('Invalid JSON body');
  }

  // Validate required fields
  const businessName = body.business_name?.trim();
  if (!businessName) {
    return badRequestResponse('Business name is required');
  }

  const supabase = createAgencyServiceRoleClient();

  const insertData: Partial<Client> = {
    business_name: businessName,
    contact_name: body.contact_name?.trim() || null,
    email: body.email?.trim() || null,
    phone: body.phone?.trim() || null,
    status: body.status || 'active',
    notes: body.notes?.trim() || null,
    client_since: body.client_since || new Date().toISOString().split('T')[0],
  };

  const { data, error } = await supabase
    .from('agency_clients')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return dbErrorResponse('Failed to create client', error);
  }

  // Log activity
  await logActivity(supabase, 'client', data.id, 'created', {
    business_name: data.business_name,
  });

  return NextResponse.json({ client: data }, { status: 201 });
}
