import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from './supabase/server';

export type SessionUser = {
  id: string;
  email: string | null;
  user_metadata: Record<string, unknown> | null;
};

function mapUser(user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> | null }): SessionUser {
  return {
    id: user.id,
    email: user.email ?? null,
    user_metadata: user.user_metadata ?? null,
  };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  if (process.env.NODE_ENV === 'development') {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (!error && data.user) {
      return mapUser(data.user);
    }

    return mapUser({
      id: 'dev-user-id',
      email: 'dev@rendervault.studio',
      user_metadata: { full_name: 'Dev User' },
    });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }
  return mapUser(data.user);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
