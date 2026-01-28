import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/product-page";
import { getProductBySlug, PRODUCTS } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: ProductPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

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
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
