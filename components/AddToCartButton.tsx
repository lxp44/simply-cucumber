// components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { PRODUCTS } from "../lib/products";

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
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const product = PRODUCTS.find((p) => p.sku === sku);
  if (!product) return null;

  const onClick = async () => {
    try {
      setLoading(true);
      addItem(
        {
          sku: product.sku,
          title: product.title,
          price: product.price,
          image: product.image,
        },
        qty
      );
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