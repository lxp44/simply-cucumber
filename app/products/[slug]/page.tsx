// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { bySlug } from "../../../lib/products";
import ProductGallery from "../../../components/ProductGallery";
import { Playfair_Display } from "next/font/google";
import { Leaf, Droplets, FlaskConical, Sparkles } from "lucide-react"; // icons

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ICON_MAP: Record<string, JSX.Element> = {
  Vegan: <Leaf className="w-4 h-4 text-cucumber-700" />,
  "Paraben-Free": <FlaskConical className="w-4 h-4 text-cucumber-700" />,
  "Synthetic Fragrance-Free": <Sparkles className="w-4 h-4 text-cucumber-700" />,
  "Alcohol-Free": <Droplets className="w-4 h-4 text-cucumber-700" />,
};

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = bySlug(params.slug);
  if (!product) return notFound();

  const images = product.images?.length ? product.images : [product.image];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* LEFT: product image gallery */}
        <ProductGallery images={images} />

        {/* RIGHT: product info */}
        <div className="flex flex-col justify-center">
          {/* Product Title */}
          <h1
            className={`${playfair.className} text-4xl md:text-5xl font-bold tracking-tight text-gray-900`}
          >
            {product.title}
          </h1>

          {/* Tagline */}
          {product.tagline && (
            <p className="mt-2 text-lg italic text-gray-600">
              {product.tagline}
            </p>
          )}

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className="text-sm tracking-widest uppercase text-gray-500"
              style={{ letterSpacing: "0.2em" }}
            >
              USD
            </span>
            <span
              className="text-2xl font-semibold"
              style={{
                color: "#b8860b",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* ICON HIGHLIGHTS */}
          {!!product.highlights?.length && (
            <div className="mt-5 flex flex-wrap gap-5">
              {product.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm text-gray-700">
                  {ICON_MAP[h] ?? <Sparkles className="w-4 h-4 text-cucumber-700" />}
                  <span>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* BENEFITS */}
          {!!product.benefits?.length && (
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {product.benefits.map((b) => (
                <li
                  key={b}
                  className="rounded-full border px-3 py-1 bg-white/70 shadow-sm hover:bg-cucumber-50 transition"
                >
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <form action="/api/checkout" method="POST" className="mt-10">
            <input type="hidden" name="sku" value={product.sku} />
            <button
              className="w-full rounded bg-cucumber-700 px-5 py-3 text-white font-semibold tracking-wide hover:bg-cucumber-800 transition"
              style={{
                boxShadow:
                  "0 4px 14px rgba(27,120,69,0.25)",
              }}
            >
              Buy now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
