// Reusable ProductCard extracted from `components/sections/best-sellers.tsx`
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { BestSellerProduct } from "@/data/best-sellers";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: BestSellerProduct | Product;
  /**
   * Compact mode (for recommendations): image + title only.
   * - BestSellerProduct: hides description/price + color dots
   * - Product: hides tagline/price (only name)
   */
  compact?: boolean;
};

function isBestSellerProduct(p: BestSellerProduct | Product): p is BestSellerProduct {
  return "colors" in p;
}

function resolveHref(slug: string) {
  return slug.startsWith("/") ? slug : `/product/${slug}`;
}

const FALLBACK_IMAGE = "/products/IMG_E8405.jpg";

export function ProductCard({ product, compact }: ProductCardProps) {
  const bestSeller = isBestSellerProduct(product);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const href = resolveHref(product.slug);

  const selectedColor = bestSeller ? product.colors[selectedColorIndex] : null;
  const mainImage = bestSeller
    ? (selectedColor?.image ?? product.colors[0]?.image ?? FALLBACK_IMAGE)
    : product.image;
  const hoverImage = bestSeller
    ? (selectedColor?.hoverImage ?? product.colors[0]?.hoverImage)
    : null;

  return (
    <div className="group relative flex flex-col  border border-black/10 w-[300px] flex-shrink-0 space-y-2">
      <Link
        href={href}
        className="relative block aspect-square w-full overflow-hidden bg-muted/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {product.badge && (
          <div className="absolute left-3 top-1 z-10">
            <Badge variant="outline" className="text-[8px] font-medium uppercase tracking-[0.15em] text-black bg-white/80 border-black/10">
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Images */}
        <div className="relative h-full w-full  overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-300",
              bestSeller && hoverImage
                ? isHovered
                  ? "opacity-0"
                  : "opacity-100"
                : "opacity-100",
              !bestSeller ? (isHovered ? "scale-[1.03]" : "scale-100") : "",
            )}
          />
          {bestSeller && hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} on model`}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            />
          )}
        </div>
      </Link>

      <div className="p-4 ">
        {/* Color Selector */}
        {bestSeller && !compact && (
          <div className=" flex gap-2 ">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColorIndex(index);
                }}
                className={cn(
                  "h-4 w-4 rounded-full border-1 transition-all",
                  selectedColorIndex === index
                    ? "border-foreground scale-105"
                    : "border-border hover:border-foreground/50",
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        )}

        {/* Product Info */}
        <div className="space-y-1 mt-2 h-[80px]">
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          {!compact && (
            <>
              {bestSeller ? (
                <p className="text-sm text-muted-foreground line-clamp-1 ">{product.description}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{product.tagline}</p>
              )}
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-foreground">${product.price} </p>
                <p className="text-sm text-muted-foreground line-through">$100</p>
                <p className="text-sm text-green-500">20%</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex mt-3 ">
        <Button
          variant="outline"
          className="w-full rounded-none border-none bg-amber-900/70 text-white 
             relative overflow-hidden group hover:bg-amber-900/60 hover:text-white"
        >
          <Link
            href={href}
            className="relative flex items-center w-full "
          >
            <span className="text-xs font-medium">Acheter</span>
            <ShoppingCart
              className="
             w-4 h-4
             absolute
             left-16
             translate-x-47
             transition-transform
             duration-700
             ease-in-out
             group-hover:translate-x-[calc(100%-1.5rem)]
             "
            />
          </Link>
        </Button>
        {/* <Button variant="secondary" className="rounded-full ">
            <Link href={href} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">Apperçu</span>
            </Link>
          </Button> */}
      </div>



    </div>
  );
}
