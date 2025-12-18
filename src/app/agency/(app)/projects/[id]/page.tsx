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
  pending: 'bg-gray-100',
  in_progress: 'bg-blue-100',
  done: 'bg-green-100',
  blocked: 'bg-red-100',
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

  const pendingCount = deliverables.filter(d => d.status !== 'done').length;
  const doneCount = deliverables.filter(d => d.status === 'done').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => router.back()} className="text-xs text-muted mb-2">← Back</button>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{project.name}</h1>
        <Link href={`/agency/clients/${project.client?.id}`} className="text-xs md:text-sm text-muted hover:underline">
          {project.client?.company_name}
        </Link>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex-shrink-0 bg-white rounded-xl border border-black/5 p-3 min-w-[100px]">
          <p className="text-[10px] text-muted uppercase">Value</p>
          <p className="text-lg font-semibold">{formatCurrency(project.monthly_value || 0)}/mo</p>
        </div>
        <div className="flex-shrink-0 bg-white rounded-xl border border-black/5 p-3 min-w-[80px]">
          <p className="text-[10px] text-muted uppercase">Tasks</p>
          <p className="text-lg font-semibold">{doneCount}/{deliverables.length}</p>
        </div>
        <div className="flex-shrink-0 bg-white rounded-xl border border-black/5 p-3 min-w-[100px]">
          <p className="text-[10px] text-muted uppercase">Status</p>
          <select
            className="text-sm font-semibold bg-transparent capitalize -ml-1"
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

      {/* Deliverables */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Deliverables {pendingCount > 0 && `(${pendingCount})`}</p>
          <Button size="xs" variant="ghost" onClick={() => setShowDeliverableForm(!showDeliverableForm)}>
            {showDeliverableForm ? '×' : '+'}
          </Button>
        </div>

        {showDeliverableForm && (
          <form onSubmit={addDeliverable} className="flex gap-2 mb-3">
            <Input
              placeholder="Task title"
              value={newDeliverable.title}
              onChange={(e) => setNewDeliverable({ ...newDeliverable, title: e.target.value })}
              className="flex-1"
              required
            />
            <Button type="submit" size="sm">Add</Button>
          </form>
        )}

        <div className="space-y-1">
          {deliverables.map((d) => (
            <div
              key={d.id}
              className={`flex items-center gap-3 p-3 rounded-xl border border-black/5 ${statusColors[d.status] || 'bg-white'}`}
            >
              <button
                onClick={() => updateDeliverableStatus(d.id, d.status === 'done' ? 'pending' : 'done')}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  d.status === 'done' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'
                }`}
              >
                {d.status === 'done' && '✓'}
              </button>
              <span className={`flex-1 text-sm ${d.status === 'done' ? 'line-through text-muted' : ''}`}>
                {d.title}
              </span>
              {d.due_date && (
                <span className="text-[10px] text-muted">
                  {new Date(d.due_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                </span>
              )}
            </div>
          ))}
          {deliverables.length === 0 && (
            <p className="text-sm text-muted py-6 text-center">No deliverables</p>
          )}
        </div>
      </div>

      {/* Invoices */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Invoices</p>
          <Link href={`/agency/invoices?project=${project.id}&new=1`}>
            <Button size="xs" variant="ghost">+ New</Button>
          </Link>
        </div>
        <div className="space-y-1">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between bg-white rounded-xl border border-black/5 p-3"
            >
              <div>
                <span className="font-mono text-xs text-muted">{invoice.invoice_number}</span>
                <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full capitalize ${
                  invoice.status === 'paid' ? 'bg-green-50 text-green-700' :
                  invoice.status === 'sent' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <span className="font-medium text-sm">{formatCurrency(invoice.amount_cents)}</span>
            </div>
          ))}
          {invoices.length === 0 && (
            <p className="text-sm text-muted py-6 text-center">No invoices</p>
          )}
        </div>
      </div>
    </div>
  );
}
