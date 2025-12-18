'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/agency', label: 'Home', icon: '◉' },
  { href: '/agency/leads', label: 'Leads', icon: '◎' },
  { href: '/agency/clients', label: 'Clients', icon: '◐' },
  { href: '/agency/projects', label: 'Projects', icon: '▣' },
  { href: '/agency/invoices', label: 'Money', icon: '$' },
];

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar - minimal on mobile */}
      <header className="fixed inset-x-0 top-0 z-50 h-12 md:h-14 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
          <Link href="/agency" className="text-sm font-semibold text-gray-900">
            Agency OS
          </Link>
          <span className="text-[10px] md:text-xs text-muted">Labcast</span>
        </div>
      </header>

      {/* Desktop sidebar - hidden on mobile */}
      <aside className="hidden md:block fixed left-0 top-14 bottom-0 w-48 border-r border-black/5 bg-white/60 backdrop-blur-sm">
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

      {/* Main content - full width on mobile */}
      <main className="md:pl-48 pt-12 md:pt-14 pb-20 md:pb-8">
        <div className="p-4 md:p-8 max-w-6xl">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 z-50 h-16 bg-white/95 backdrop-blur-md border-t border-black/5 safe-area-pb">
        <div className="flex h-full items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/agency' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-colors min-w-[56px]',
                  isActive ? 'text-accent' : 'text-gray-400'
                )}
              >
                <span className={clsx('text-lg', isActive && 'scale-110')}>{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
