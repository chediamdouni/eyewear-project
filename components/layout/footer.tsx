import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Links Section */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-16 md:py-20">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
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

          {/* Newsletter Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Restez informé de nos nouveautés et offres exclusives.
            </p>
            <div className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 py-2 text-sm bg-background border border-border/60 rounded-md focus:outline-none focus:border-foreground/40 transition-colors"
                aria-label="Email pour la newsletter"
              />
              <button
                className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors"
                aria-label="S'inscrire à la newsletter"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* Brand Name Section */}
        <div
          className="relative overflow-hidden border-t border-border/40 py-16"
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
              <h2 className="font-display text-[15vw] leading-none font-bold text-foreground select-none whitespace-nowrap transition-opacity duration-300 hover:opacity-60">
                Clevards
              </h2>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 hover:border-foreground/40 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              © {new Date().getFullYear()} Clevards Studio. All rights reserved.
            </p>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors">FR</button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">EN</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}