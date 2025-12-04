import type { ComponentType, ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type WorkspaceChromeNavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
  isActive?: boolean;
};

export interface WorkspaceChromeProps {
  logo: ReactNode;
  title: string;
  subtitle?: string;
  navItems: WorkspaceChromeNavItem[];
  children: ReactNode;
  headerRight?: ReactNode;
  sidebarFooter?: ReactNode;
  homeHref?: string;
}

/**
 * Shared side navigation shell that mirrors the Render Vault look & feel.
 * Use this wrapper to give any workspace area the same chrome.
 */
export function WorkspaceChrome({
  logo,
  title,
  subtitle,
  navItems,
  headerRight,
  sidebarFooter,
  children,
  homeHref = '/',
}: WorkspaceChromeProps) {
  return (
    <div className="hidden min-h-screen bg-canvas text-ink md:flex">
      <aside className="relative hidden w-[250px] shrink-0 border-r border-white/70 bg-white/95 px-4 py-6 shadow-[0_18px_40px_rgba(112,144,176,0.12)] lg:block">
        <div className="sticky top-6 flex h-[calc(100vh-48px)] flex-col rounded-[22px] bg-white/95 p-4 shadow-[0_18px_40px_rgba(112,144,176,0.16)] ring-1 ring-white/80">
          <Link href={homeHref} className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-[#f5f7fb]">
            {logo}
            <div className="leading-tight">
              <p className="text-sm font-semibold">{title}</p>
              {subtitle && <p className="text-xs text-[#7e8aa7]">{subtitle}</p>}
            </div>
          </Link>

          <nav className="mt-6 space-y-1">
            {navItems.map(({ icon: Icon, href, label, external, isActive }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                className={clsx(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  'hover:bg-[#f5f7fb] hover:text-[#2c3654]',
                  isActive
                    ? 'bg-[#e6edf7] text-[#2c3654] shadow-[0_10px_24px_rgba(112,144,176,0.14)] ring-1 ring-[#d4e0f0]'
                    : 'text-[#7e8aa7]',
                )}
              >
                <span
                  className={clsx(
                    'flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/70 bg-white shadow-sm transition',
                    isActive ? 'text-[#4f78a5]' : 'text-[#93a0bd] group-hover:text-[#4f78a5]',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {sidebarFooter && <div className="mt-auto space-y-4">{sidebarFooter}</div>}
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f5f7fb]/85 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-[#f5f7fb]/75 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex shrink-0 items-center gap-2 lg:hidden">
                {logo}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{title}</p>
                  {subtitle && <p className="truncate text-[10px] text-[#7e8aa7]">{subtitle}</p>}
                </div>
              </div>
            </div>
            {headerRight && <div className="flex shrink-0 items-center gap-1.5">{headerRight}</div>}
          </div>
        </header>

        <main className="relative flex-1 px-4 pb-6 pt-4 lg:px-10 lg:pb-10 lg:pt-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,120,165,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(107,203,119,0.07),transparent_42%)]" />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 lg:gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

