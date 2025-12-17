// ============================================================================
// Labcast Agency OS - Stripe Integration
// ============================================================================

import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

/**
 * Get the Stripe client instance (singleton pattern)
 */
export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripeClient;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  return getStripeClient().webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );
}

/**
 * Create a Stripe invoice
 */
export async function createStripeInvoice(params: {
  customerEmail: string;
  amount: number; // in cents
  description: string;
  dueDate?: Date;
}): Promise<Stripe.Invoice> {
  const stripe = getStripeClient();

  // Find or create customer
  const customers = await stripe.customers.list({
    email: params.customerEmail,
    limit: 1,
  });

  let customerId: string;
  if (customers.data.length > 0) {
    customerId = customers.data[0].id;
  } else {
    const customer = await stripe.customers.create({
      email: params.customerEmail,
    });
    customerId = customer.id;
  }

  // Create invoice item
  await stripe.invoiceItems.create({
    customer: customerId,
    amount: params.amount,
    currency: 'aud',
    description: params.description,
  });

  // Create and finalize invoice
  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: params.dueDate
      ? Math.ceil((params.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 14,
    auto_advance: true,
  });

  return invoice;
}

/**
 * Send a payment reminder for an existing invoice
 */
export async function sendPaymentReminder(
  stripeInvoiceId: string
): Promise<void> {
  const stripe = getStripeClient();

  // Retrieve the invoice to get customer info
  const invoice = await stripe.invoices.retrieve(stripeInvoiceId);

  if (!invoice.customer) {
    throw new Error('Invoice has no associated customer');
  }

  // Send the invoice again (Stripe will send a reminder email)
  await stripe.invoices.sendInvoice(stripeInvoiceId);
}

/**
 * Get invoice status from Stripe
 */
export async function getStripeInvoiceStatus(
  stripeInvoiceId: string
): Promise<{ status: string; paidAt?: Date }> {
  const stripe = getStripeClient();
  const invoice = await stripe.invoices.retrieve(stripeInvoiceId);

  return {
    status: invoice.status ?? 'unknown',
    paidAt: invoice.status_transitions?.paid_at
      ? new Date(invoice.status_transitions.paid_at * 1000)
      : undefined,
  };
}
