'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfilePageWrapper } from '@/rendervault/components/profile/ProfilePageWrapper';
import type { BrandInfo } from '@/rendervault/components/profile/sections/BrandSection';
import type { BillingInfo, CreditTransaction } from '@/rendervault/components/profile/sections/BillingCreditsSection';
import type { ProjectsUsage } from '@/rendervault/components/profile/sections/ProjectsUsageSection';

type ProfileBasics = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  company_name: string;
  country: string;
  timezone: string;
  role: string;
  created_at: string;
  member_id: string;
};

type BrandApiPayload = {
  brand_name: string | null;
  brand_summary: string | null;
  tone_of_voice: string | null;
  visual_style: string | null;
  font_preferences: string | null;
  notes: string | null;
  logo_url: string | null;
  primary_colors?: string[] | null;
};

type BillingApiPayload = {
  plan: string | null;
  credits_balance: number;
  recent_transactions: Array<
    {
      reason: string | null;
    } & Omit<CreditTransaction, 'reason'>
  >;
};

type ProfileApiResponse = {
  profile: ProfileBasics;
  brand: BrandApiPayload;
  billing: BillingApiPayload;
  usage: ProjectsUsage;
};

type ProfileData = {
  profile: ProfileBasics;
  brand: BrandInfo;
  billing: BillingInfo;
  usage: ProjectsUsage;
};

function normalizeBrand(brand: BrandApiPayload): BrandInfo {
  return {
    brand_name: brand.brand_name ?? '',
    brand_summary: brand.brand_summary ?? '',
    tone_of_voice: brand.tone_of_voice ?? '',
    visual_style: brand.visual_style ?? '',
    logo_url: brand.logo_url,
    primary_colors: brand.primary_colors ?? [],
    font_preferences: brand.font_preferences ?? '',
    notes: brand.notes ?? '',
  };
}

function normalizeBilling(billing: BillingApiPayload): BillingInfo {
  return {
    plan: billing.plan,
    credits_balance: billing.credits_balance,
    recent_transactions: billing.recent_transactions.map((tx) => ({
      ...tx,
      reason: tx.reason ?? 'transaction',
    })),
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<ProfileData | null>(null);
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
        const payload = (await res.json()) as ProfileApiResponse;
        setData({
          profile: payload.profile,
          brand: normalizeBrand(payload.brand),
          billing: normalizeBilling(payload.billing),
          usage: payload.usage,
        });
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


