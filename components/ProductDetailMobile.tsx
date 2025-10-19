"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useCart } from "./CartProvider";

type Variant = {
  label: string;          // e.g. "6 oz"
  price: number;          // price for this variant
  sku?: string;           // optional per-variant sku
};

type Product = {
  sku: string;
  title: string;
  price: number;
  images: string[];       // paths under /public
  badges?: string[];      // e.g. ["Vegan","Paraben-Free","Phthalate-Free"]
  highlights?: string[];  // e.g. ["100% Natural","Hydration Boost"]
  description?: string;
  ingredients?: string;
  usage?: string;
  variants?: Variant[];   // optional
};

export default function ProductDetailMobile({ product }: { product: Product }) {
  const cart = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [sub, setSub] = useState<"onetime" | "subscribe">("onetime");
  const [vIdx, setVIdx] = useState(0);

  const selectedVariant = useMemo(() => {
    if (product.variants?.length) return product.variants[vIdx];
    return { label: "", price: product.price, sku: product.sku };
  }, [product, vIdx]);

  const price = selectedVariant.price ?? product.price;
  const displayPrice = `$${price.toFixed(2)}`;

  function addToCart() {
    const item = {
      sku: selectedVariant.sku || product.sku,
      title: `${product.title}${selectedVariant.label ? ` — ${selectedVariant.label}` : ""}`,
      price,
      quantity: qty,
      image: product.images?.[0],
      meta: { purchaseType: sub },
    } as any;

    // Be resilient to CartProvider method name differences
    if ("addItem" in cart) (cart as any).addItem(item);
    else if ("add" in cart) (cart as any).add(item);
    else if ("addToCart" in cart) (cart as any).addToCart(item);
  }

  return (
    <div className="md:hidden">
      {/* Gallery */}
      <div className="px-4 pt-2">
        <div className="relative w-full h-[54vw] rounded-lg overflow-hidden bg-white/70">
          <Image
            src={product.images?.[activeImg] || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Thumbs */}
        {product.images?.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActiveImg(i)}
                className={`relative h-16 w-16 shrink-0 rounded-md overflow-hidden border ${i===activeImg ? "border-cucumber-700" : "border-transparent"}`}
                aria-label={`Image ${i+1}`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Badges row */}
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

      {/* Title & price */}
      <div className="px-4 mt-4">
        <h1 className="text-3xl font-[var(--font-playfair)]">{product.title}</h1>
        <div className="mt-2 text-xl font-semibold text-cucumber-800">{displayPrice}</div>
      </div>

      {/* Size selector (variants) */}
      {product.variants?.length ? (
        <div className="px-4 mt-4">
          <div className="text-sm font-medium mb-2">Size</div>
          <div className="flex gap-2">
            {product.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setVIdx(i)}
                className={`rounded-lg px-4 py-2 text-sm border ${i===vIdx ? "bg-cucumber-700 text-white border-cucumber-700" : "bg-white"}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Purchase type */}
      <div className="px-4 mt-4 space-y-3">
        <button
          onClick={() => setSub("onetime")}
          className={`w-full rounded-xl border px-4 py-3 text-left ${sub==="onetime" ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white" : "bg-white"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">One-time</span>
            <span className="font-semibold">{displayPrice}</span>
          </div>
        </button>

        <button
          onClick={() => setSub("subscribe")}
          className={`w-full rounded-xl border px-4 py-3 text-left ${sub==="subscribe" ? "border-cucumber-700 ring-1 ring-cucumber-700 bg-white" : "bg-white"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">Subscribe & save</span>
            <span className="text-cucumber-700 text-sm font-semibold">Save up to 15%</span>
          </div>
          <div className="mt-1 text-xs text-gray-600">Deliver every 30 days · Cancel anytime</div>
        </button>
      </div>

      {/* Qty + Add */}
      <div className="px-4 mt-4 pb-28"> {/* bottom padding for sticky bar */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* Sticky add-to-bag bar */}
      <div className="fixed inset-x-0 bottom-0 z-[60] bg-white/95 backdrop-blur border-t p-3 safe-bottom">
        <div className="flex items-center gap-3">
          <button
            onClick={addToCart}
            className="flex-1 rounded-lg bg-cucumber-700 text-white py-3 text-center font-semibold active:scale-[0.99]"
          >
            ADD TO BAG • {displayPrice}
          </button>
          <a href="#top" className="rounded-lg border px-3 py-3 text-xs">TOP</a>
        </div>
      </div>

      {/* Highlights */}
      {!!product.highlights?.length && (
        <div className="px-4 mt-4 flex flex-wrap gap-2">
          {product.highlights.map((h) => (
            <span key={h} className="rounded-full bg-white px-3 py-1 text-sm">{h}</span>
          ))}
        </div>
      )}

      {/* Collapsibles (details/ingredients/usage) */}
      <div className="px-4 mt-6 space-y-3">
        {product.description && (
          <details className="rounded-lg bg-white p-4 border">
            <summary className="cursor-pointer font-medium">Details</summary>
            <p className="mt-2 text-sm leading-relaxed">{product.description}</p>
          </details>
        )}
        {product.ingredients && (
          <details className="rounded-lg bg-white p-4 border">
            <summary className="cursor-pointer font-medium">Ingredients</summary>
            <p className="mt-2 text-sm whitespace-pre-line leading-relaxed">{product.ingredients}</p>
          </details>
        )}
        {product.usage && (
          <details className="rounded-lg bg-white p-4 border">
            <summary className="cursor-pointer font-medium">How to use</summary>
            <p className="mt-2 text-sm leading-relaxed">{product.usage}</p>
          </details>
        )}
      </div>

      {/* Shipping & returns quick blurb */}
      <div className="px-4 my-8 text-xs text-gray-700">
        Free shipping on orders $65+ • Easy returns within 30 days.
      </div>
    </div>
  );
}