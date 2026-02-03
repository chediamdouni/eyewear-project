"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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

const FRAME_SHAPES = [
  "carrée",
  "ronde",
  "rectangulaire",
  "aviateur",
  "cat-eye",
  "pantos",
] as const;

const COLORS = [
  "noir",
  "écaille",
  "transparent",
  "marron",
  "rose",
  "or",
  "vert",
] as const;

export function CollectionPage({ category, products }: CollectionPageProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);
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

  const handleFrameShapeToggle = (shape: string) => {
    setFilters((prev) => ({
      ...prev,
      frameShape: prev.frameShape.includes(shape)
        ? prev.frameShape.filter((s) => s !== shape)
        : [...prev.frameShape, shape],
    }));
  };

  const handleColorToggle = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }));
  };

  const handlePriceRangeChange = (value: string) => {
    const [min, max] = value.split("-").map(Number);
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  const clearFilters = () => {
    setFilters({
      frameShape: [],
      color: [],
      priceRange: [priceRange.min, priceRange.max],
      sort: "default",
    });
  };

  const activeFiltersCount =
    filters.frameShape.length + filters.color.length +
    (filters.priceRange[0] !== priceRange.min ||
      filters.priceRange[1] !== priceRange.max
      ? 1
      : 0);

  // Fonction qui retourne le contenu des filtres (pas un composant React)
  const renderFiltersContent = () => (
    <div className="space-y-6">
      {/* Forme de monture */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="shape">
          <AccordionTrigger>Forme de monture</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {FRAME_SHAPES.map((shape) => (
                <label
                  key={shape}
                  className="flex items-center space-x-2 cursor-pointer hover:text-primary"
                >
                  <input
                    type="checkbox"
                    checked={filters.frameShape.includes(shape)}
                    onChange={() => handleFrameShapeToggle(shape)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm capitalize">{shape}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Couleur */}
        <AccordionItem value="color">
          <AccordionTrigger>Couleur</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {COLORS.map((color) => (
                <label
                  key={color}
                  className="flex items-center space-x-2 cursor-pointer hover:text-primary"
                >
                  <input
                    type="checkbox"
                    checked={filters.color.includes(color)}
                    onChange={() => handleColorToggle(color)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm capitalize">{color}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Prix */}
        <AccordionItem value="price">
          <AccordionTrigger>Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tranche de prix</Label>
                <Select
                  value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
                  onValueChange={handlePriceRangeChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={`${priceRange.min}-${priceRange.max}`}>
                      Tous les prix
                    </SelectItem>
                    <SelectItem value="0-200">Moins de 200 TND</SelectItem>
                    <SelectItem value="200-350">200 - 350 TND</SelectItem>
                    <SelectItem value="350-450">350 - 450 TND</SelectItem>
                    <SelectItem value="450-1000">Plus de 450 TND</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{filters.priceRange[0]} TND</span>
                <span>-</span>
                <span>{filters.priceRange[1]} TND</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Bouton réinitialiser */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Réinitialiser les filtres ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Collection {category === "homme" ? "Homme" : "Femme"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Tri */}
          <Select
            value={filters.sort}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, sort: value as SortOption }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Par défaut</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="newest">Nouveautés</SelectItem>
            </SelectContent>
          </Select>

          {/* Bouton filtres mobile */}
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2">{activeFiltersCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {renderFiltersContent()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filtres Desktop */}
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <div className="sticky top-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtres</h2>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-xs"
                >
                  Réinitialiser
                </Button>
              )}
            </div>
            {renderFiltersContent()}
          </div>
        </aside>

        {/* Grille de produits */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-lg text-muted-foreground">
                Aucun produit trouvé
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        <div
          className="relative aspect-square overflow-hidden bg-muted/30"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badge */}
          {product.badge && (
            <div className="absolute left-3 top-3 z-10">
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider",
                  product.badge === "new" && "bg-blue-50 text-blue-700",
                  product.badge === "bestseller" && "bg-orange-50 text-orange-700",
                  product.badge === "sale" && "bg-red-50 text-red-700"
                )}
              >
                {product.badge === "new" && "Nouveau"}
                {product.badge === "bestseller" && "Best-seller"}
                {product.badge === "sale" && "Promo"}
              </Badge>
            </div>
          )}

          {/* Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered && "scale-105"
            )}
          />
        </div>

        {/* Product Info */}
        {/* <div className="p-4">
          <h3 className="font-semibold text-foreground">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.tagline}
          </p>
          <p className="mt-2 text-lg font-bold text-foreground">
            {product.price}
          </p>
        </div> */}
      </Card>
    </Link>
  );
}
