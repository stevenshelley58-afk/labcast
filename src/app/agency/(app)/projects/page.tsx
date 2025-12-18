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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted mt-1">{projects.length} total</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Project'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              className="rounded-lg border border-border bg-transparent px-4 py-3 text-sm"
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
            >
              <option value="retainer">Retainer</option>
              <option value="project">Project</option>
              <option value="consulting">Consulting</option>
            </select>
            <Input
              type="number"
              placeholder="Monthly value (AUD)"
              value={formData.monthly_value}
              onChange={(e) => setFormData({ ...formData, monthly_value: e.target.value })}
            />
          </div>
          <Button type="submit" size="sm">Create Project</Button>
        </form>
      )}

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/agency/projects/${project.id}`}
            className="bg-white rounded-2xl border border-black/5 p-5 shadow-soft hover:shadow-card transition-shadow space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-xs text-muted">{project.client?.company_name}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[project.status] || 'bg-gray-100'}`}>
                {project.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted capitalize">{project.service_type}</span>
              <span className="font-medium">{formatCurrency(project.monthly_value || 0)}/mo</span>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-black/5 p-12 text-center text-muted">
            No projects yet. Create your first project above.
          </div>
        )}
      </div>
    </div>
  );
}
