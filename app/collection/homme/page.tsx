import { CollectionPage } from "@/components/product/collection-page";
import { listProductsByCategory } from "@/lib/db/queries";

export default async function HommeCollectionPage() {
  const hommeProducts = await listProductsByCategory("homme");

  return <CollectionPage category="homme" products={hommeProducts} />;
}
