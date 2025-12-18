// ============================================================================
// Labcast Agency OS - Dashboard Stats API
// GET /api/agency/stats/dashboard - Get dashboard statistics
// ============================================================================

import { NextResponse } from 'next/server';
import { createAgencyServiceRoleClient, isSupabaseConfigured } from '@/agency/lib/supabase';

export const dynamic = 'force-dynamic';

// Demo data for when Supabase isn't configured
const DEMO_STATS = {
  mtd_collected: 1245000, // $12,450
  outstanding: 420000,    // $4,200
  active_projects: 3,
  hot_leads: 2,
};

/**
 * GET /api/agency/stats/dashboard
 * Get comprehensive dashboard statistics
 */
export async function GET() {
  // Return demo data if Supabase isn't configured
  if (!isSupabaseConfigured()) {
    return NextResponse.json(DEMO_STATS);
  }

  const supabase = createAgencyServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(DEMO_STATS);
  }

  try {
    // Get start of current month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Run queries in parallel
    const [collectedResult, outstandingResult, activeProjectsResult, hotLeadsResult] = await Promise.all([
      // Collected this month
      supabase
        .from('agency_invoices')
        .select('amount_cents')
        .eq('status', 'paid')
        .gte('paid_at', monthStart),

      // Outstanding (sent but not paid)
      supabase
        .from('agency_invoices')
        .select('amount_cents')
        .in('status', ['sent', 'overdue']),

      // Active projects
      supabase
        .from('agency_projects')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active'),

      // Hot leads
      supabase
        .from('agency_leads')
        .select('id', { count: 'exact', head: true })
        .eq('gut_feel', 'hot')
        .not('stage', 'in', '("won","lost")'),
    ]);

    const mtdCollected = (collectedResult.data ?? [])
      .reduce((sum, inv) => sum + (inv.amount_cents || 0), 0);

    const outstanding = (outstandingResult.data ?? [])
      .reduce((sum, inv) => sum + (inv.amount_cents || 0), 0);

    return NextResponse.json({
      mtd_collected: mtdCollected,
      outstanding: outstanding,
      active_projects: activeProjectsResult.count ?? 0,
      hot_leads: hotLeadsResult.count ?? 0,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(DEMO_STATS);
  }
}
