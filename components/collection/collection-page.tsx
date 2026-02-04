"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface CollectionPageProps {
  category: "homme" | "femme";
  products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

interface Filters {
  frameShape: string[];
  color: string[];
  priceRange: [number, number];
  sort: SortOption;
}


export function CollectionPage({ category, products }: CollectionPageProps) {
  const [filters, setFilters] = React.useState<Filters>({
    frameShape: [],
    color: [],
    priceRange: [0, 1000],
    sort: "default",
  });

  // Calculer les prix min/max
  const priceRange = React.useMemo(() => {
    const prices = products.map((p) => p.priceValue);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // Initialiser le range de prix avec les valeurs réelles
  React.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [priceRange.min, priceRange.max],
    }));
  }, [priceRange.min, priceRange.max]);

  // Filtrer et trier les produits
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Filtrer par forme
    if (filters.frameShape.length > 0) {
      result = result.filter((p) =>
        filters.frameShape.includes(p.frameShape)
      );
    }

    // Filtrer par couleur
    if (filters.color.length > 0) {
      result = result.filter((p) => filters.color.includes(p.color));
    }

    // Filtrer par prix
    result = result.filter(
      (p) =>
        p.priceValue >= filters.priceRange[0] &&
        p.priceValue <= filters.priceRange[1]
    );

    // Trier
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "newest":
        result.sort((a, b) => {
          const aNew = a.badge === "new" ? 1 : 0;
          const bNew = b.badge === "new" ? 1 : 0;
          return bNew - aNew;
        });
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);



  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Category Tabs */}
        <div className="mb-12 flex items-center gap-8 border-b border-black/10">
          <Link
            href="/"
            className={cn(
              "pb-4 text-sm font-normal text-black transition-colors relative",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            All
          </Link>
          <Link
            href="/collection/homme"
            className={cn(
              "pb-4 text-sm font-normal transition-colors relative",
              category === "homme"
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                : "text-black/50 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            Homme
          </Link>
          <Link
            href="/collection/femme"
            className={cn(
              "pb-4 text-sm font-normal transition-colors relative",
              category === "femme"
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                : "text-black/50 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            Femme
          </Link>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-base font-normal text-black/60">
              Aucun produit trouvé
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Extract product number from name or slug (e.g., "clarity-01" -> "01")
  const productNumber = product.slug.match(/\d+/)?.[0] || "";

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-3">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-[#f5f3f0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          {productNumber && (
            <p className="text-xs font-normal text-black/60 tracking-wide">
              {productNumber}
            </p>
          )}
          <h3 className="text-sm font-normal text-black">
            {product.name}
          </h3>
          <p className="text-sm font-normal text-black">
            {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}
