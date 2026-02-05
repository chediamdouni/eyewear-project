import { CollectionPage } from "@/components/product/collection-page";
import { PRODUCTS } from "@/data/products";

export default function FemmeCollectionPage() {
  // Filtrer les produits pour la catégorie femme (inclut aussi unisex)
  const femmeProducts = PRODUCTS.filter(
    (product) => product.category === "femme" || product.category === "unisex"
  );

  return <CollectionPage category="femme" products={femmeProducts} allProducts={PRODUCTS} />;
}
