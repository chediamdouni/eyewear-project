import "server-only";

import type { Product } from "@/data/products";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type DbProductListingRow = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  category: "homme" | "femme" | "unisex";
  frame_shape: string;
  color: string;
  badge: "new" | "bestseller" | "sale" | null;
  currency: string;
  main_image_key: string;
  stock: number;
  price_ttc: number;
  price_label: string;
};

type DbProductDetailRow = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: "homme" | "femme" | "unisex";
  frame_shape: string;
  color: string;
  badge: "new" | "bestseller" | "sale" | null;
  currency: string;
  price_ht: number;
  tva_rate: number;
  price_ttc: number;
  price_label: string;
  frame_color: string | null;
  lens: string | null;
  fit: string | null;
  material: string | null;
  origin: string | null;
  main_image_key: string;
};

function mapListingRowToProduct(row: DbProductListingRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    price: row.price_label,
    priceValue: Number(row.price_ttc),
    tagline: row.tagline ?? "",
    description: "",
    frameColor: "",
    lens: "",
    fit: "",
    material: "",
    origin: "",
    // For now we store relative paths in main_image_key.
    image: row.main_image_key,
    category: row.category,
    frameShape: row.frame_shape as Product["frameShape"],
    color: row.color,
    badge: row.badge ?? undefined,
  };
}

function mapDetailRowToProduct(row: DbProductDetailRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    price: row.price_label,
    priceValue: Number(row.price_ttc),
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    frameColor: row.frame_color ?? "",
    lens: row.lens ?? "",
    fit: row.fit ?? "",
    material: row.material ?? "",
    origin: row.origin ?? "",
    image: row.main_image_key,
    category: row.category,
    frameShape: row.frame_shape as Product["frameShape"],
    color: row.color,
    badge: row.badge ?? undefined,
  };
}

export async function listProductsByCategory(category: "homme" | "femme" | "unisex" | "all") {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc("rpc_list_products", {
    p_category: category,
  });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as DbProductListingRow[];
  return rows.map(mapListingRowToProduct);
}

export async function getProductBySlugFromDb(slug: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .rpc("rpc_get_product_by_slug", { p_slug: slug })
    .single();

  if (error) {
    throw error;
  }

  const row = data as DbProductDetailRow;
  return mapDetailRowToProduct(row);
}

