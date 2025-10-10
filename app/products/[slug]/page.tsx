// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { bySlug } from "../../../lib/products";
import ProductGallery from "../../../components/ProductGallery"; // ← add this

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = bySlug(params.slug);
  if (!product) return notFound();

  // Use gallery if provided; otherwise fall back to the single image
  const images = product.images?.length ? product.images : [product.image];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT: gallery */}
        <ProductGallery images={images} />

        {/* RIGHT: product info */}
        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          {product.tagline && (
            <p className="mt-2 text-gray-600">{product.tagline}</p>
          )}
          <p className="mt-3 text-xl">${product.price.toFixed(2)}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Benefits */}
          {!!product.benefits?.length && (
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {product.benefits.map((b) => (
                <li
                  key={b}
                  className="rounded-full border px-3 py-1 bg-white/60"
                >
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Buy CTA */}
          <form action="/api/checkout" method="POST" className="mt-8">
            <input type="hidden" name="sku" value={product.sku} />
            <button className="w-full rounded bg-cucumber-600 px-5 py-3 text-white hover:bg-cucumber-700">
              Buy now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
