'use client';

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-medium tracking-tight" onClick={closeMenu}>
          Labcast
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="text-sm px-4 py-2 bg-foreground text-background rounded-full hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            Get in touch
          </Link>
          <button
            type="button"
            className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-border/80"
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
          <div className="md:hidden absolute top-full left-0 right-0 mt-3 border border-border/80 rounded-2xl bg-background/95 shadow-xl">
            <div className="flex flex-col px-5 py-4 gap-2 text-sm text-muted">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 hover:text-foreground transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-2 text-center px-4 py-2 bg-foreground text-background rounded-full hover:opacity-80 transition-opacity"
                onClick={closeMenu}
              >
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
