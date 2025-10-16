"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  sku: string;
  title: string;
  price: number;
  image: string;
  qty?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({
  sku,
  title,
  price,
  image,
  qty = 1,
  className = "w-full rounded bg-cucumber-700 px-5 py-3 text-white font-semibold tracking-wide hover:bg-cucumber-800 transition",
  children,
}: Props) {
  const cart = useCart();
  const [loading, setLoading] = useState(false);

  const addItem =
    (cart as any).addItem ??
    (cart as any).add ?? // fallback if you rename later
    (cart as any).addToCart;

  if (!addItem) return null;

  const onClick = async () => {
    try {
      setLoading(true);
      addItem({ sku, title, price, image }, qty);
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