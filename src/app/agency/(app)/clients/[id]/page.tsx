'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/ui/Button';

type Client = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  status: string;
  notes: string | null;
  lifetime_value: number;
  active_project_count: number;
  outstanding_amount: number;
};

type Project = {
  id: string;
  name: string;
  status: string;
  service_type: string;
  monthly_value: number;
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/agency/clients/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setClient(data.client);
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const updateStatus = async (status: string) => {
    await fetch(`/api/agency/clients/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setClient((c) => (c ? { ...c, status } : null));
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  if (!client) {
    return <div className="text-center py-12 text-muted">Client not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => router.back()} className="text-xs text-muted mb-2 flex items-center gap-1">
          ← Back
        </button>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{client.company_name}</h1>
        <p className="text-xs md:text-sm text-muted mt-0.5">{client.contact_name}</p>
      </div>

      {/* Stats - 2x2 on mobile, 3 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-black/5 p-4">
          <p className="text-[10px] md:text-xs text-muted uppercase mb-1">LTV</p>
          <p className="text-xl md:text-2xl font-semibold">{formatCurrency(client.lifetime_value || 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-black/5 p-4">
          <p className="text-[10px] md:text-xs text-muted uppercase mb-1">Outstanding</p>
          <p className="text-xl md:text-2xl font-semibold">{formatCurrency(client.outstanding_amount || 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-black/5 p-4 col-span-2 md:col-span-1">
          <p className="text-[10px] md:text-xs text-muted uppercase mb-1">Status</p>
          <div className="flex items-center gap-2">
            <select
              className="text-sm border border-black/10 rounded-lg px-2 py-1 bg-transparent capitalize"
              value={client.status}
              onChange={(e) => updateStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="churned">Churned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Projects</p>
          <Link href={`/agency/projects?client=${client.id}&new=1`}>
            <Button size="xs" variant="ghost">+ New</Button>
          </Link>
        </div>
        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/agency/projects/${project.id}`}
              className="flex items-center justify-between bg-white rounded-xl border border-black/5 p-3 active:scale-[0.99] transition-transform"
            >
              <div>
                <p className="font-medium text-sm">{project.name}</p>
                <p className="text-xs text-muted capitalize">{project.service_type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{formatCurrency(project.monthly_value || 0)}/mo</p>
                <p className="text-xs text-muted capitalize">{project.status}</p>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-muted py-8 text-center">No projects</p>
          )}
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-xl border border-black/5 p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Email</span>
          <a href={`mailto:${client.email}`} className="text-blue-600">{client.email}</a>
        </div>
        {client.phone && (
          <div className="flex justify-between">
            <span className="text-muted">Phone</span>
            <a href={`tel:${client.phone}`} className="text-blue-600">{client.phone}</a>
          </div>
        )}
      </div>
    </div>
  );
}
