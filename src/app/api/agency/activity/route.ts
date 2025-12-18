// ============================================================================
// Labcast Agency OS - Activity Feed API
// GET /api/agency/activity - Get recent activity
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/activity
 * Get recent activity feed
 * Query params: limit (default 20), entity_type, entity_id
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = requireAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);

  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
  const entityType = searchParams.get('entity_type');
  const entityId = searchParams.get('entity_id');

  let query = supabase
    .from('agency_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (entityType) {
    query = query.eq('entity_type', entityType);
  }

  if (entityId) {
    query = query.eq('entity_id', entityId);
  }

  const { data, error } = await query;

  if (error) {
    return dbErrorResponse('Failed to fetch activity', error);
  }

  return NextResponse.json({ activity: data ?? [] });
}
