'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LifeBuoy, Plus, Sparkles, UserRound } from 'lucide-react';
import Link from 'next/link';
import { WorkspaceChrome } from '@/ui/WorkspaceChrome';
import { Button } from '@/ui/Button';
import { AvatarCircle } from './AvatarCircle';
import { LogoMark } from '../LogoMark';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/render-vault/dashboard',
    icon: LayoutDashboard,
    match: (path: string) => path.startsWith('/render-vault/dashboard'),
  },
  {
    label: 'Profile',
    href: '/render-vault/profile',
    icon: UserRound,
    match: (path: string) => path.startsWith('/render-vault/profile'),
  },
  {
    label: 'Support',
    href: 'mailto:hello@labcast.com.au',
    icon: LifeBuoy,
    match: () => false,
    external: true,
  },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navWithState = navItems.map(({ icon, label, href, match, external }) => ({
    label,
    href,
    icon,
    external,
    isActive: match(pathname),
  }));

  const sidebarFooter = (
    <>
      <div className="rounded-[18px] border border-white/80 bg-gradient-to-br from-[#e7f2ff] via-white to-[#f2f7ff] p-4 shadow-[0_14px_32px_rgba(112,144,176,0.14)]">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#4f78a5] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Vault ready
        </div>
        <p className="text-sm font-semibold text-[#1b2559]">Upgrade for priority renders</p>
        <p className="mt-1 text-xs text-[#7e8aa7]">Move to the Vault tier for reserved capacity.</p>
        <Button
          fullWidth
          className="mt-3 bg-[#4f78a5] text-white shadow-[0_10px_28px_rgba(79,120,165,0.28)] hover:bg-[#486f98]"
        >
          Upgrade
        </Button>
      </div>

      <Link href="/render-vault/projects/new">
        <Button
          fullWidth
          iconLeft={<Plus className="h-4 w-4" />}
          className="bg-[#1b2559] text-white shadow-[0_10px_28px_rgba(27,37,89,0.2)] hover:bg-[#162042]"
        >
          New project
        </Button>
      </Link>
    </>
  );

  return (
    <WorkspaceChrome
      logo={<LogoMark className="h-10" priority />}
      title="Render Vault"
      subtitle="Creative Ops"
      navItems={navWithState}
      homeHref="/render-vault/dashboard"
      sidebarFooter={sidebarFooter}
      headerRight={
        <Link href="/render-vault/profile" className="flex items-center">
          <AvatarCircle />
        </Link>
      }
    >
      {children}
    </WorkspaceChrome>
  );
}
