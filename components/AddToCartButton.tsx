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
  className = "w-full rounded bg-cucumber-600 px-4 py-2 text-white hover:bg-cucumber-700",
  children,
}: Props) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true);
    try {
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