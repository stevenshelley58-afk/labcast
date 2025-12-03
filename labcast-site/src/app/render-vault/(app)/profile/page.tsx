'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfilePageWrapper } from '@/rendervault/components/profile/ProfilePageWrapper';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<{
    profile: any;
    brand: any;
    billing: any;
    usage: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/render-vault/api/me');
        if (res.status === 401) {
          router.push('/render-vault/login');
          return;
        }
        if (!res.ok) {
          throw new Error('Failed to load profile data.');
        }
        const payload = await res.json();
        setData(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-subtle">Loading profile...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">{error || 'Failed to load profile'}</div>
      </div>
    );
  }

  return (
    <ProfilePageWrapper
      initialProfile={data.profile}
      initialBrand={data.brand}
      initialBilling={data.billing}
      initialUsage={data.usage}
    />
  );
}


