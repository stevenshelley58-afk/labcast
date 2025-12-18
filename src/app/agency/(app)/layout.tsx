'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/agency', label: 'Dashboard', icon: '◉' },
  { href: '/agency/leads', label: 'Leads', icon: '◎' },
  { href: '/agency/clients', label: 'Clients', icon: '◐' },
  { href: '/agency/projects', label: 'Projects', icon: '▣' },
  { href: '/agency/invoices', label: 'Invoices', icon: '$' },
];

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-6">
          <Link href="/agency" className="text-sm font-semibold text-gray-900">
            Agency OS
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted">Labcast</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-14 bottom-0 w-48 border-r border-black/5 bg-white/60 backdrop-blur-sm">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/agency' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-gray-600 hover:bg-black/5'
                )}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pl-48 pt-14">
        <div className="p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
