// ============================================================================
// Labcast Agency OS - Activity Logging
// ============================================================================

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ActivityEntityType } from './types';

/**
 * Log an activity to the activity_log table
 */
export async function logActivity(
  supabase: SupabaseClient,
  entityType: ActivityEntityType,
  entityId: string,
  action: string,
  details: Record<string, unknown> = {}
): Promise<void> {
  await supabase.from('agency_activity_log').insert({
    entity_type: entityType,
    entity_id: entityId,
    action,
    details,
  });
}

/**
 * Get recent activity for the dashboard
 */
export async function getRecentActivity(
  supabase: SupabaseClient,
  limit = 20
) {
  const { data, error } = await supabase
    .from('agency_activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

/**
 * Get activity for a specific entity
 */
export async function getEntityActivity(
  supabase: SupabaseClient,
  entityType: ActivityEntityType,
  entityId: string,
  limit = 50
) {
  const { data, error } = await supabase
    .from('agency_activity_log')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
