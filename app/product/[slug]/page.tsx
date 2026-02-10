import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/product-page";
import { getProductBySlugFromDb, listProductsByCategory } from "@/lib/db/queries";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  // On utilise la catégorie "all" pour récupérer tous les slugs disponibles.
  const products = await listProductsByCategory("all");

  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: ProductPageProps,
): Promise<Metadata> {
  const { slug } = props.params;
  const product = await getProductBySlugFromDb(slug);

  if (!product) {
    return {
      title: "Clevards Eyewear — Product",
    };
  }

  return {
    title: `${product.name} — Clevards Eyewear`,
    description: product.tagline,
  };
}

export default async function ProductPageRoute(props: ProductPageProps) {
  const { slug } = props.params;
  const product = await getProductBySlugFromDb(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
