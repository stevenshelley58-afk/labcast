'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Deliverable = {
  id: string;
  title: string;
  status: string;
  due_date: string | null;
};

type Invoice = {
  id: string;
  invoice_number: string;
  status: string;
  amount_cents: number;
};

type Project = {
  id: string;
  name: string;
  status: string;
  service_type: string;
  monthly_value: number;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  client: { id: string; company_name: string };
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-50 text-blue-700',
  done: 'bg-green-50 text-green-700',
  blocked: 'bg-red-50 text-red-700',
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeliverableForm, setShowDeliverableForm] = useState(false);
  const [newDeliverable, setNewDeliverable] = useState({ title: '', due_date: '' });

  const fetchData = () => {
    if (!params.id) return;
    fetch(`/api/agency/projects/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProject(data.project);
        setDeliverables(data.deliverables || []);
        setInvoices(data.invoices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const addDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/agency/projects/${params.id}/deliverables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDeliverable),
    });
    setShowDeliverableForm(false);
    setNewDeliverable({ title: '', due_date: '' });
    fetchData();
  };

  const updateDeliverableStatus = async (id: string, status: string) => {
    await fetch(`/api/agency/deliverables/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const updateProjectStatus = async (status: string) => {
    await fetch(`/api/agency/projects/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setProject((p) => (p ? { ...p, status } : null));
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  if (!project) {
    return <div className="text-center py-12 text-muted">Project not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => router.back()} className="text-sm text-muted hover:text-foreground mb-2">
            ← Back
          </button>
          <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
          <Link href={`/agency/clients/${project.client?.id}`} className="text-sm text-muted hover:underline">
            {project.client?.company_name}
          </Link>
        </div>
        <div className="flex gap-2">
          <select
            className="text-sm border border-black/10 rounded-lg px-3 py-1.5 bg-transparent"
            value={project.status}
            onChange={(e) => updateProjectStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Project info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Monthly Value</p>
          <p className="text-2xl font-semibold">{formatCurrency(project.monthly_value || 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Service Type</p>
          <p className="text-2xl font-semibold capitalize">{project.service_type}</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/5 p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Invoiced</p>
          <p className="text-2xl font-semibold">
            {formatCurrency(invoices.reduce((sum, i) => sum + i.amount_cents, 0))}
          </p>
        </div>
      </div>

      {/* Deliverables */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Deliverables</h2>
          <Button size="xs" variant="ghost" onClick={() => setShowDeliverableForm(!showDeliverableForm)}>
            {showDeliverableForm ? 'Cancel' : '+ Add'}
          </Button>
        </div>

        {showDeliverableForm && (
          <form onSubmit={addDeliverable} className="bg-white rounded-xl border border-black/5 p-4 mb-4 flex gap-3">
            <Input
              placeholder="Deliverable title"
              value={newDeliverable.title}
              onChange={(e) => setNewDeliverable({ ...newDeliverable, title: e.target.value })}
              className="flex-1"
              required
            />
            <Input
              type="date"
              value={newDeliverable.due_date}
              onChange={(e) => setNewDeliverable({ ...newDeliverable, due_date: e.target.value })}
              className="w-40"
            />
            <Button type="submit" size="sm">Add</Button>
          </form>
        )}

        <div className="space-y-2">
          {deliverables.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between bg-white rounded-xl border border-black/5 p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={d.status === 'done'}
                  onChange={() => updateDeliverableStatus(d.id, d.status === 'done' ? 'pending' : 'done')}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className={d.status === 'done' ? 'line-through text-muted' : ''}>{d.title}</span>
              </div>
              <div className="flex items-center gap-3">
                {d.due_date && (
                  <span className="text-xs text-muted">
                    {new Date(d.due_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </span>
                )}
                <select
                  className="text-xs border border-black/10 rounded px-2 py-1 bg-transparent"
                  value={d.status}
                  onChange={(e) => updateDeliverableStatus(d.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          ))}
          {deliverables.length === 0 && (
            <p className="text-sm text-muted py-8 text-center">No deliverables yet</p>
          )}
        </div>
      </div>

      {/* Invoices */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Invoices</h2>
          <Link href={`/agency/invoices?project=${project.id}`}>
            <Button size="xs" variant="ghost">+ Create Invoice</Button>
          </Link>
        </div>
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between bg-white rounded-xl border border-black/5 p-4"
            >
              <div>
                <span className="font-mono text-sm">{invoice.invoice_number}</span>
                <span className={`ml-3 text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[invoice.status] || 'bg-gray-100'}`}>
                  {invoice.status}
                </span>
              </div>
              <span className="font-medium">{formatCurrency(invoice.amount_cents)}</span>
            </div>
          ))}
          {invoices.length === 0 && (
            <p className="text-sm text-muted py-8 text-center">No invoices yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
