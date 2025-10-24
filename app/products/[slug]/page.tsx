// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { bySlug, PRODUCTS } from "../../../lib/products";
import ProductDetailMobile from "../../../components/ProductDetailMobile";
import ProductDetailDesktop from "../../../components/ProductDetailDesktop";

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = bySlug(params.slug);
  if (!product) return notFound();

  // Related: same category, exclude self
  const related =
    (Array.isArray(PRODUCTS) ? PRODUCTS : [])
      .filter((p) => p.sku !== product.sku && p.category === product.category)
      .slice(0, 8);

  return (
    <section
      id="top"
      className="min-h-screen w-full bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c]"
    >
      {/* Mobile-only */}
      <div className="md:hidden">
        <ProductDetailMobile product={product} related={related} />
      </div>

      {/* Desktop-only */}
      <div className="hidden md:block">
        <ProductDetailDesktop product={product} />
      </div>
    </section>
  );
}