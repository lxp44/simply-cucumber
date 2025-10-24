"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";
import { useCart } from "./CartProvider";
import {
  CheckCircle2,
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

export default function ProductDetailDesktop({ product }: { product: Product }) {
  const cart = useCart();

  // -------- state ----------
  const [vIdx, setVIdx] = useState(0);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchase, setPurchase] = useState<"onetime" | "subscribe">("onetime");
  const [tab, setTab] = useState<"ingredients" | "details" | "usage" | "benefits">("details");

  // -------- gallery build (variant-first) ----------
  const imgs = useMemo(() => {
    const v = product.variants?.[vIdx];
    const fromVariant =
      (v?.images && v.images.length > 0 && v.images) ||
      (v?.image ? [v.image] : []);
    const base = product.images ?? (product.image ? [product.image] : []);
    const merged = [...(fromVariant ?? []), ...(base ?? [])];
    return merged.length ? merged : ["/placeholder.png"];
  }, [product, vIdx]);

  useEffect(() => {
    setActive(0); // reset to first image when variant changes
  }, [vIdx, product.slug]);

  const selectedVariant = useMemo(() => {
    if (product.variants?.length) return product.variants[vIdx]!;
    return { label: "", price: product.price, sku: product.sku };
  }, [product, vIdx]);

  const unitPrice = selectedVariant.price ?? product.price;
  const priceLabel = `$${unitPrice.toFixed(2)}`;

  const badges =
    Array.isArray(product.badges) && product.badges.length
      ? product.badges
      : Array.isArray(product.highlights)
      ? product.highlights.slice(0, 3)
      : [];

  const blurb =
    product.shortDescription ||
    product.tagline ||
    (product.description
      ? product.description.split(". ")[0] +
        (product.description.includes(".") ? "." : "")
      : "");

  function addToCart() {
    const payload = {
      sku: (selectedVariant as any).sku || product.sku,
      title: `${product.title}${
        (selectedVariant as any).label ? ` — ${(selectedVariant as any).label}` : ""
      }`,
      price: unitPrice,
      quantity: qty,
      image: imgs[0],
      meta: { purchaseType: purchase },
    } as any;

    if ("addItem" in cart) (cart as any).addItem(payload);
    else if ("add" in cart) (cart as any).add(payload);
    else if ("addToCart" in cart) (cart as any).addToCart(payload);
  }

  return (
    <div className="hidden md:block">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-12 gap-10">
        {/* Left: gallery */}
        <div className="col-span-6">
          <div className="aspect-[4/5] relative rounded-xl border bg-white overflow-hidden">
            <Image
              key={`${product.slug}-${vIdx}-${imgs[active]}`}
              src={imgs[active]}
              alt={`${product.title}${selectedVariant.label ? ` — ${selectedVariant.label}` : ""}`}
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* thumbnails */}
          {imgs.length > 1 && (
            <div className="mt-4 grid grid-cols-6 gap-3">
              {imgs.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActive(i)}
                  className={`relative aspect-square rounded-lg border overflow-hidden ${
                    i === active ? "ring-2 ring-cucumber-700" : ""
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: content */}
        <div className="col-span-6">
          <h1 className="text-4xl font-[var(--font-playfair)] leading-tight">{product.title}</h1>

          <div className="mt-2 text-2xl font-semibold text-cucumber-800">{priceLabel}</div>

          {/* badges */}
          {badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-cucumber-700/30 bg-white px-3 py-1 text-sm text-cucumber-900"
                >
                  {BADGE_ICON[b] ?? <Sparkles className="w-5 h-5" />}
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* short blurb */}
          {blurb && <p className="mt-4 text-gray-800 leading-7">{blurb}</p>}

          {/* variants */}
          {product.variants?.length ? (
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setVIdx(i)}
                    className={`rounded-lg px-4 py-2 text-sm border transition ${
                      i === vIdx
                        ? "bg-cucumber-700 text-white border-cucumber-700"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* purchase type */}
          <div className="mt-6 grid gap-3">
            <label
              className={`rounded-xl border px-4 py-3 cursor-pointer ${
                purchase === "onetime" ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white" : "bg-white"
              }`}
            >
              <input
                type="radio"
                name="purchase"
                className="mr-2"
                checked={purchase === "onetime"}
                onChange={() => {}}
                onClick={() => setPurchase("onetime")}
              />
              <span className="font-medium">One-time</span>
              <span className="float-right font-semibold">{priceLabel}</span>
            </label>

            <label
              className={`rounded-xl border px-4 py-3 cursor-pointer ${
                purchase === "subscribe" ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white" : "bg-white"
              }`}
            >
              <input
                type="radio"
                name="purchase"
                className="mr-2"
                checked={purchase === "subscribe"}
                onChange={() => {}}
                onClick={() => setPurchase("subscribe")}
              />
              <span className="font-medium">Subscribe & save</span>
              <span className="ml-2 text-cucumber-700 text-sm font-semibold">Save up to 15%</span>
              <div className="mt-1 text-xs text-gray-600">
                Deliver every 30 days · Cancel anytime
              </div>
            </label>
          </div>

          {/* qty + add to bag */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-full border bg-white">
              <button
                className="px-3 py-2 text-xl"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center">{qty}</span>
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
              className="flex-1 rounded-lg bg-cucumber-700 text-white px-6 text-base font-semibold"
            >
              ADD TO BAG • {priceLabel}
            </button>
          </div>

          {/* tabs */}
          {(product.ingredients || product.description || product.usage || product.benefits?.length) && (
            <div className="mt-10">
              <div className="border-b flex gap-6">
                <TabButton id="details"   tab={tab} setTab={setTab} label="Product Details" />
                <TabButton id="ingredients" tab={tab} setTab={setTab} label="Ingredients" />
                <TabButton id="usage"     tab={tab} setTab={setTab} label="How to Apply" />
                <TabButton id="benefits"  tab={tab} setTab={setTab} label="Benefits" />
              </div>

              <div className="pt-6">
                {tab === "details" && (
                  product.description ? (
                    <p className="leading-7 text-gray-800">{product.description}</p>
                  ) : <Empty />
                )}

                {tab === "ingredients" && (
                  product.ingredients ? (
                    <p className="leading-7 whitespace-pre-line text-gray-800">
                      {product.ingredients}
                    </p>
                  ) : <Empty />
                )}

                {tab === "usage" && (
                  product.usage ? (
                    <p className="leading-7 text-gray-800">{product.usage}</p>
                  ) : <Empty />
                )}

                {tab === "benefits" && (
                  Array.isArray(product.benefits) && product.benefits.length ? (
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-cucumber-700" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <Empty />
                )}
              </div>
            </div>
          )}

          {/* reviews (simple placeholder area) */}
          <div id="reviews" className="mt-10">
            <h2 className="font-[var(--font-playfair)] text-2xl">Customer Reviews</h2>
            <p className="mt-2 text-sm text-gray-700">No reviews yet — be the first!</p>

            <form className="mt-4 grid gap-3 max-w-lg">
              <input
                type="text"
                placeholder="Your name"
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              />
              <select className="rounded-lg border bg-white px-3 py-2 text-sm">
                <option value="">Rating (0–5)</option>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <textarea
                rows={4}
                placeholder="Write your review..."
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              />
              <button
                type="button"
                className="rounded-lg bg-cucumber-700 text-white px-4 py-2 text-sm font-medium w-fit"
                onClick={() => alert("Hook this up to your reviews backend.")}
              >
                Submit review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  id,
  tab,
  setTab,
  label,
}: {
  id: "ingredients" | "details" | "usage" | "benefits";
  tab: "ingredients" | "details" | "usage" | "benefits";
  setTab: (t: any) => void;
  label: string;
}) {
  const active = tab === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={`relative px-2 py-3 text-sm font-medium transition ${
        active ? "text-cucumber-800" : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-cucumber-700" />
      )}
    </button>
  );
}

function Empty() {
  return <p className="text-sm text-gray-500">Info coming soon.</p>;
}