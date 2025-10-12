"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative rounded bg-cucumber-600 px-3 py-1.5 text-white hover:bg-cucumber-700"
    >
      Cart
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-cucumber-700">
          {count}
        </span>
      )}
    </Link>
  );
}