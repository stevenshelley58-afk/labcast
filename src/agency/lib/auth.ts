// ============================================================================
// Labcast Agency OS - Authentication Utilities
// ============================================================================

import { NextResponse } from 'next/server';
import { createAgencyServerClient } from './supabase';

export interface SessionUser {
  id: string;
  email: string | null;
  user_metadata: Record<string, unknown> | null;
}

/**
 * Get the current authenticated user from the session.
 * In development, falls back to a dev user for easier testing.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createAgencyServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data.user) {
    return {
      id: data.user.id,
      email: data.user.email ?? null,
      user_metadata: data.user.user_metadata ?? null,
    };
  }

  // In development, provide a fallback dev user for easier testing
  if (process.env.NODE_ENV === 'development') {
    return {
      id: 'dev-user-id',
      email: 'dev@labcast.com.au',
      user_metadata: { full_name: 'Dev User' },
    };
  }

  return null;
}

/**
 * Standard unauthorized response
 */
export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

/**
 * Standard not found response
 */
export function notFoundResponse(resource = 'Resource') {
  return NextResponse.json({ error: `${resource} not found` }, { status: 404 });
}

/**
 * Standard bad request response
 */
export function badRequestResponse(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * Standard database error response
 */
export function dbErrorResponse(message: string, error?: unknown, status = 500) {
  const details =
    typeof error === 'object' && error !== null && 'message' in error
      ? (error as { message: string }).message
      : undefined;
  return NextResponse.json({ error: message, details }, { status });
}
