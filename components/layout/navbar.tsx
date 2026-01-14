"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
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
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
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
    }, 100);
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
        "fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl transition-all duration-500",
        isScrolled || isMenuOpen ? "bg-white/95 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container-shell flex items-center justify-between py-2">
        <Link
          href="/"
          className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="h-px w-10 bg-muted-foreground/60" />
          Clevards Eyewear
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Ouvrir le menu"
                >
                  Collection
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="!w-[50vw] !max-w-none p-0 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex h-full  ">
                  <div className="flex-1 overflow-y-auto p-12 space-y-12">
                    <SheetHeader className="text-left mb-8">
                      <SheetTitle className="text-2xl font-display tracking-tight">
                        Collection
                      </SheetTitle>
                      <SheetDescription className="text-sm text-muted-foreground">
                        Explorez notre sélection de lunettes
                      </SheetDescription>
                    </SheetHeader>

                    {menuCategories.map((category) => (
                      <div key={category.title} className="space-y-4">
                        <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                          {category.title}
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block text-sm text-foreground hover:text-muted-foreground transition-colors py-1"
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

                  <div className="relative w-[50%] hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100/5 via-slate-50/2 to-slate-900/40" />
                    <Image
                      src="/clevards-hero.jpg"
                      alt="Collection Clevards Eyewear"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-12 text-white">
                      <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-90">
                        Nouvelle collection
                      </p>
                      <h2 className="text-3xl font-display tracking-tight mb-2">
                        Clarity, captured in glass.
                      </h2>
                      <p className="text-sm leading-relaxed opacity-90 max-w-xs">
                        Precision-crafted frames that disappear in weight but not in
                        presence.
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="mt-6 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Link href="/collections" onClick={() => setIsMenuOpen(false)}>
                          Découvrir
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link
            href="/collections"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:inline-flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/find-your-pair">Trouver votre paire</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" aria-label="Cart">
              <Link href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13"
                  />
                </svg>
              </Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu mobile">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] flex flex-col">
              <div className="flex flex-col gap-6 mt-8 flex-1">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="collection" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold text-foreground py-2 hover:no-underline">
                      Collection
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-2">
                      <div className="space-y-6">
                        {menuCategories.map((category) => (
                          <div key={category.title} className="space-y-3">
                            <h3 className="text-xs tracking-[0.3em] text-muted-foreground font-medium">
                              {category.title}
                            </h3>
                            <ul className="space-y-2 pl-2">
                              {category.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-foreground hover:text-muted-foreground transition-colors block py-1"
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

                <Link href="/collections" className="text-sm text-foreground py-2">
                  À propos
                </Link>
                <Link href="/contact" className="text-sm text-foreground py-2">
                  Contact
                </Link>
                <div className="mt-auto pt-4">
                  <Button asChild variant="default" className="w-full">
                    <Link href="/collections">Explore</Link>
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
