// components/ProductDetailMobile.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";

type Variant = { label: string; price: number; sku?: string };
type Product = {
  sku: string;
  title: string;
  price: number;
  images: string[];
  badges?: string[];
  highlights?: string[];
  description?: string;
  ingredients?: string;
  usage?: string;
  variants?: Variant[];
  rating?: number;        // 0–5 (optional; defaults to 0)
  reviewCount?: number;   // total reviews (optional; defaults to 0)
};

export default function ProductDetailMobile({ product }: { product: Product }) {
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
      {/* Title */}
      <div className="px-4 pt-3">
        <h1 className="text-3xl font-[var(--font-playfair)] leading-tight">
          {product.title}
        </h1>

        {/* Stars + “Reviews” link (scrolls down) */}
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

        {/* Small price like Mario */}
        <div className="mt-2 text-base font-semibold text-cucumber-800">
          {priceLabel}
        </div>
      </div>

      {/* Gallery - single big image + arrows + dots */}
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

      {/* Badges under the photo */}
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

      {/* Details (inline, not collapsible) */}
      {(product.description || product.ingredients || product.usage) && (
        <div className="px-4 mt-4">
          {product.description && (
            <div className="rounded-lg border bg-white p-4">
              <h3 className="font-medium mb-1">Details</h3>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>
          )}
          {product.ingredients && (
            <div className="rounded-lg border bg-white p-4 mt-3">
              <h3 className="font-medium mb-1">Ingredients</h3>
              <p className="text-sm whitespace-pre-line leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}
          {product.usage && (
            <div className="rounded-lg border bg-white p-4 mt-3">
              <h3 className="font-medium mb-1">How to use</h3>
              <p className="text-sm leading-relaxed">{product.usage}</p>
            </div>
          )}
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

      {/* Spacer for sticky bar */}
      <div className="h-28" />

      {/* Sticky add-to-bag with qty at the side */}
      <div className="fixed inset-x-0 bottom-0 z-[60] bg-white/95 backdrop-blur border-t p-3">
        <div className="flex items-center gap-3">
          {/* qty stepper */}
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

          {/* add button */}
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

      {/* ---- Reviews target (for the scroll) ---- */}
      <div id="reviews" className="px-4 pb-40">
        <h2 className="font-[var(--font-playfair)] text-2xl">Reviews</h2>
        <p className="mt-2 text-sm text-gray-700">
          No reviews yet — be the first!
        </p>

        {/* lightweight, non-wired form placeholder */}
        <form className="mt-4 grid gap-3">
          <input
            type="text"
            placeholder="Your name"
            className="rounded-lg border bg-white px-3 py-2 text-sm"
          />
          <select className="rounded-lg border bg-white px-3 py-2 text-sm">
            <option value="">Rating (0–5)</option>
            {[0,1,2,3,4,5].map((n)=>(
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <textarea
            placeholder="Write your review..."
            rows={4}
            className="rounded-lg border bg-white px-3 py-2 text-sm"
          />
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
          <path
            strokeWidth="1.5"
            d="M10 2.5l2.47 5.02 5.54.81-4 3.9.94 5.5L10 15.9 5.05 17.73l.94-5.5-4-3.9 5.54-.81L10 2.5z"
          />
          {isFull && (
            <path d="M10 2.5l2.47 5.02 5.54.81-4 3.9.94 5.5L10 15.9V2.5z" />
          )}
        </svg>
      ))}
    </span>
  );
}