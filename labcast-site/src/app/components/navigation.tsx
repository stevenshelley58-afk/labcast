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
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-panel/80 px-3 py-1.5 text-sm font-semibold text-text-ink shadow-card transition hover:opacity-90"
          onClick={closeMenu}
        >
          <span className="text-base">Labcast</span>
          <span className="text-xs uppercase tracking-[0.24em] text-text-subtle">AU</span>
        </Link>
        <div className="hidden md:flex items-center gap-3 text-sm">
          {navLinks.map((link) => {
            const href = resolveHref(link.href, link.isContact);
            const active = isActiveLink(href);
            return (
              <Link
                key={link.label}
                href={href}
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition",
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
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLogin}
            className="text-muted hover:text-foreground"
          >
            Login
          </Button>
          <Button type="button" size="sm" onClick={handleSignUp}>
            Sign up
          </Button>
          <button
            type="button"
            className="md:hidden w-8 h-8 inline-flex items-center justify-center rounded-full border border-border/80"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg
                className="w-5 h-5 text-foreground"
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
                className="w-5 h-5 text-foreground"
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
          <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl border border-border/60 bg-panel/95 p-4 shadow-shell md:hidden">
            <div className="flex flex-col gap-2 text-sm text-text-subtle">
              {navLinks.map((link) => {
                const href = resolveHref(link.href, link.isContact);
                const active = isActiveLink(href);
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className={clsx(
                      "rounded-full px-4 py-2 font-medium transition",
                      active ? "bg-panel text-text-ink shadow-soft" : "hover:bg-panel/70 hover:text-text-ink",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button type="button" variant="ghost" fullWidth onClick={handleLogin}>
                Login
              </Button>
              <Button type="button" fullWidth onClick={handleSignUp}>
                Sign up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
