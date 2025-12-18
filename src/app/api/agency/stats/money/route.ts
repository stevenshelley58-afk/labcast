// ============================================================================
// Labcast Agency OS - Money Stats API
// GET /api/agency/stats/money - Get money/revenue statistics
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
 * GET /api/agency/stats/money
 * Get money statistics with optional period filtering
 * Query params: period (month, quarter, year, all)
 */
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const supabase = requireAgencyServiceRoleClient();
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || 'month';

  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'quarter':
      const quarterStart = Math.floor(now.getMonth() / 3) * 3;
      startDate = new Date(now.getFullYear(), quarterStart, 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case 'all':
      startDate = new Date(2000, 0, 1); // Effectively all time
      break;
    case 'month':
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
  }

  const startDateStr = startDate.toISOString();
  const today = now.toISOString().split('T')[0];

  // Update overdue invoices
  await supabase
    .from('agency_invoices')
    .update({ status: 'overdue' })
    .eq('status', 'sent')
    .lt('due_date', today);

  // Get all invoices for calculations
  const { data: invoices, error: invError } = await supabase
    .from('agency_invoices')
    .select(`
      *,
      project:agency_projects(id, name, project_type)
    `)
    .gte('created_at', startDateStr);

  if (invError) {
    return dbErrorResponse('Failed to fetch invoices', invError);
  }

  // Calculate totals
  const allInvoices = invoices ?? [];

  const collected = allInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const outstanding = allInvoices
    .filter(inv => inv.status === 'sent')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const overdue = allInvoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const revenue = collected + outstanding + overdue;

  // Get won deals value
  const { data: wonLeads, error: leadsError } = await supabase
    .from('agency_leads')
    .select('proposal_amount')
    .eq('stage', 'won')
    .gte('updated_at', startDateStr);

  if (leadsError) {
    return dbErrorResponse('Failed to fetch won deals', leadsError);
  }

  const wonValue = (wonLeads ?? [])
    .reduce((sum, lead) => sum + (Number(lead.proposal_amount) || 0), 0);

  // Get pipeline value
  const { data: pipelineLeads, error: pipelineError } = await supabase
    .from('agency_leads')
    .select('proposal_amount')
    .eq('stage', 'proposal_sent');

  if (pipelineError) {
    return dbErrorResponse('Failed to fetch pipeline', pipelineError);
  }

  const pipelineValue = (pipelineLeads ?? [])
    .reduce((sum, lead) => sum + (Number(lead.proposal_amount) || 0), 0);

  // Breakdown by project type
  const projectRevenue = allInvoices
    .filter(inv => inv.status === 'paid' && inv.project?.project_type === 'project')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  const retainerRevenue = allInvoices
    .filter(inv => inv.status === 'paid' && inv.project?.project_type === 'retainer')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  // Monthly breakdown (last 6 months)
  const monthlyBreakdown: Array<{
    month: string;
    label: string;
    collected: number;
    invoiced: number;
  }> = [];

  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
    const monthKey = monthDate.toISOString().slice(0, 7); // YYYY-MM
    const monthLabel = monthDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });

    const monthInvoices = allInvoices.filter(inv => {
      const invDate = new Date(inv.created_at);
      return invDate >= monthDate && invDate <= monthEnd;
    });

    const monthCollected = monthInvoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    const monthInvoiced = monthInvoices
      .reduce((sum, inv) => sum + Number(inv.amount), 0);

    monthlyBreakdown.push({
      month: monthKey,
      label: monthLabel,
      collected: monthCollected,
      invoiced: monthInvoiced,
    });
  }

  return NextResponse.json({
    period,
    summary: {
      revenue,
      collected,
      outstanding,
      overdue,
      won_deals: wonValue,
      pipeline: pipelineValue,
    },
    breakdown: {
      project_revenue: projectRevenue,
      retainer_revenue: retainerRevenue,
    },
    monthly: monthlyBreakdown,
    invoices: allInvoices,
  });
}
