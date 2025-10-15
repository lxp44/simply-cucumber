// components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ sku }: { sku: string }) {
  const { add } = useCart(); // if your CartProvider uses a different method name, adjust here
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          await add(sku, 1);
        } finally {
          setLoading(false);
        }
      }}
      className="w-full rounded bg-cucumber-700 px-5 py-3 text-white font-semibold tracking-wide hover:bg-cucumber-800 transition disabled:opacity-60"
      disabled={loading}
    >
      {loading ? "Adding…" : "Add to cart"}
    </button>
  );
}