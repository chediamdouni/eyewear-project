export type ProductColor = {
  name: string;
  hex: string;
  image: string;
  hoverImage: string;
};

export type BestSellerProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: "New" | "Best Seller";
  colors: ProductColor[];
  slug: string;
};

export const BEST_SELLERS: BestSellerProduct[] = [
  {
    id: "1",
    name: "Clarity 01",
    description: "The iconic cat-eye",
    price: "297 EUR",
    badge: "Best Seller",
    slug: "/product/clarity-01",
    colors: [
      {
        name: "Black",
        hex: "#000000",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Tortoise",
        hex: "#8B4513",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Crystal",
        hex: "#E8E8E8",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
  {
    id: "2",
    name: "Field Spectra",
    description: "Minimalist round frame",
    price: "260 EUR",
    badge: "New",
    slug: "/product/field-spectra",
    colors: [
      {
        name: "Havana",
        hex: "#6B4423",
        image: "/products/IMG_E8668.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Black",
        hex: "#000000",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
  {
    id: "3",
    name: "Linearity",
    description: "Geometric precision",
    price: "297 EUR",
    badge: "Best Seller",
    slug: "/product/linearity",
    colors: [
      {
        name: "Black",
        hex: "#000000",
        image: "/products/IMG_E8676.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: "/products/IMG_E8676.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Gold",
        hex: "#FFD700",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
  {
    id: "4",
    name: "Aperture",
    description: "Bold square silhouette",
    price: "280 EUR",
    slug: "/product/aperture",
    colors: [
      {
        name: "Tortoise",
        hex: "#8B4513",
        image: "/products/IMG_E8713.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Black",
        hex: "#000000",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
  {
    id: "5",
    name: "Prism",
    description: "Angular elegance",
    price: "310 EUR",
    badge: "New",
    slug: "/product/prism",
    colors: [
      {
        name: "Crystal",
        hex: "#E8E8E8",
        image: "/products/IMG_E8817.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Black",
        hex: "#000000",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
  {
    id: "6",
    name: "Vertex",
    description: "Modern aviator",
    price: "275 EUR",
    slug: "/product/vertex",
    colors: [
      {
        name: "Gold",
        hex: "#FFD700",
        image: "/products/IMG_E8820.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: "/products/IMG_E8405.jpg",
        hoverImage: "/images/model-femme.jpg",
      },
    ],
  },
];
