// components/ProductDetailMobile.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
// import { PRODUCTS } from "@/lib/products";   // ← if this alias breaks on Netlify, switch to:  import { PRODUCTS } from "../lib/products";
import { PRODUCTS } from "../lib/products";     // ✅ safer import for Netlify

// NEW: icons for the badge row
import {
  Leaf,
  FlaskConical,
  Sparkles,
  Droplets,
  Snowflake,
  Sun,
  ShieldCheck,
} from "lucide-react";

const BADGE_ICON: Record<string, JSX.Element> = {
  Vegan: <Leaf className="w-5 h-5" />,
  "Paraben-Free": <FlaskConical className="w-5 h-5" />,
  "Synthetic Fragrance-Free": <Sparkles className="w-5 h-5" />,
  "Alcohol-Free": <Droplets className="w-5 h-5" />,
  Cooling: <Snowflake className="w-5 h-5" />,
  Brightening: <Sun className="w-5 h-5" />,
  Antioxidant: <ShieldCheck className="w-5 h-5" />,
};

type Variant = { label: string; price: number; sku?: string };
type Product = {
  sku: string;
  title: string;
  price: number;
  images: string[];
  badges?: string[];
  highlights?: string[];
  description?: string;     // Product Details (full)
  ingredients?: string;
  usage?: string;           // How to Apply
  shortDescription?: string; // NEW: brief blurb shown under badges
  tagline?: string;          // optional backup for blurb
  variants?: Variant[];
  rating?: number;
  reviewCount?: number;
  category?: string;
};

