'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileDashboard, ProjectsScreen } from '@/rendervault/components/app/MobileDashboard';
import { NewProjectForm, type NewProjectFormValues } from '@/rendervault/components/app/NewProjectForm';
import type { ProjectRecord } from '@/rendervault/lib/backend-types';

function NewProjectSheet({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (input: NewProjectFormValues) => Promise<void>;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background-dark/50 px-4 py-6 backdrop-blur-md md:items-center">
      <div className="w-full max-w-xl rounded-[22px] border border-border bg-panel p-5 shadow-shell">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-text-ink">New project</h3>
            <p className="text-sm text-text-subtle">Add a brief and optional due date to kick things off.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted transition hover:bg-panel"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <NewProjectForm
            onCreate={async (input) => {
              await onCreate(input);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await fetch('/render-vault/api/projects');
    if (res.status === 401) {
      router.push('/render-vault/login');
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Unable to load projects');
      setLoading(false);
      return;
    }
    setProjects(data.projects ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [loadProjects]);

  const handleCreateProject = async (input: NewProjectFormValues) => {
    const res = await fetch('/render-vault/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.status === 401) {
      router.push('/render-vault/login');
      return;
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? 'Failed to create project');
    }

    setProjects((prev) => [data.project, ...prev]);
    router.push(`/render-vault/projects/${data.project.id}`);
  };

  // Simplified projects list for mobile
  const mobileProjects = projects.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
  }));

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileDashboard>
          {loading ? (
            <div className="px-5 py-6">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-text-ink">Projects</h1>
              </div>
              <div className="py-8 text-center text-muted">Loading projects...</div>
            </div>
          ) : error ? (
            <div className="px-5 py-6">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-text-ink">Projects</h1>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">{error}</div>
            </div>
          ) : (
            <ProjectsScreen projects={mobileProjects} onCreateProject={() => setSheetOpen(true)} />
          )}
        </MobileDashboard>
      </div>

      {/* Desktop View - Redirect to dashboard for now */}
      <div className="hidden md:block">
        <div className="p-6 text-center">
          <p className="text-text-subtle">Projects view on desktop. Redirecting to dashboard...</p>
        </div>
      </div>

      {/* New Project Sheet */}
      <NewProjectSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  );
}


