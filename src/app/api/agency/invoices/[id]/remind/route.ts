// ============================================================================
// Labcast Agency OS - Invoice Reminder API
// POST /api/agency/invoices/:id/remind - Send a payment reminder
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAgencyServiceRoleClient } from '@/agency/lib/supabase';
import {
  getSessionUser,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
  dbErrorResponse,
} from '@/agency/lib/auth';
import { logActivity } from '@/agency/lib/activity';
import { sendPaymentReminder } from '@/agency/lib/stripe';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * POST /api/agency/invoices/:id/remind
 * Send a payment reminder via Stripe or email
 */
export async function POST(req: NextRequest, context: RouteContext) {
  const user = await getSessionUser();
  if (!user) return unauthorizedResponse();

  const { id } = await context.params;
  const supabase = requireAgencyServiceRoleClient();

  // Get the invoice with project and client info
  const { data: invoice, error: fetchError } = await supabase
    .from('agency_invoices')
    .select(`
      *,
      project:agency_projects(
        id,
        name,
        client:agency_clients(id, business_name, email)
      )
    `)
    .eq('id', id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return notFoundResponse('Invoice');
    }
    return dbErrorResponse('Failed to fetch invoice', fetchError);
  }

  // Validate invoice can receive a reminder
  if (invoice.status === 'paid') {
    return badRequestResponse('Cannot send reminder for paid invoice');
  }

  if (invoice.status === 'draft') {
    return badRequestResponse('Cannot send reminder for draft invoice');
  }

  // If there's a Stripe invoice ID, try to send via Stripe
  if (invoice.stripe_invoice_id) {
    try {
      await sendPaymentReminder(invoice.stripe_invoice_id);

      // Log activity
      await logActivity(supabase, 'invoice', id, 'reminder_sent', {
        method: 'stripe',
        amount: invoice.amount,
      });

      return NextResponse.json({
        success: true,
        message: 'Payment reminder sent via Stripe',
      });
    } catch (stripeError) {
      console.error('Stripe reminder failed:', stripeError);
      // Fall through to manual reminder
    }
  }

  // For non-Stripe invoices, just log that a reminder should be sent
  // In a real implementation, this would trigger an email via Resend or similar
  const client = invoice.project?.client;
  const clientEmail = Array.isArray(client) ? client[0]?.email : client?.email;

  await logActivity(supabase, 'invoice', id, 'reminder_requested', {
    method: 'manual',
    amount: invoice.amount,
    client_email: clientEmail,
  });

  return NextResponse.json({
    success: true,
    message: 'Payment reminder logged. Send manual follow-up to: ' + (clientEmail || 'unknown'),
    client_email: clientEmail,
  });
}
