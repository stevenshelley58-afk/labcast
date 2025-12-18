'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Client = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  status: string;
  lifetime_value: number;
  active_project_count: number;
  outstanding_amount: number;
  created_at: string;
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

const statusColors: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  paused: 'bg-amber-50 text-amber-700',
  churned: 'bg-red-50 text-red-700',
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
  });

  const fetchClients = () => {
    fetch('/api/agency/clients')
      .then((r) => r.json())
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/agency/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setShowForm(false);
    setFormData({ company_name: '', contact_name: '', email: '' });
    fetchClients();
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-muted mt-1">{clients.length} total</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Client'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Company name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              required
            />
            <Input
              placeholder="Contact name"
              value={formData.contact_name}
              onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
              required
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Button type="submit" size="sm">Save Client</Button>
        </form>
      )}

      {/* Clients list */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 bg-black/[0.02]">
              <th className="text-left px-4 py-3 font-medium text-muted">Company</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Contact</th>
              <th className="text-left px-4 py-3 font-medium text-muted">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted">LTV</th>
              <th className="text-right px-4 py-3 font-medium text-muted">Outstanding</th>
              <th className="text-center px-4 py-3 font-medium text-muted">Projects</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-black/5 hover:bg-black/[0.01]">
                <td className="px-4 py-3">
                  <Link href={`/agency/clients/${client.id}`} className="font-medium hover:underline">
                    {client.company_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{client.contact_name}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[client.status] || 'bg-gray-100'}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(client.lifetime_value || 0)}</td>
                <td className="px-4 py-3 text-right text-muted">{formatCurrency(client.outstanding_amount || 0)}</td>
                <td className="px-4 py-3 text-center">{client.active_project_count || 0}</td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted">
                  No clients yet. Add your first client above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
