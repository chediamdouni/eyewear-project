import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { FadeIn } from "@/components/motion/fade-in";

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

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-10 md:luxury-grid md:items-start">
      <FadeIn
        variants={{
          hidden: { opacity: 0, x: -24 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
          },
        }}
        className="space-y-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-muted-foreground hover:text-foreground"
        >
          <span className="h-px w-8 bg-muted-foreground/60" />
          Back to collection
        </Link>

        <div className="space-y-4">
          <Text variant="caption" className="text-muted-foreground">
            Clevards / Optical &amp; Sun
          </Text>
          <Text variant="h1" className="text-foreground">
            {product.name}
          </Text>
          <Text variant="body" className="max-w-md text-muted-foreground">
            {product.tagline}
          </Text>
        </div>

        <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
          <span>{product.price}</span>
          <Separator className="flex-1" />
          <span>Made in small runs</span>
        </div>

        <Button size="lg">Reserve this frame</Button>

        <div className="mt-8 grid gap-5 text-sm text-muted-foreground md:max-w-md">
          <Detail label="Frame colour">{product.frameColor}</Detail>
          <Detail label="Lens">{product.lens}</Detail>
          <Detail label="Fit">{product.fit}</Detail>
          <Detail label="Material">{product.material}</Detail>
          <Detail label="Origin">{product.origin}</Detail>
        </div>
      </FadeIn>

      <FadeIn
        variants={{
          hidden: { opacity: 0, x: 24 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-slate-100/5 via-slate-50/1 to-slate-900/40 shadow-subtle"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,255,0.16),_transparent_60%)]" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground/90">
          <p>Anti–glare optics · Hand–finished edges</p>
          <p>Clevards Studio</p>
        </div>
      </FadeIn>
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border/60 pt-4">
      <Text variant="label" className="text-muted-foreground">
        {label}
      </Text>
      <Text variant="body" className="mt-1 text-foreground/90">
        {children}
      </Text>
    </div>
  );
}
