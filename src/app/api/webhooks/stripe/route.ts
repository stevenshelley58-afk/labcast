// ============================================================================
// Labcast Agency OS - Stripe Webhook Handler
// POST /api/webhooks/stripe - Handle Stripe webhook events
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createAgencyServiceRoleClient } from '@/agency/lib/supabase';
import { verifyWebhookSignature } from '@/agency/lib/stripe';
import { logActivity } from '@/agency/lib/activity';
import type Stripe from 'stripe';

export const dynamic = 'force-dynamic';

/**
 * POST /api/webhooks/stripe
 * Handle incoming Stripe webhook events
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  // Get raw body for signature verification
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = verifyWebhookSignature(body, signature);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = createAgencyServiceRoleClient();

  try {
    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(supabase, invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(supabase, invoice);
        break;
      }

      case 'invoice.sent': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceSent(supabase, invoice);
        break;
      }

      case 'invoice.finalized': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFinalized(supabase, invoice);
        break;
      }

      default:
        // Log unhandled events for debugging
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Stripe webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle invoice.paid event
 */
async function handleInvoicePaid(
  supabase: ReturnType<typeof createAgencyServiceRoleClient>,
  stripeInvoice: Stripe.Invoice
) {
  const stripeId = stripeInvoice.id;

  // Find our invoice by stripe_invoice_id
  const { data: invoice, error: findError } = await supabase
    .from('invoices')
    .select('id, amount, status')
    .eq('stripe_invoice_id', stripeId)
    .single();

  if (findError || !invoice) {
    console.log(`No matching invoice found for Stripe ID: ${stripeId}`);
    return;
  }

  // Skip if already paid
  if (invoice.status === 'paid') {
    return;
  }

  // Update invoice status
  const { error: updateError } = await supabase
    .from('invoices')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .eq('id', invoice.id);

  if (updateError) {
    console.error('Failed to update invoice:', updateError);
    return;
  }

  // Log activity
  await logActivity(supabase, 'invoice', invoice.id, 'payment_received', {
    amount: invoice.amount,
    stripe_invoice_id: stripeId,
    source: 'stripe_webhook',
  });
}

/**
 * Handle invoice.payment_failed event
 */
async function handlePaymentFailed(
  supabase: ReturnType<typeof createAgencyServiceRoleClient>,
  stripeInvoice: Stripe.Invoice
) {
  const stripeId = stripeInvoice.id;

  // Find our invoice by stripe_invoice_id
  const { data: invoice, error: findError } = await supabase
    .from('invoices')
    .select('id, amount')
    .eq('stripe_invoice_id', stripeId)
    .single();

  if (findError || !invoice) {
    console.log(`No matching invoice found for Stripe ID: ${stripeId}`);
    return;
  }

  // Log activity (don't change status, let manual follow-up happen)
  await logActivity(supabase, 'invoice', invoice.id, 'payment_failed', {
    amount: invoice.amount,
    stripe_invoice_id: stripeId,
    failure_message: stripeInvoice.last_finalization_error?.message || 'Unknown error',
  });
}

/**
 * Handle invoice.sent event
 */
async function handleInvoiceSent(
  supabase: ReturnType<typeof createAgencyServiceRoleClient>,
  stripeInvoice: Stripe.Invoice
) {
  const stripeId = stripeInvoice.id;

  // Find our invoice by stripe_invoice_id
  const { data: invoice, error: findError } = await supabase
    .from('invoices')
    .select('id, status')
    .eq('stripe_invoice_id', stripeId)
    .single();

  if (findError || !invoice) {
    console.log(`No matching invoice found for Stripe ID: ${stripeId}`);
    return;
  }

  // Update status to sent if currently draft
  if (invoice.status === 'draft') {
    await supabase
      .from('invoices')
      .update({ status: 'sent' })
      .eq('id', invoice.id);
  }
}

/**
 * Handle invoice.finalized event
 */
async function handleInvoiceFinalized(
  supabase: ReturnType<typeof createAgencyServiceRoleClient>,
  stripeInvoice: Stripe.Invoice
) {
  // This is mainly for logging/tracking purposes
  const stripeId = stripeInvoice.id;

  const { data: invoice } = await supabase
    .from('invoices')
    .select('id')
    .eq('stripe_invoice_id', stripeId)
    .single();

  if (invoice) {
    await logActivity(supabase, 'invoice', invoice.id, 'finalized', {
      stripe_invoice_id: stripeId,
    });
  }
}
