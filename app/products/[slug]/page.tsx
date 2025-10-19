// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { bySlug } from "../../../lib/products";
import ProductGallery from "../../../components/ProductGallery";
import { Playfair_Display } from "next/font/google";
import ProductDetailMobile from "../../../components/ProductDetailMobile";
import {
  Leaf,
  Droplets,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Snowflake,
  Sun,
} from "lucide-react";
import AddToCartButton from "../../../components/AddToCartButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

  // Ensure we always have an array of images
  const images: string[] = product.images?.length ? product.images : [product.image];

  // Pass a normalized product object to the mobile component (it’s fine if some keys are undefined)
  const mobileProduct = {
    ...product,
    images,
    // These optional fields are used by ProductDetailMobile if present:
    // badges: product.badges,
    // highlights: product.highlights,
    // ingredients: product.ingredients,
    // usage: product.usage,
    // variants: product.variants,
  };

  return (
    <section id="top" className="min-h-screen w-full bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] pb-40">
      {/* Mobile layout */}
      <div className="md:hidden">
        <ProductDetailMobile product={mobileProduct as any} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <section className="mx-auto max-w-6xl px-4 py-12 animate-riseUp">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT: Product image + highlights */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <ProductGallery images={images} />
              </div>

              {!!product.highlights?.length && (
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                  {product.highlights.map((h: string) => {
                    const Icon = ICON_MAP[h] ?? <Sparkles className="w-5 h-5 text-[#b8860b]" />;
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
              <h1
                className={`${playfair.className} text-4xl md:text-5xl font-bold tracking-tight text-gray-900`}
              >
                {product.title}
              </h1>

              {product.tagline && (
                <p className="mt-2 text-lg italic text-gray-700">{product.tagline}</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <span
                  className="text-sm tracking-widest uppercase text-gray-600"
                  style={{ letterSpacing: "0.2em" }}
                >
                  USD
                </span>
                <span className="text-2xl font-semibold" style={{ color: "#b8860b" }}>
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {product.description && (
                <p className="mt-6 text-gray-800 leading-relaxed">{product.description}</p>
              )}

              {!!product.benefits?.length && (
                <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                  {product.benefits.map((b: string) => (
                    <li
                      key={b}
                      className="rounded-full border px-3 py-1 bg-white/70 shadow-sm hover:bg-cucumber-50 transition"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA — Add to Cart */}
              <div className="mt-10">
                <AddToCartButton sku={product.sku} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}