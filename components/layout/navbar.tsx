"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bannerMessages = [
  "Livraison gratuite à partir de 100€ • Retours gratuits sous 30 jours",
  "Nouvelle collection disponible • -20% sur votre première commande",
  "Essai à domicile gratuit • Garantie satisfait ou remboursé",
];

export function Navbar() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isBannerVisible, setIsBannerVisible] = React.useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);
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
          <div className="max-w-7xl mx-auto relative flex items-center justify-center">
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
          "fixed left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-md border-b border-black/10 transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isBannerVisible ? "top-[38px]" : "top-0"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-15 px-4 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-black hover:text-black/70 transition-colors tracking-wide"
          >
            Clevards Eyewear
          </Link>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-black hover:text-black/70 hover:bg-black/5 relative"
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
