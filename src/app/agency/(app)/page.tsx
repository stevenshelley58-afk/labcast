'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type DashboardStats = {
  mtd_collected: number;
  outstanding: number;
  active_projects: number;
  hot_leads: number;
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function StatCard({ label, value, href }: { label: string; value: string | number; href?: string }) {
  const content = (
    <div className="bg-white rounded-2xl border border-black/5 p-6 shadow-soft hover:shadow-card transition-shadow">
      <p className="text-xs text-muted uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function AgencyDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agency/stats/dashboard')
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-32 bg-black/5 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-black/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Your agency at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="MTD Collected"
          value={stats ? formatCurrency(stats.mtd_collected) : '$0'}
        />
        <StatCard
          label="Outstanding"
          value={stats ? formatCurrency(stats.outstanding) : '$0'}
          href="/agency/invoices"
        />
        <StatCard
          label="Active Projects"
          value={stats?.active_projects ?? 0}
          href="/agency/projects"
        />
        <StatCard
          label="Hot Leads"
          value={stats?.hot_leads ?? 0}
          href="/agency/leads"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Link
          href="/agency/leads?new=1"
          className="flex items-center gap-3 bg-white rounded-xl border border-black/5 p-4 text-sm hover:bg-black/[0.02] transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs">+</span>
          Add Lead
        </Link>
        <Link
          href="/agency/projects?new=1"
          className="flex items-center gap-3 bg-white rounded-xl border border-black/5 p-4 text-sm hover:bg-black/[0.02] transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs">+</span>
          New Project
        </Link>
        <Link
          href="/agency/invoices?new=1"
          className="flex items-center gap-3 bg-white rounded-xl border border-black/5 p-4 text-sm hover:bg-black/[0.02] transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs">+</span>
          Create Invoice
        </Link>
      </div>
    </div>
  );
}
