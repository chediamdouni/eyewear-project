import { CollectionPage } from "@/components/product/collection-page";
import { listProductsByCategory } from "@/lib/db/queries";

export default async function FemmeCollectionPage() {
  const femmeProducts = await listProductsByCategory("femme");

  return <CollectionPage category="femme" products={femmeProducts} />;
}
