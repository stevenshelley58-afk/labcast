// ============================================================================
// Labcast Agency OS - Supabase Client Utilities
// ============================================================================

import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Create a Supabase server client for authenticated, RLS-respecting queries.
 * Use this for typical API route operations.
 */
export async function createAgencyServerClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Supabase server client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
}

/**
 * Create a Supabase service role client for privileged operations.
 * Use this for webhooks, admin operations, or bypassing RLS.
 * Returns null if not configured (for demo mode).
 */
export function createAgencyServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createServerClient(url, serviceRoleKey, {
    cookies: {
      get() {
        return undefined;
      },
    },
  });
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Create a Supabase service role client - throws if not configured.
 * Use for routes that require database access.
 */
export function requireAgencyServiceRoleClient() {
  const client = createAgencyServiceRoleClient();
  if (!client) {
    throw new Error('Database not configured');
  }
  return client;
}
