"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import RollingText from "../motion/rolling-text";
import { ProductCard } from "@/components/product/product-card";

interface CollectionPageProps {
  category: "homme" | "femme";
  products: Product[];
  allProducts?: Product[]; // All products for client-side filtering
}

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

interface Filters {
  frameShape: string[];
  color: string[];
  priceRange: [number, number];
  sort: SortOption;
}


export function CollectionPage({ category, products, allProducts }: CollectionPageProps) {
  // Use allProducts if provided, otherwise use products
  const availableProducts = allProducts || products;

  // State for active category tab
  const [activeCategory, setActiveCategory] = React.useState<"all" | "homme" | "femme">(
    category === "homme" ? "homme" : category === "femme" ? "femme" : "all"
  );

  const [filters, setFilters] = React.useState<Filters>({
    frameShape: [],
    color: [],
    priceRange: [0, 1000],
    sort: "default",
  });

  // Filter products by category based on active tab
  const categoryFilteredProducts = React.useMemo(() => {
    if (activeCategory === "all") {
      return availableProducts;
    }
    return availableProducts.filter(
      (p) => p.category === activeCategory || p.category === "unisex"
    );
  }, [availableProducts, activeCategory]);

  // Calculer les prix min/max
  const priceRange = React.useMemo(() => {
    const prices = categoryFilteredProducts.map((p) => p.priceValue);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [categoryFilteredProducts]);

  // Initialiser le range de prix avec les valeurs réelles
  React.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [priceRange.min, priceRange.max],
    }));
  }, [priceRange.min, priceRange.max]);

  // Filtrer et trier les produits
  const filteredProducts = React.useMemo(() => {
    let result = [...categoryFilteredProducts];

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
  }, [categoryFilteredProducts, filters]);



  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full mx-auto px-6 lg:px-12">
        {/* Category Tabs */}
        <div className="mb-12 flex items-center gap-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "pb-2 text-3xl font-[400] transition-colors relative cursor-pointer",
              activeCategory === "all"
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                : "text-black hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            <RollingText text="All" triggerOnHover={true} />
          </button>
          <button
            onClick={() => setActiveCategory("homme")}
            className={cn(
              "pb-2 text-3xl font-[400] transition-colors relative cursor-pointer",
              activeCategory === "homme"
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                : "text-black hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            <RollingText text="Homme" triggerOnHover={true} />
          </button>
          <button
            onClick={() => setActiveCategory("femme")}
            className={cn(
              "pb-2 text-3xl font-[400] transition-colors relative cursor-pointer",
              activeCategory === "femme"
                ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                : "text-black hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-transparent hover:after:bg-black/20"
            )}
          >
            <RollingText text="Femme" triggerOnHover={true} />
          </button>
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
