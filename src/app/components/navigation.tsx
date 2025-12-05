'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/ui/Button";

const navLinks = [
  { href: "/render-vault", label: "Render Vault" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact us", isContact: true },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDev = process.env.NODE_ENV === "development";

  const closeMenu = () => setIsMenuOpen(false);

  const contactHref =
    pathname?.startsWith("/render-vault") || pathname === "/render-vault"
      ? "#contact"
      : "/#contact";

  const resolveHref = (href: string, isContact?: boolean) => {
    if (isContact) {
      return contactHref;
    }
    return href;
  };

  const handleLogin = () => {
    closeMenu();
    if (isDev) {
      router.push("/render-vault/dashboard");
    } else {
      router.push("/render-vault/login");
    }
  };

  const handleSignUp = () => {
    closeMenu();
    if (isDev) {
      router.push("/render-vault/dashboard");
    } else {
      router.push("/render-vault/login");
    }
  };

  const isActiveLink = (href: string) => {
    if (!pathname) return false;
    if (href === "#contact" || href === "/#contact" || href === "/#about") {
      return pathname === "/";
    }
    if (href.startsWith("/render-vault")) {
      return pathname.startsWith("/render-vault");
    }
    return pathname === href;
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-canvas/80 backdrop-blur-xl">
      <div className="relative mx-auto flex h-12 max-w-6xl items-center justify-between gap-2 px-4 md:h-14 md:px-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-white/60 bg-panel/80 px-2 py-0.5 text-xs font-semibold text-text-ink shadow-card transition hover:opacity-90"
          onClick={closeMenu}
        >
          Labcast
        </Link>
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const href = resolveHref(link.href, link.isContact);
            const active = isActiveLink(href);
            return (
              <Link
                key={link.label}
                href={href}
                className={clsx(
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition",
                  active
                    ? "bg-panel text-text-ink shadow-soft"
                    : "text-text-subtle hover:text-text-ink hover:bg-panel/60",
                )}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleLogin}
            className="h-6 px-2 text-[11px] text-muted hover:text-foreground"
          >
            Login
          </Button>
          <Button
            type="button"
            size="xs"
            onClick={handleSignUp}
            className="h-6 px-2.5 text-[11px]"
          >
            Sign up
          </Button>
          <button
            type="button"
            className="md:hidden w-6 h-6 inline-flex items-center justify-center rounded-full border border-border/80"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg
                className="w-3.5 h-3.5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5 text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-border/60 bg-panel/95 p-3 shadow-shell md:hidden">
            <div className="flex flex-col gap-1 text-sm text-text-subtle">
              {navLinks.map((link) => {
                const href = resolveHref(link.href, link.isContact);
                const active = isActiveLink(href);
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className={clsx(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                      active ? "bg-panel text-text-ink shadow-soft" : "hover:bg-panel/70 hover:text-text-ink",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex gap-2">
                <Button type="button" variant="ghost" size="sm" fullWidth onClick={handleLogin}>
                  Login
                </Button>
                <Button type="button" size="sm" fullWidth onClick={handleSignUp}>
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
