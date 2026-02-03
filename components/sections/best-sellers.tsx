"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { BEST_SELLERS } from "@/data/best-sellers";
import { cn } from "@/lib/utils";

export function BestSellers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative mt-20 md:mt-32 md:px-20 mb-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-8 ml-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Best Sellers
        </h2>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className={cn(
            "absolute left-0 top-1/2 z-20 -translate-x-4 -translate-y-1/2 transition-opacity duration-200 md:-translate-x-8",
            isHovered && !prevBtnDisabled ? "opacity-100" : "opacity-0",
            prevBtnDisabled && "cursor-not-allowed",
          )}
          aria-label="Previous products"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className={cn(
            "absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-4 transition-opacity duration-200 md:translate-x-8",
            isHovered && !nextBtnDisabled ? "opacity-100" : "opacity-0",
            nextBtnDisabled && "cursor-not-allowed",
          )}
          aria-label="Next products"
        >
          <ChevronRight className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8 pl-4 pr-4 md:pl-6 md:pr-6">
            {BEST_SELLERS.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar / Pagination */}
      <div className="mt-8 flex justify-center gap-1.5">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-0.5 w-8 transition-all duration-200",
              index === selectedIndex
                ? "bg-foreground"
                : "bg-border hover:bg-foreground/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
