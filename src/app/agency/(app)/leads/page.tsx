'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Lead = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  stage: string;
  service_interest: string;
  budget_signal: string;
  gut_feel: string;
  next_action: string | null;
  next_action_date: string | null;
  notes: string | null;
  created_at: string;
};

const stageColors: Record<string, string> = {
  inquiry: 'bg-gray-100 text-gray-700',
  qualified: 'bg-blue-50 text-blue-700',
  proposal_sent: 'bg-amber-50 text-amber-700',
  negotiating: 'bg-purple-50 text-purple-700',
  won: 'bg-green-50 text-green-700',
  lost: 'bg-red-50 text-red-700',
};

const stages = ['inquiry', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    service_interest: 'retainer',
    budget_signal: 'unknown',
    gut_feel: 'neutral',
    notes: '',
  });

  const fetchLeads = () => {
    fetch('/api/agency/leads')
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/agency/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setShowForm(false);
    setFormData({
      company_name: '',
      contact_name: '',
      email: '',
      service_interest: 'retainer',
      budget_signal: 'unknown',
      gut_feel: 'neutral',
      notes: '',
    });
    fetchLeads();
  };

  const updateStage = async (id: string, stage: string) => {
    await fetch(`/api/agency/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage }),
    });
    fetchLeads();
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted mt-1">{leads.length} total</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Lead'}
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
          <div className="grid grid-cols-3 gap-4">
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
              value={formData.service_interest}
              onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
            >
              <option value="retainer">Retainer</option>
              <option value="project">Project</option>
              <option value="consulting">Consulting</option>
            </select>
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
              value={formData.budget_signal}
              onChange={(e) => setFormData({ ...formData, budget_signal: e.target.value })}
            >
              <option value="unknown">Budget Unknown</option>
              <option value="low">Low Budget</option>
              <option value="mid">Mid Budget</option>
              <option value="high">High Budget</option>
            </select>
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
              value={formData.gut_feel}
              onChange={(e) => setFormData({ ...formData, gut_feel: e.target.value })}
            >
              <option value="cold">Cold</option>
              <option value="neutral">Neutral</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
          </div>
          <textarea
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted"
            placeholder="Notes"
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <Button type="submit" size="sm">Save Lead</Button>
        </form>
      )}

      {/* Pipeline view */}
      <div className="grid grid-cols-6 gap-3">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className="space-y-2">
              <div className="flex items-center gap-2 px-2">
                <span className={`text-xs font-medium capitalize ${stageColors[stage] || ''} px-2 py-0.5 rounded-full`}>
                  {stage.replace('_', ' ')}
                </span>
                <span className="text-xs text-muted">{stageLeads.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl border border-black/5 p-3 shadow-soft text-sm space-y-2"
                  >
                    <p className="font-medium truncate">{lead.company_name}</p>
                    <p className="text-xs text-muted truncate">{lead.contact_name}</p>
                    <div className="flex gap-1 flex-wrap">
                      <span className="text-[10px] bg-black/5 px-1.5 py-0.5 rounded">
                        {lead.gut_feel}
                      </span>
                      <span className="text-[10px] bg-black/5 px-1.5 py-0.5 rounded">
                        {lead.budget_signal}
                      </span>
                    </div>
                    {stage !== 'won' && stage !== 'lost' && (
                      <select
                        className="w-full text-[10px] border border-black/10 rounded px-1 py-1 bg-transparent"
                        value={stage}
                        onChange={(e) => updateStage(lead.id, e.target.value)}
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
