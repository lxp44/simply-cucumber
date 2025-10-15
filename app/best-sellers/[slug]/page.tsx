// app/best-sellers/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { bySlug } from "../../../lib/products";
import AddToCartButton from "../../../components/AddToCartButton"; // see step 4

type PageProps = { params: { slug: string } };

export default function BestSellerBioPage({ params }: PageProps) {
  const product = bySlug(params.slug);
  if (!product || !product.bestSeller) return notFound();

  const images = product.images?.length ? product.images : [product.image];

  return (
    <section className="bg-[#e3d3b3]">
      <div className="mx-auto max-w-6xl px-4 py-12 grid lg:grid-cols-2 gap-10">
        {/* LEFT: hero image */}
        <div>
          <div className="relative w-full h-[520px] rounded-xl overflow-hidden bg-white">
            <Image src={images[0]} alt={product.title} fill className="object-cover" />
          </div>

          {/* optional thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.slice(1).map((src) => (
                <div key={src} className="relative h-20 w-20 rounded overflow-hidden border">
                  <Image src={src} alt={`${product.title} alt`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: rich bio */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-xl text-[#b8860b]">${product.price.toFixed(2)}</p>

          <div className="mt-6 space-y-4 text-gray-800 leading-relaxed">
            {/* Prefer product.bio, fall back to description */}
            <p>{product.bio ?? product.description}</p>

            {/* Optional: quick bullets if you have benefits */}
            {!!product.benefits?.length && (
              <ul className="list-disc pl-5 space-y-1">
                {product.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <AddToCartButton sku={product.sku} />
          </div>
        </div>
      </div>
    </section>
  );
}