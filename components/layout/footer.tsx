import Link from "next/link";

const footerLinks = [
  {
    title: "Boutique",
    links: [
      { label: "Lunettes de Soleil", href: "/collections/solaire" },
      { label: "Lunettes de Vue", href: "/collections/optique" },
      { label: "Accessoires", href: "/collections/accessoires" },
      { label: "Coupons de Réduction", href: "/collections/coupons" },
      { label: "Trouver votre paire", href: "/find-your-pair" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Histoire", href: "/collections/optique" },
      { label: "Blog", href: "/collections/accessoires" },
      { label: 'Programme "Impact au carré"', href: "/collections/accessoires" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/collections/accessoires" },
      { label: "Politique de confidentialité", href: "/collections/coupons" },
      { label: "Conditions d'utilisation", href: "/collections/coupons" },
      { label: "Politique de cookies", href: "/collections/coupons" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col gap-12 py-12 md:gap-16 md:py-16">
          {/* Links Section */}
          <nav className="flex flex-col justify-center gap-24 sm:flex-row sm:gap-16 md:gap-32">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex min-w-0 flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        {/* Brand Name Section - Only top half visible (cut off at bottom) */}
        <div
          className="relative overflow-hidden "
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 50%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 70%)",
          }}
        >
          <div className="flex justify-center items-start">
            <Link
              href="/"
              className="inline-block"
              aria-label="Clevards Eyewear - Accueil"
            >
              <h2 className="font-display text-[15vw] leading-none font-bold text-foreground select-none whitespace-nowrap transition-opacity hover:opacity-80">
                Clevard
              </h2>
            </Link>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="border-t border-border/40 py-6">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Clevards Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
