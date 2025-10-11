import { notFound } from "next/navigation";
import { bySlug } from "../../../lib/products";
import ProductGallery from "../../../components/ProductGallery";
import { Playfair_Display } from "next/font/google";
import {
  Leaf,
  Droplets,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Snowflake,
  Sun,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ICON MAP
const ICON_MAP: Record<string, JSX.Element> = {
  Vegan: <Leaf className="w-5 h-5 text-[#b8860b]" />,
  "Paraben-Free": <FlaskConical className="w-5 h-5 text-[#b8860b]" />,
  "Synthetic Fragrance-Free": <Sparkles className="w-5 h-5 text-[#b8860b]" />,
  "Alcohol-Free": <Droplets className="w-5 h-5 text-[#b8860b]" />,
  Cooling: <Snowflake className="w-5 h-5 text-[#b8860b]" />,
  Brightening: <Sun className="w-5 h-5 text-[#b8860b]" />,
  Antioxidant: <ShieldCheck className="w-5 h-5 text-[#b8860b]" />,
};

type PageProps = { params: { slug: string } };

export default function ProductPage({ params }: PageProps) {
  const product = bySlug(params.slug);
  if (!product) return notFound();

  const images = product.images?.length ? product.images : [product.image];

  return (
    // 🟤 Full background container
    <div className="min-h-screen w-full" style={{ backgroundColor: "#e3d3b3" }}>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT: Product image + highlights */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <ProductGallery images={images} />
            </div>

            {/* ICON HIGHLIGHTS under image */}
            {!!product.highlights?.length && (
              <div className="mt-6 flex flex-wrap justify-center gap-6">
                {product.highlights.map((h) => {
                  const Icon =
                    ICON_MAP[h] ?? <Sparkles className="w-5 h-5 text-[#b8860b]" />;
                  return (
                    <div
                      key={h}
                      className="
                        group relative overflow-hidden
                        flex items-center gap-2 rounded-full
                        border border-[#d6c28a]/60 bg-white/80 px-3 py-1.5
                        text-sm text-gray-800 shadow-sm
                        transition
                        hover:-translate-y-0.5 hover:shadow-md hover:bg-white
                        hover:border-[#b8860b]/70
                      "
                    >
                      <span className="shrink-0">{Icon}</span>
                      <span className="whitespace-nowrap">{h}</span>

                      {/* Chanel shimmer */}
                      <span
                        className="
                          pointer-events-none absolute inset-0
                          -translate-x-full
                          bg-gradient-to-r from-transparent via-white/40 to-transparent
                          group-hover:animate-shimmer
                        "
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col justify-center">
            {/* Product Title */}
            <h1
              className={`${playfair.className} text-4xl md:text-5xl font-bold tracking-tight text-gray-900`}
            >
              {product.title}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="mt-2 text-lg italic text-gray-700">
                {product.tagline}
              </p>
            )}

            {/* PRICE */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className="text-sm tracking-widest uppercase text-gray-600"
                style={{ letterSpacing: "0.2em" }}
              >
                USD
              </span>
              <span
                className="text-2xl font-semibold"
                style={{ color: "#b8860b" }}
              >
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-800 leading-relaxed">
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
                  boxShadow: "0 4px 14px rgba(27,120,69,0.25)",
                }}
              >
                Buy now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}