export default function ProductDetailMobile({
  product,
  related = [],
}: {
  product: Product;
  related?: Array<Partial<Product> & { slug?: string; image?: string }>;
}) {

  const cart = useCart();

  // ---- state ----
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchase, setPurchase] = useState<"onetime" | "subscribe">("onetime");
  const [vIdx, setVIdx] = useState(0);
  const imgs = product.images?.length ? product.images : ["/placeholder.png"];

  const selectedVariant = useMemo(() => {
    if (product.variants?.length) return product.variants[vIdx];
    return { label: "", price: product.price, sku: product.sku };
  }, [product, vIdx]);

  const unitPrice = selectedVariant.price ?? product.price;
  const priceLabel = `$${unitPrice.toFixed(2)}`;

  const rating = Math.max(0, Math.min(5, product.rating ?? 0));
  const reviewCount = product.reviewCount ?? 0;

  function addToCart() {
    const payload = {
      sku: selectedVariant.sku || product.sku,
      title: `${product.title}${selectedVariant.label ? ` — ${selectedVariant.label}` : ""}`,
      price: unitPrice,
      quantity: qty,
      image: imgs[0],
      meta: { purchaseType: purchase },
    } as any;

    if ("addItem" in cart) (cart as any).addItem(payload);
    else if ("add" in cart) (cart as any).add(payload);
    else if ("addToCart" in cart) (cart as any).addToCart(payload);
  }

  function scrollToReviews() {
    const el = document.getElementById("reviews");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="md:hidden bg-[#e3d3b3]">
      {/* Title / stars / small price */}
      <div className="px-4 pt-3">
        <h1 className="text-3xl font-[var(--font-playfair)] leading-tight">
          {product.title}
        </h1>

        <button
          onClick={scrollToReviews}
          className="mt-2 inline-flex items-center gap-2 text-sm text-cucumber-800/90"
          aria-label="Jump to reviews"
        >
          <Stars value={rating} />
          <span className="underline">
            {reviewCount > 0 ? `${reviewCount} Reviews` : "Reviews"}
          </span>
        </button>

        <div className="mt-2 text-base font-semibold text-cucumber-800">
          {priceLabel}
        </div>
      </div>

      {/* Gallery: single image + arrows + dots */}
      <div className="px-4 mt-3">
        <div className="relative w-full h-[78vw] max-h-[560px] overflow-hidden rounded-xl border bg-white">
          <Image
            key={imgs[active]}
            src={imgs[active]}
            alt={product.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {imgs.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={() => setActive((a) => (a - 1 + imgs.length) % imgs.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white w-9 h-9 grid place-items-center backdrop-blur active:scale-[0.98]"
              >
                ‹
              </button>
              <button
                aria-label="Next image"
                onClick={() => setActive((a) => (a + 1) % imgs.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white w-9 h-9 grid place-items-center backdrop-blur active:scale-[0.98]"
              >
                ›
              </button>
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2">
                {imgs.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === active ? "bg-white" : "bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Badges */}
      {!!product.badges?.length && (
        <div className="px-4 mt-4 flex flex-wrap gap-2">
          {product.badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {/* Size / variants */}
      {product.variants?.length ? (
        <div className="px-4 mt-5">
          <div className="text-sm font-medium mb-2">Size</div>
          <div className="flex gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setVIdx(i)}
                className={`rounded-lg px-4 py-2 text-sm border ${
                  i === vIdx
                    ? "bg-cucumber-700 text-white border-cucumber-700"
                    : "bg-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

{/* Badges — icon + label under the photo (Mario style) */}
{!!product.badges?.length && (
  <div className="px-4 mt-5">
    <ul className="grid grid-cols-3 gap-4 text-center">
      {product.badges.map((b) => (
        <li key={b} className="flex flex-col items-center">
          <span className="grid place-items-center w-12 h-12 rounded-full border border-cucumber-700/30 bg-white shadow-sm">
            <span className="text-xl leading-none">
              {ICON_MAP[b] ?? "✨"}
            </span>
          </span>
          <span className="mt-2 text-[13px] font-medium text-cucumber-900">
            {b}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}
      {/* Purchase type */}
      <div className="px-4 mt-5 space-y-3">
        <button
          onClick={() => setPurchase("onetime")}
          className={`w-full rounded-xl border px-4 py-3 text-left ${
            purchase === "onetime"
              ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">One-time</span>
            <span className="font-semibold">{priceLabel}</span>
          </div>
        </button>

        <button
          onClick={() => setPurchase("subscribe")}
          className={`w-full rounded-xl border px-4 py-3 text-left ${
            purchase === "subscribe"
              ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">Subscribe & save</span>
            <span className="text-cucumber-700 text-sm font-semibold">
              Save up to 15%
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Deliver every 30 days · Cancel anytime
          </div>
        </button>
      </div>

      {/* Related products carousel */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="px-4 font-[var(--font-playfair)] text-2xl">
            People also bought
          </h2>
          <div className="mt-3 overflow-x-auto no-scrollbar">
            <ul className="flex gap-3 px-4 pb-2">
              {related.map((p: any) => (
                <li
                  key={p.sku}
                  className="min-w-[220px] max-w-[220px] bg-white rounded-xl border overflow-hidden"
                >
                  <Link href={`/products/${p.slug}`} className="block">
                    <div className="relative w-full h-40">
                      <Image
                        src={p.image || p.images?.[0]}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm line-clamp-2">{p.title}</div>
                      <div className="mt-1 text-cucumber-800 font-semibold">
                        ${p.price.toFixed(2)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Accordion: Ingredients / Product Details / How to Apply */}
      {(product.ingredients || product.description || product.usage) && (
        <section className="px-4 mt-4 space-y-2">
          <AccordionRow title="Ingredients">
            {product.ingredients ? (
              <p className="text-sm whitespace-pre-line leading-relaxed">
                {product.ingredients}
              </p>
            ) : (
              <Empty />
            )}
          </AccordionRow>

          <AccordionRow title="Product Details">
            {product.description ? (
              <p className="text-sm leading-relaxed">{product.description}</p>
            ) : (
              <Empty />
            )}
          </AccordionRow>

          <AccordionRow title="How to Apply">
            {product.usage ? (
              <p className="text-sm leading-relaxed">{product.usage}</p>
            ) : (
              <Empty />
            )}
          </AccordionRow>
        </section>
      )}

      {/* Spacer for sticky bar */}
      <div className="h-28" />

      {/* Sticky add-to-bag with qty at the side */}
      <div className="fixed inset-x-0 bottom-0 z-[60] bg-white/95 backdrop-blur border-t p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border bg-white">
            <button
              className="px-3 py-2 text-xl"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center">{qty}</span>
            <button
              className="px-3 py-2 text-xl"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            className="flex-1 rounded-lg bg-cucumber-700 text-white py-3 text-center font-semibold active:scale-[0.99]"
          >
            ADD TO BAG • {priceLabel}
          </button>

          <a href="#top" className="rounded-lg border px-3 py-3 text-xs">
            TOP
          </a>
        </div>
      </div>

      {/* Shipping blurb */}
      <div className="px-4 my-6 text-xs text-gray-700">
        Free shipping on orders $65+ • Easy returns within 30 days.
      </div>

      {/* Reviews target (for the scroll) */}
      <div id="reviews" className="px-4 pb-40">
        <h2 className="font-[var(--font-playfair)] text-2xl">Reviews</h2>
        <p className="mt-2 text-sm text-gray-700">No reviews yet — be the first!</p>

        <form className="mt-4 grid gap-3">
          <input type="text" placeholder="Your name" className="rounded-lg border bg-white px-3 py-2 text-sm" />
          <select className="rounded-lg border bg-white px-3 py-2 text-sm">
            <option value="">Rating (0–5)</option>
            {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <textarea rows={4} placeholder="Write your review..." className="rounded-lg border bg-white px-3 py-2 text-sm" />
          <button
            type="button"
            className="rounded-lg bg-cucumber-700 text-white px-4 py-2 text-sm font-medium"
            onClick={() => alert("Hook this up to your reviews backend.")}
          >
            Submit review
          </button>
        </form>
      </div>
    </div>
  );
}

/* ——— accordions ——— */
function AccordionRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="rounded-lg border bg-[#edf7f1]/40 open:bg-white">
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-[15px] font-medium">
        <span>{title}</span>
        <span className="ml-3 inline-block rounded-full border w-6 h-6 grid place-items-center">+</span>
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}

function Empty() {
  return <p className="text-sm text-gray-500">Info coming soon.</p>;
}

/* ——— tiny star renderer ——— */
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const items = Array.from({ length: 5 }, (_, i) => i < full);
  return (
    <span className="inline-flex" aria-hidden>
      {items.map((isFull, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${isFull ? "fill-cucumber-700" : "fill-none"} stroke-cucumber-700`}
        >
          <path strokeWidth="1.5" d="M10 2.5l2.47 5.02 5.54.81-4 3.9.94 5.5L10 15.9 5.05 17.73l.94-5.5-4-3.9 5.54-.81L10 2.5z" />
          {isFull && <path d="M10 2.5l2.47 5.02 5.54.81-4 3.9.94 5.5L10 15.9V2.5z" />}
        </svg>
      ))}
    </span>
  );
}