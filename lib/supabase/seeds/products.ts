import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/products";


export async function seedProducts() {
  const supabase = createSupabaseServerClient();

  const rows = PRODUCTS.map((product) => ({
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    frame_color: product.frameColor,
    lens: product.lens,
    fit: product.fit,
    material: product.material,
    origin: product.origin,
    category: product.category,
    frame_shape: product.frameShape,
    color: product.color,
    badge: product.badge ?? null,
    price_ht: product.priceValue,
    // Simple default TVA and stock for seeding
    tva_rate: 19,
    currency: "TND",
    stock: 25,
    // For now we reuse the existing local image path as the key.
    main_image_key: product.image,
  }));

  const { error } = await supabase.from("products").insert(rows);

  if (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

