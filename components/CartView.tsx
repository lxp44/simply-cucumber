"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

// Adjust these names if your context uses slightly different ones.
// Expected shape:
// const { items, count, subtotal, updateQty, removeItem, clear } = useCart();

export default function CartView() {
  const { items, count, subtotal, updateQty, removeItem, clear } = useCart() as any;

  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl bg-white/75 backdrop-blur p-10 text-center border">
        <p className="text-gray-700">Your bag is empty.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded bg-cucumber-700 px-6 py-3 text-white font-semibold hover:bg-cucumber-800"
          style={{ boxShadow: "0 6px 16px rgba(27,120,69,0.25)" }}
        >
          Shop best sellers
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* LINE ITEMS */}
      <div className="space-y-4">
        {items.map((it: any) => (
          <div
            key={it.sku}
            className="group flex gap-4 rounded-xl border bg-white/80 backdrop-blur p-4 hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border bg-white">
              <Image
                src={it.image || "/assets/placeholder.png"}
                alt={it.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/products/${it.slug}`}
                    className="font-medium hover:underline"
                  >
                    {it.title}
                  </Link>
                  {it.tagline && (
                    <p className="text-sm text-gray-600">{it.tagline}</p>
                  )}
                  {it.highlights?.length ? (
                    <div className="mt-1 flex flex-wrap gap-2">
                      {it.highlights.slice(0, 3).map((h: string) => (
                        <span
                          key={h}
                          className="rounded-full border px-2 py-0.5 text-[11px] text-gray-700 bg-white/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p
                    className="font-semibold"
                    style={{ color: "#b8860b" }}
                  >
                    ${Number(it.price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Qty</label>
                  <select
                    value={it.qty}
                    onChange={(e) => updateQty(it.sku, Number(e.target.value))}
                    className="rounded border bg-white px-2 py-1 text-sm"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => removeItem(it.sku)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Clear cart */}
        <div className="flex justify-end">
          <button
            onClick={() => clear()}
            className="text-sm text-gray-600 hover:underline"
          >
            Remove all
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <aside className="h-max rounded-xl border bg-white/80 backdrop-blur p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items ({count})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Example of shipping/tax placeholders */}
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Tax</span>
            <span>Calculated at checkout</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span
              style={{ color: "#b8860b" }}
            >
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Checkout CTA */}
        {/* If you already have a cart checkout API, replace href + onClick with your flow */}
        <Link
          href="/checkout" // <-- update to your real checkout route when ready
          className="mt-6 block w-full rounded bg-cucumber-700 px-5 py-3 text-center text-white font-semibold tracking-wide hover:bg-cucumber-800"
          style={{ boxShadow: "0 6px 16px rgba(27,120,69,0.25)" }}
        >
          Proceed to checkout
        </Link>

        {/* Trust badges / reassurance */}
        <div className="mt-4 text-[12px] text-gray-600 space-y-1">
          <p>✓ Secure checkout · ✓ 30-day returns · ✓ Clean ingredients</p>
        </div>
      </aside>
    </div>
  );
}