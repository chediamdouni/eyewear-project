import { CollectionPage } from "@/components/collection/collection-page";
import { PRODUCTS } from "@/data/products";

export default function HommeCollectionPage() {
  // Filtrer les produits pour la catégorie homme (inclut aussi unisex)
  const hommeProducts = PRODUCTS.filter(
    (product) => product.category === "homme" || product.category === "unisex"
  );

  return <CollectionPage category="homme" products={hommeProducts} />;
}
