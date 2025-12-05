'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/render-vault", label: "Render Vault" },
  { href: "/services", label: "Services" },
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

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition"
          onClick={closeMenu}
        >
          Labcast
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const href = resolveHref(link.href, link.isContact);
            return (
              <Link
                key={link.label}
                href={href}
                className="text-sm text-gray-600 hover:text-gray-900 transition"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogin}
            className="hidden md:block text-sm text-gray-600 hover:text-gray-900 transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Sign up
          </button>
          <button
            type="button"
            className="md:hidden p-1.5"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg
                className="w-5 h-5 text-gray-600"
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
                className="w-5 h-5 text-gray-600"
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
          <div className="absolute left-0 right-0 top-full border-b border-black/5 bg-white/95 backdrop-blur-md py-4 px-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const href = resolveHref(link.href, link.isContact);
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={handleLogin}
                className="text-left text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
