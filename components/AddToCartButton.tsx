"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  sku,
  qty = 1,
  className = "w-full rounded bg-cucumber-600 px-4 py-2 text-white hover:bg-cucumber-700",
  children,
}: {
  sku: string;
  qty?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  // Be flexible about the method name on the cart context
  const cart = useCart() as any;
  const addFn = (cart?.add ?? cart?.addItem ?? cart?.addToCart) as
    | ((sku: string, qty?: number) => void)
    | undefined;

  const [loading, setLoading] = useState(false);

  if (!addFn) {
    // No add function exposed; render nothing to avoid runtime errors
    return null;
  }

  const onClick = async () => {
    try {
      setLoading(true);
      addFn(sku, qty);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={onClick} disabled={loading} className={className}>
      {children ?? (loading ? "Adding..." : "Add to cart")}
    </button>
  );
}