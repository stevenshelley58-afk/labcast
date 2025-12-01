import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <p className="font-medium mb-1">Labcast</p>
          <p className="text-sm text-muted">Perth, Australia</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-sm text-muted">
          <a
            href="https://bhm.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            bhm.com.au
          </a>
          <Link
            href="/rendervault"
            className="hover:text-foreground transition-colors"
          >
            RenderVault
          </Link>
          <a
            href="mailto:hello@labcast.com.au"
            className="hover:text-foreground transition-colors"
          >
            hello@labcast.com.au
          </a>
        </div>
      </div>
    </footer>
  );
}
