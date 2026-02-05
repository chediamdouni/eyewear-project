"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const bannerMessages = [
  "Livraison gratuite à partir de 100€ • Retours gratuits sous 30 jours",
  "Nouvelle collection disponible • -20% sur votre première commande",
  "Essai à domicile gratuit • Garantie satisfait ou remboursé",
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  const [isHovered, setIsHovered] = React.useState(false);

  const shouldShow = isActive || isHovered;
  const isEntering = isActive || isHovered;

  return (
    <Link
      href={href}
      className="relative text-sm font-normal text-black hover:text-black/60 transition-colors pb-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence mode="wait">
        {shouldShow && (
          <motion.span
            key={`${href}-${isActive ? "active" : "hover"}`}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformOrigin: isEntering ? "left" : "right",
            }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}

function MobileNavLink({ href, children, onClose }: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "text-base font-normal transition-colors pb-2 ",
        isActive ? "text-black" : "text-black/70 hover:text-black"
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollYRef.current && currentY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isBannerVisible) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isBannerVisible]);

  return (
    <>
      {isBannerVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white py-2.5 px-4">
          <div className="w-full mx-auto relative flex items-center justify-center">
            <p className="text-xs sm:text-sm font-light tracking-wide text-center">
              {bannerMessages[currentMessageIndex]}
            </p>
            <button
              onClick={() => setIsBannerVisible(false)}
              className="absolute right-0 text-white/60 hover:text-white transition-colors"
              aria-label="Fermer la bannière"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 bg-[#faf9f7] border-b border-black/5 transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isBannerVisible ? "top-[38px]" : "top-0"
        )}
      >
        <div className="w-full mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
          {/* Left Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Shop All</NavLink>
            <NavLink href="/collection/homme">Homme</NavLink>
            <NavLink href="/collection/femme">Femme</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black hover:text-black/70 hover:bg-transparent"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="!w-full sm:!w-[300px] bg-[#faf9f7] p-6">
              <nav className="flex flex-col gap-6 mt-8">
                <MobileNavLink href="/" onClose={() => setIsMobileMenuOpen(false)}>
                  Shop All
                </MobileNavLink>
                <MobileNavLink href="/collection/homme" onClose={() => setIsMobileMenuOpen(false)}>
                  Homme
                </MobileNavLink>
                <MobileNavLink href="/collection/femme" onClose={() => setIsMobileMenuOpen(false)}>
                  Femme
                </MobileNavLink>
                <MobileNavLink href="/about" onClose={() => setIsMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
                <MobileNavLink href="/contact" onClose={() => setIsMobileMenuOpen(false)}>
                  Contact
                </MobileNavLink>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Center Brand Name */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl font-normal text-black tracking-wide"
          >
            Clevards Eyewear™
          </Link>

          {/* Right Cart */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-black hover:text-black/70 hover:bg-transparent relative"
          >
            <Link href="/cart" aria-label="Panier">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </Button>
        </div>
      </header>
    </>
  );
}
