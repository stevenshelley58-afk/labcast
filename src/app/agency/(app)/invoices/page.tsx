'use client';

import { useEffect, useState } from 'react';
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

  const unpaidInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'overdue' || i.status === 'draft');
  const paidInvoices = invoices.filter(i => i.status === 'paid');

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile: Big outstanding number */}
      <div className="md:hidden">
        <p className="text-xs text-muted mb-1">Outstanding</p>
        <p className="text-4xl font-semibold tracking-tight">{formatCurrency(outstanding)}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden md:block">
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted mt-1">{formatCurrency(outstanding)} outstanding</p>
        </div>
        <div className="md:hidden">
          <h1 className="text-xl font-semibold tracking-tight">Invoices</h1>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? '×' : '+'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-4 space-y-3">
          <select
            className="w-full rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm"
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
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Amount"
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
          <Button type="submit" size="sm" fullWidth>Create</Button>
        </form>
      )}

      {/* Mobile: Card list grouped by status */}
      <div className="md:hidden space-y-4">
        {unpaidInvoices.length > 0 && (
          <div className="space-y-2">
            {unpaidInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white rounded-xl border border-black/5 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">{invoice.project?.client?.company_name || 'No client'}</p>
                    <p className="text-xs text-muted truncate">{invoice.project?.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold">{formatCurrency(invoice.amount_cents)}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full capitalize ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                  <span className="text-[10px] text-muted font-mono">{invoice.invoice_number}</span>
                  <div className="flex gap-2">
                    {invoice.status === 'draft' && (
                      <button
                        onClick={() => updateStatus(invoice.id, 'sent')}
                        className="text-xs text-blue-600 font-medium"
                      >
                        Send
                      </button>
                    )}
                    {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                      <button
                        onClick={() => updateStatus(invoice.id, 'paid')}
                        className="text-xs text-green-600 font-medium"
                      >
                        Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {paidInvoices.length > 0 && (
          <div>
            <p className="text-xs text-muted mb-2">Paid ({paidInvoices.length})</p>
            <div className="space-y-1">
              {paidInvoices.slice(0, 5).map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between py-2 px-1 text-sm text-muted"
                >
                  <span className="truncate">{invoice.project?.client?.company_name}</span>
                  <span>{formatCurrency(invoice.amount_cents)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {invoices.length === 0 && (
          <p className="text-sm text-muted py-12 text-center">No invoices yet</p>
        )}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-black/5 overflow-hidden">
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
                  No invoices yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
