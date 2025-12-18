'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Invoice = {
  id: string;
  invoice_number: string;
  status: string;
  amount_cents: number;
  due_date: string | null;
  paid_at: string | null;
  project: { id: string; name: string; client: { company_name: string } } | null;
  created_at: string;
};

type Project = {
  id: string;
  name: string;
  client: { company_name: string };
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

function formatDate(date: string | null): string {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-50 text-blue-700',
  paid: 'bg-green-50 text-green-700',
  overdue: 'bg-red-50 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    project_id: '',
    amount: '',
    due_date: '',
  });

  const fetchData = async () => {
    const [invoicesRes, projectsRes] = await Promise.all([
      fetch('/api/agency/invoices'),
      fetch('/api/agency/projects'),
    ]);
    const invoicesData = await invoicesRes.json();
    const projectsData = await projectsRes.json();
    setInvoices(invoicesData);
    setProjects(projectsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/agency/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: formData.project_id,
        amount_cents: Math.round(parseFloat(formData.amount || '0') * 100),
        due_date: formData.due_date || null,
      }),
    });
    setShowForm(false);
    setFormData({ project_id: '', amount: '', due_date: '' });
    fetchData();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/agency/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  const outstanding = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount_cents, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted mt-1">
            {formatCurrency(outstanding)} outstanding
          </p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Invoice'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              required
            >
              <option value="">Select project...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.client?.company_name})
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="Amount (AUD)"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <Input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
          </div>
          <Button type="submit" size="sm">Create Invoice</Button>
        </form>
      )}

      {/* Invoices table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 bg-black/[0.02]">
              <th className="text-left px-4 py-3 font-medium text-muted">Invoice</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Client</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Project</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted">Amount</th>
              <th className="text-right px-4 py-3 font-medium text-muted">Due</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-black/5 hover:bg-black/[0.01]">
                <td className="px-4 py-3 font-mono text-xs">{invoice.invoice_number}</td>
                <td className="px-4 py-3">{invoice.project?.client?.company_name || '-'}</td>
                <td className="px-4 py-3 text-muted">{invoice.project?.name || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[invoice.status] || 'bg-gray-100'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(invoice.amount_cents)}</td>
                <td className="px-4 py-3 text-right text-muted">{formatDate(invoice.due_date)}</td>
                <td className="px-4 py-3">
                  {invoice.status === 'draft' && (
                    <button
                      onClick={() => updateStatus(invoice.id, 'sent')}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Send
                    </button>
                  )}
                  {invoice.status === 'sent' && (
                    <button
                      onClick={() => updateStatus(invoice.id, 'paid')}
                      className="text-xs text-green-600 hover:underline"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted">
                  No invoices yet. Create your first invoice above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
