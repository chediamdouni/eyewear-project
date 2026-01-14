export type Product = {
  slug: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  frameColor: string;
  lens: string;
  fit: string;
  material: string;
  origin: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "clarity-01",
    name: "Clarity 01",
    price: "€420",
    tagline: "Architected for quiet confidence in sharp acetate.",
    description:
      "A low-profile square silhouette in sculpted Japanese acetate with softened inner edges. Designed to sit close to the face while maintaining a generous visual field.",
    frameColor: "Deep ink tortoise",
    lens: "Demo lens with anti-glare coating",
    fit: "Medium European fit / Keyhole bridge",
    material: "Japanese acetate, titanium core wire",
    origin: "Hand-finished in Fukui, Japan",
    image: "/products/clarity-01.jpg",
  },
  {
    slug: "field-spectra",
    name: "Field Spectra",
    price: "€460",
    tagline: "Sun optics tuned for cities that never fully sleep.",
    description:
      "A slender navigator with a subtle curve across the brow line. The lens tint is calibrated for high contrast without harshness, ideal for long days split between screen and street.",
    frameColor: "Brushed graphite with warm champagne rim",
    lens: "CR-39 sun lens / gradient smoke with 100% UV",
    fit: "Wide fit / Adjustable titanium nose pads",
    material: "Beta-titanium, stainless hinges",
    origin: "Engineered in Berlin, finished in Sabae",
    image: "/products/field-spectra.jpg",
  },
  {
    slug: "linearity",
    name: "Linearity",
    price: "€395",
    tagline: "An ultra-thin round for those who edit everything.",
    description:
      "Minimalist round lenses suspended in a nearly weightless frame. The profile disappears from most angles, leaving only a faint graphic line at the temple.",
    frameColor: "Soft matte espresso",
    lens: "Demo lens / blue-light ready",
    fit: "Narrow fit / Sculpted saddle bridge",
    material: "Stainless steel with acetate temple tips",
    origin: "Assembled in Italy / finished by hand",
    image: "/products/linearity.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}


