'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

type Project = {
  id: string;
  name: string;
  status: string;
  service_type: string;
  monthly_value: number;
  start_date: string | null;
  client: { id: string; company_name: string };
  created_at: string;
};

type Client = {
  id: string;
  company_name: string;
};

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-green-50 text-green-700',
  paused: 'bg-amber-50 text-amber-700',
  completed: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    name: '',
    service_type: 'retainer',
    monthly_value: '',
  });

  const fetchData = async () => {
    const [projectsRes, clientsRes] = await Promise.all([
      fetch('/api/agency/projects'),
      fetch('/api/agency/clients'),
    ]);
    const projectsData = await projectsRes.json();
    const clientsData = await clientsRes.json();
    setProjects(projectsData);
    setClients(clientsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/agency/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        monthly_value: Math.round(parseFloat(formData.monthly_value || '0') * 100),
      }),
    });
    setShowForm(false);
    setFormData({ client_id: '', name: '', service_type: 'retainer', monthly_value: '' });
    fetchData();
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-black/5 rounded-2xl" />;
  }

  const activeProjects = projects.filter(p => p.status === 'active');
  const mrr = activeProjects.reduce((sum, p) => sum + (p.monthly_value || 0), 0);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-xs md:text-sm text-muted mt-0.5">{formatCurrency(mrr)}/mo active</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? '×' : '+'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-4 space-y-3">
          <select
            className="w-full rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm"
            value={formData.client_id}
            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
            required
          >
            <option value="">Select client...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
          <Input
            placeholder="Project name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              className="rounded-lg border border-border bg-transparent px-3 py-2.5 text-sm"
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
            >
              <option value="retainer">Retainer</option>
              <option value="project">Project</option>
              <option value="consulting">Consulting</option>
            </select>
            <Input
              type="number"
              placeholder="$/month"
              value={formData.monthly_value}
              onChange={(e) => setFormData({ ...formData, monthly_value: e.target.value })}
            />
          </div>
          <Button type="submit" size="sm" fullWidth>Create</Button>
        </form>
      )}

      {/* Project cards - stack on mobile, grid on desktop */}
      <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/agency/projects/${project.id}`}
            className="block bg-white rounded-xl md:rounded-2xl border border-black/5 p-3 md:p-5 shadow-soft active:scale-[0.99] md:hover:shadow-card transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm md:text-base truncate">{project.name}</p>
                <p className="text-xs text-muted truncate">{project.client?.company_name}</p>
              </div>
              <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${statusColors[project.status] || 'bg-gray-100'}`}>
                {project.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-xs text-muted capitalize">{project.service_type}</span>
              <span className="font-medium">{formatCurrency(project.monthly_value || 0)}/mo</span>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted text-sm">
            No projects yet
          </div>
        )}
      </div>
    </div>
  );
}
