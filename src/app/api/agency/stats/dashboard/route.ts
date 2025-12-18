// ============================================================================
// Labcast Agency OS - Dashboard Stats API
// GET /api/agency/stats/dashboard - Get dashboard statistics
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';
import type { DashboardStats } from '@/agency/lib/types';

export const dynamic = 'force-dynamic';

/**
 * GET /api/agency/stats/dashboard
 * Get comprehensive dashboard statistics
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = createAgencyServiceRoleClient();

  // Get start of current month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const today = now.toISOString().split('T')[0];

  // First, update any overdue invoices
  await supabase
    .from('agency_invoices')
    .update({ status: 'overdue' })
    .eq('status', 'sent')
    .lt('due_date', today);

  // Run all queries in parallel
  const [
    newLeadsResult,
    proposalsResult,
    pipelineResult,
    collectedResult,
    outstandingResult,
    overdueResult,
    activeProjectsResult,
    wonLeadsResult,
    totalLeadsResult,
  ] = await Promise.all([
    // New leads count
    supabase
      .from('agency_leads')
      .select('id', { count: 'exact', head: true })
      .eq('stage', 'new'),

    // Proposals out count
    supabase
      .from('agency_leads')
      .select('id', { count: 'exact', head: true })
      .eq('stage', 'proposal_sent'),

    // Pipeline value (proposals pending decision)
    supabase
      .from('agency_leads')
      .select('proposal_amount')
      .eq('stage', 'proposal_sent'),

    // Collected this month
    supabase
      .from('agency_invoices')
      .select('amount')
      .eq('status', 'paid')
      .gte('paid_at', monthStart),

    // Outstanding (sent but not paid)
    supabase
      .from('agency_invoices')
      .select('amount')
      .eq('status', 'sent'),

    // Overdue
    supabase
      .from('agency_invoices')
      .select('amount')
      .eq('status', 'overdue'),

    // Active projects
    supabase
      .from('agency_projects')
      .select('id', { count: 'exact', head: true })
      .in('status', ['active', 'in_progress', 'waiting_on_client']),

    // Won leads this month
    supabase
      .from('agency_leads')
      .select('id', { count: 'exact', head: true })
      .eq('stage', 'won')
      .gte('updated_at', monthStart),

    // Total leads this month (for conversion calculation)
    supabase
      .from('agency_leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', monthStart),
  ]);

  // Check for errors
  const results = [
    newLeadsResult,
    proposalsResult,
    pipelineResult,
    collectedResult,
    outstandingResult,
    overdueResult,
    activeProjectsResult,
    wonLeadsResult,
    totalLeadsResult,
  ];

  for (const result of results) {
    if (result.error) {
      return dbErrorResponse('Failed to fetch dashboard stats', result.error);
    }
  }

  // Calculate values
  const pipelineValue = (pipelineResult.data ?? [])
    .reduce((sum, lead) => sum + (Number(lead.proposal_amount) || 0), 0);

  const collectedThisMonth = (collectedResult.data ?? [])
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const outstanding = (outstandingResult.data ?? [])
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const overdue = (overdueResult.data ?? [])
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const won = wonLeadsResult.count ?? 0;
  const total = totalLeadsResult.count ?? 0;
  const conversionRate = total > 0 ? won / total : 0;

  const stats: DashboardStats = {
    leads: {
      new: newLeadsResult.count ?? 0,
      proposals_out: proposalsResult.count ?? 0,
      pipeline_value: pipelineValue,
    },
    money: {
      collected_this_month: collectedThisMonth,
      outstanding: outstanding + overdue,
      overdue,
    },
    projects: {
      active: activeProjectsResult.count ?? 0,
    },
    conversion: {
      won,
      total,
      rate: Math.round(conversionRate * 100) / 100,
    },
  };

  return NextResponse.json(stats);
}
