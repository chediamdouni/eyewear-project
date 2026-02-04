"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/data/products";
import { BEST_SELLERS } from "@/data/best-sellers";
import { ChevronUp, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface ProductPageProps {
  product: Product;
}

// Product images - in a real app, these would come from product data
const getProductImages = (product: Product) => [
  product.image,
  product.image, // Different angle/view
  product.image, // Different angle/view
  product.image, // Different angle/view
];


export function ProductPage({ product }: ProductPageProps) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);
  const productImages = getProductImages(product);

  // Scroll-triggered image carousel
  React.useEffect(() => {
    const handleScroll = () => {
      if (!imageContainerRef.current) return;

      const container = imageContainerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on container position
      // When container is at top of viewport, show first image
      // As it scrolls down, transition through images
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight * 1.5))
      );

      // Calculate which image should be shown based on scroll progress
      const imageCount = productImages.length;
      const newIndex = Math.min(
        Math.floor(scrollProgress * imageCount),
        imageCount - 1
      );

      if (newIndex !== activeImageIndex && newIndex >= 0) {
        setActiveImageIndex(newIndex);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeImageIndex, productImages.length]);

  const recommendedProducts = React.useMemo(() => {
    return BEST_SELLERS.filter((p) => p.slug !== product.slug).slice(0, 4);
  }, [product.slug]);

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log("Add to cart:", product);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Scroll-triggered Image Gallery */}
        <div
          ref={imageContainerRef}
          className="sticky top-0 h-screen flex items-center justify-center bg-[#f5f3f0] overflow-hidden"
        >
          <div className="relative w-full h-full max-w-2xl mx-auto">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  index === activeImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center p-12">
                  <div className="relative w-full aspect-square max-w-md">
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      style={{
                        filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.08))",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Product Information */}
        <div className="relative">
          <div className="sticky top-24 py-16 px-6 lg:px-12 max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* Product Title & Size */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-normal text-black tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-normal text-black/60">
                  {product.tagline || "Premium eyewear"}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-sm font-normal text-black uppercase tracking-wide">
                  Description
                </h2>
                <p className="text-base font-normal text-black/70 leading-relaxed max-w-lg">
                  {product.tagline ||
                    "A weightless, premium eyewear design that helps reduce visual fatigue and enhance clarity for a rested, focused appearance."}
                </p>
              </div>

              {/* Add To Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-black text-white hover:bg-black/90 h-14 text-base font-normal rounded-none flex items-center justify-between group"
              >
                <span>
                  Add To Cart — {product.price} USD
                </span>
                <ChevronUp className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
              </Button>

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="w-full space-y-1">
                <AccordionItem value="ingredients" className="border-b border-black/10">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-sm font-normal text-black hover:no-underline text-left group">
                      <span>Key Ingredients</span>
                      <Plus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-sm text-black/70 leading-relaxed pt-2 pb-4">
                    <p>
                      Premium acetate frames, anti-reflective lenses, and
                      lightweight titanium components for optimal comfort and
                      durability.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scent" className="border-b border-black/10">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-sm font-normal text-black hover:no-underline text-left group">
                      <span>Scent Notes</span>
                      <Plus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-sm text-black/70 leading-relaxed pt-2 pb-4">
                    <p>
                      Neutral, clean aesthetic with subtle matte finishes and
                      refined color palettes.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="application" className="border-b border-black/10">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-sm font-normal text-black hover:no-underline text-left group">
                      <span>Application</span>
                      <Plus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 shrink-0 text-black transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-sm text-black/70 leading-relaxed pt-2 pb-4">
                    <p>
                      Designed for daily wear, suitable for both indoor and
                      outdoor use. Clean with a soft microfiber cloth to maintain
                      lens clarity.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Bottom Right Badges */}
            <div className="absolute bottom-8 right-6 lg:right-12 flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 text-xs text-black/50">
                <span>Framer Commerce</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-black/50">
                <span>Made in France</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      {recommendedProducts.length > 0 && (
        <section className="bg-[#faf9f7] py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-normal text-black mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {recommendedProducts.map((p) => (
                <div key={p.slug}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
