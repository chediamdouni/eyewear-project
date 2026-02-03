export type Product = {
  slug: string;
  name: string;
  price: string;
  priceValue: number; // Valeur numérique pour le filtrage
  tagline: string;
  description: string;
  frameColor: string;
  lens: string;
  fit: string;
  material: string;
  origin: string;
  image: string;
  // Propriétés de filtrage
  category: "homme" | "femme" | "unisex";
  frameShape: "carrée" | "ronde" | "rectangulaire" | "aviateur" | "cat-eye" | "pantos";
  color: string; // Couleur principale pour le filtrage
  badge?: "new" | "bestseller" | "sale";
};

export const PRODUCTS: Product[] = [
  {
    slug: "clarity-01",
    name: "Clarity 01",
    price: "420 TND",
    priceValue: 420,
    tagline: "Architected for quiet confidence in sharp acetate.",
    description:
      "A low-profile square silhouette in sculpted Japanese acetate with softened inner edges. Designed to sit close to the face while maintaining a generous visual field.",
    frameColor: "Deep ink tortoise",
    lens: "Demo lens with anti-glare coating",
    fit: "Medium European fit / Keyhole bridge",
    material: "Japanese acetate, titanium core wire",
    origin: "Hand-finished in Fukui, Japan",
    image: "/products/IMG_E8405.jpg",
    category: "homme",
    frameShape: "carrée",
    color: "écaille",
    badge: "new",
  },
  {
    slug: "field-spectra",
    name: "Field Spectra",
    price: "460 TND",
    priceValue: 460,
    tagline: "Sun optics tuned for cities that never fully sleep.",
    description:
      "A slender navigator with a subtle curve across the brow line. The lens tint is calibrated for high contrast without harshness, ideal for long days split between screen and street.",
    frameColor: "Brushed graphite with warm champagne rim",
    lens: "CR-39 sun lens / gradient smoke with 100% UV",
    fit: "Wide fit / Adjustable titanium nose pads",
    material: "Beta-titanium, stainless hinges",
    origin: "Engineered in Berlin, finished in Sabae",
    image: "/images/products/IMG_E8668.jpg",
    category: "homme",
    frameShape: "aviateur",
    color: "noir",
    badge: "bestseller",
  },
  {
    slug: "linearity",
    name: "Linearity",
    price: "395 TND",
    priceValue: 395,
    tagline: "An ultra-thin round for those who edit everything.",
    description:
      "Minimalist round lenses suspended in a nearly weightless frame. The profile disappears from most angles, leaving only a faint graphic line at the temple.",
    frameColor: "Soft matte espresso",
    lens: "Demo lens / blue-light ready",
    fit: "Narrow fit / Sculpted saddle bridge",
    material: "Stainless steel with acetate temple tips",
    origin: "Assembled in Italy / finished by hand",
    image: "/images/products/IMG_E8676.jpg",
    category: "unisex",
    frameShape: "ronde",
    color: "marron",
  },
  // Ajout de produits supplémentaires pour la démo
  {
    slug: "elegance-femme",
    name: "Elegance",
    price: "380 TND",
    priceValue: 380,
    tagline: "Sophisticated cat-eye for the modern woman.",
    description:
      "A refined cat-eye frame with delicate curves and premium acetate construction.",
    frameColor: "Rose gold",
    lens: "UV protection lens",
    fit: "Medium fit",
    material: "Acetate",
    origin: "Handcrafted in Italy",
    image: "/products/IMG_E8405.jpg",
    category: "femme",
    frameShape: "cat-eye",
    color: "rose",
    badge: "new",
  },
  {
    slug: "classic-square",
    name: "Classic Square",
    price: "350 TND",
    priceValue: 350,
    tagline: "Timeless square frame.",
    description:
      "A classic square frame that never goes out of style.",
    frameColor: "Black",
    lens: "Standard lens",
    fit: "Medium fit",
    material: "Acetate",
    origin: "Made in France",
    image: "/images/products/IMG_E8668.jpg",
    category: "homme",
    frameShape: "carrée",
    color: "noir",
  },
  {
    slug: "vintage-round",
    name: "Vintage Round",
    price: "320 TND",
    priceValue: 320,
    tagline: "Retro-inspired round frames.",
    description:
      "Inspired by the 70s, these round frames bring vintage charm.",
    frameColor: "Tortoise",
    lens: "Blue light filter",
    fit: "Narrow fit",
    material: "Acetate",
    origin: "Handcrafted",
    image: "/images/products/IMG_E8676.jpg",
    category: "femme",
    frameShape: "ronde",
    color: "écaille",
    badge: "bestseller",
  },
  {
    slug: "modern-pantos",
    name: "Modern Pantos",
    price: "440 TND",
    priceValue: 440,
    tagline: "Contemporary pantos shape.",
    description:
      "A modern take on the classic pantos shape with updated proportions.",
    frameColor: "Transparent",
    lens: "Gradient lens",
    fit: "Wide fit",
    material: "Acetate",
    origin: "Designed in Japan",
    image: "/products/IMG_E8405.jpg",
    category: "unisex",
    frameShape: "pantos",
    color: "transparent",
  },
  {
    slug: "aviator-classic",
    name: "Aviator Classic",
    price: "400 TND",
    priceValue: 400,
    tagline: "The iconic aviator style.",
    description:
      "Classic aviator frames with metal construction and timeless appeal.",
    frameColor: "Gold",
    lens: "Polarized lens",
    fit: "Medium fit",
    material: "Metal",
    origin: "Made in USA",
    image: "/images/products/IMG_E8668.jpg",
    category: "homme",
    frameShape: "aviateur",
    color: "or",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}


