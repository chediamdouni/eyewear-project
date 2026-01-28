"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const menuCategories = [
  {
    title: "Solaire",
    items: [
      { label: "Toutes les lunettes solaires", href: "/collections/solaire" },
      { label: "Nouveautés", href: "/collections/solaire/nouveautes" },
      { label: "Classiques", href: "/collections/solaire/classiques" },
      { label: "Sport", href: "/collections/solaire/sport" },
    ],
  },
  {
    title: "Optique",
    items: [
      { label: "Toutes les lunettes optiques", href: "/collections/optique" },
      { label: "Vue de près", href: "/collections/optique/pres" },
      { label: "Vue de loin", href: "/collections/optique/loin" },
      { label: "Progressives", href: "/collections/optique/progressives" },
    ],
  },
  {
    title: "Collections",
    items: [
      { label: "Clarity 01", href: "/product/clarity-01" },
      { label: "Field Spectra", href: "/product/field-spectra" },
      { label: "Linearity", href: "/product/linearity" },
      { label: "Voir toutes", href: "/collections" },
    ],
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const lastScrollYRef = React.useRef(0);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [scrollDirection, setScrollDirection] = React.useState<"up" | "down">("up");

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (currentY > lastScrollYRef.current && currentY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300); // Augmenté à 300ms pour meilleure UX
  };

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md transition-all duration-300 ease-in-out",
        isScrolled || isMenuOpen
          ? "bg-black/90 shadow-lg shadow-black/10"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent border-transparent",
        scrollDirection === "down" && !isMenuOpen && "pointer-events-none opacity-0",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-white hover:text-white/80 transition-colors group pointer-events-auto"
        >
          <span className="h-px w-8 bg-white/60 group-hover:w-12 transition-all duration-300" />
          <span className="tracking-wide">Clevards Eyewear</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 pointer-events-auto"
          aria-label="Navigation principale"
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-white hover:text-white/80 transition-colors group"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              Collection
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isMenuOpen && "rotate-180",
                )}
              />
            </button>

            {/* Mega Menu Dropdown */}
            <div
              className={cn(
                "fixed left-0 right-0 top-16 bg-black/95 backdrop-blur-xl border-t border-white/5 transition-all duration-300 shadow-2xl",
                isMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-4 pointer-events-none",
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-12 gap-12">
                  {/* Menu Items */}
                  <div className="col-span-7 grid grid-cols-3 gap-8">
                    {menuCategories.map((category) => (
                      <div key={category.title} className="space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
                          {category.title}
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block text-sm text-white/90 hover:text-white transition-colors py-1 hover:translate-x-1 transition-transform duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured Content */}
                  <div className="col-span-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-lg p-8 border border-white/10">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
                      Nouvelle collection
                    </p>
                    <h2 className="text-2xl font-light tracking-tight mb-3 text-white">
                      Clarity, captured in glass.
                    </h2>
                    <p className="text-sm leading-relaxed text-white/70 mb-6">
                      Precision-crafted frames that disappear in weight but not in
                      presence.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      <Link href="/collections" onClick={() => setIsMenuOpen(false)}>
                        Découvrir la collection
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-white hover:text-white/80 transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white hover:text-white/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden lg:flex items-center gap-2">
            {/* <Button asChild variant="outline" size="sm" className="text-xs">
              <Link href="/find-your-pair">Trouver votre paire</Link>
            </Button> */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80 relative"
            >
              <Link href="/cart" aria-label="Panier">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white/80"
                aria-label="Menu mobile"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px]">
              <SheetHeader className="text-left mb-6">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Explorez notre collection</SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="collection" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                      Collection
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-6">
                        {menuCategories.map((category) => (
                          <div key={category.title} className="space-y-3">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                              {category.title}
                            </h3>
                            <ul className="space-y-2 pl-2">
                              {category.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="text-sm hover:text-muted-foreground transition-colors block py-1"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href="/about"
                  className="text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  À propos
                </Link>
                <Link
                  href="/contact"
                  className="text-sm py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                <div className="pt-4 border-t space-y-3">
                  {/* <Button asChild variant="default" className="w-full">
                    <Link
                      href="/find-your-pair"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Trouver votre paire
                    </Link>
                  </Button> */}
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                      Panier
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
