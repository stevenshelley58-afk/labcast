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
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => router.back()} className="text-sm text-muted hover:text-foreground mb-2">
            ← Back
          </button>
          <h1 className="text-2xl font-semibold tracking-tight">{client.company_name}</h1>
          <p className="text-sm text-muted mt-1">{client.contact_name} · {client.email}</p>
        </div>
        <div className="flex gap-2">
          {client.status === 'active' && (
            <Button size="sm" variant="ghost" onClick={() => updateStatus('paused')}>Pause</Button>
          )}
          {client.status === 'paused' && (
            <Button size="sm" variant="ghost" onClick={() => updateStatus('active')}>Activate</Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Lifetime Value</p>
          <p className="text-2xl font-semibold">{formatCurrency(client.lifetime_value || 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Outstanding</p>
          <p className="text-2xl font-semibold">{formatCurrency(client.outstanding_amount || 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Active Projects</p>
          <p className="text-2xl font-semibold">{client.active_project_count || 0}</p>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Projects</h2>
          <Link href={`/agency/projects?client=${client.id}`}>
            <Button size="xs" variant="ghost">+ New Project</Button>
          </Link>
        </div>
        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/agency/projects/${project.id}`}
              className="flex items-center justify-between bg-white rounded-xl border border-black/5 p-4 hover:bg-black/[0.01]"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-xs text-muted capitalize">{project.service_type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(project.monthly_value || 0)}/mo</p>
                <p className="text-xs text-muted capitalize">{project.status}</p>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-muted py-8 text-center">No projects yet</p>
          )}
        </div>
      </div>

      {/* Notes */}
      {client.notes && (
        <div>
          <h2 className="text-lg font-medium mb-2">Notes</h2>
          <div className="bg-white rounded-xl border border-black/5 p-4 text-sm whitespace-pre-wrap">
            {client.notes}
          </div>
        </div>
      )}
    </div>
  );
}
