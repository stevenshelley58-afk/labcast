import Link from "next/link";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Labcast
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link
            href="/framework"
            className="hover:text-foreground transition-colors"
          >
            Framework
          </Link>
          <Link
            href="/services"
            className="hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>
        <Link
          href="/#contact"
          className="text-sm px-4 py-2 bg-foreground text-background rounded-full hover:opacity-80 transition-opacity"
        >
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
