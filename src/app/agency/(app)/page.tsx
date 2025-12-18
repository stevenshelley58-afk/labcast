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

function StatCard({ label, value, href, large }: { label: string; value: string | number; href?: string; large?: boolean }) {
  const content = (
    <div className={`bg-white rounded-2xl border border-black/5 p-4 md:p-6 shadow-soft active:scale-[0.98] transition-transform ${large ? 'col-span-2' : ''}`}>
      <p className="text-[10px] md:text-xs text-muted uppercase tracking-wide mb-1">{label}</p>
      <p className={`font-semibold tracking-tight ${large ? 'text-4xl md:text-3xl' : 'text-2xl md:text-3xl'}`}>{value}</p>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
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
      <div className="space-y-4">
        <div className="h-6 w-24 bg-black/5 rounded" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-black/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero stat - MTD on mobile */}
      <div className="md:hidden">
        <p className="text-xs text-muted mb-1">This month</p>
        <p className="text-5xl font-semibold tracking-tight">
          {stats ? formatCurrency(stats.mtd_collected) : '$0'}
        </p>
        <p className="text-sm text-muted mt-1">collected</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="hidden md:block col-span-2 md:col-span-1">
          <StatCard
            label="MTD Collected"
            value={stats ? formatCurrency(stats.mtd_collected) : '$0'}
          />
        </div>
        <StatCard
          label="Outstanding"
          value={stats ? formatCurrency(stats.outstanding) : '$0'}
          href="/agency/invoices"
        />
        <StatCard
          label="Active"
          value={stats?.active_projects ?? 0}
          href="/agency/projects"
        />
        <StatCard
          label="Hot Leads"
          value={stats?.hot_leads ?? 0}
          href="/agency/leads"
        />
      </div>

      {/* Quick actions - horizontal scroll on mobile */}
      <div className="space-y-2">
        <p className="text-xs text-muted">Quick actions</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
          <Link
            href="/agency/leads?new=1"
            className="flex-shrink-0 flex items-center gap-2 bg-white rounded-xl border border-black/5 px-4 py-3 text-sm active:scale-[0.98] transition-transform"
          >
            <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs">+</span>
            <span className="whitespace-nowrap">Add Lead</span>
          </Link>
          <Link
            href="/agency/projects?new=1"
            className="flex-shrink-0 flex items-center gap-2 bg-white rounded-xl border border-black/5 px-4 py-3 text-sm active:scale-[0.98] transition-transform"
          >
            <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs">+</span>
            <span className="whitespace-nowrap">New Project</span>
          </Link>
          <Link
            href="/agency/invoices?new=1"
            className="flex-shrink-0 flex items-center gap-2 bg-white rounded-xl border border-black/5 px-4 py-3 text-sm active:scale-[0.98] transition-transform"
          >
            <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs">+</span>
            <span className="whitespace-nowrap">Invoice</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
