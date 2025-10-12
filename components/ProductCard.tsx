"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../lib/products";
import { useCart } from "./CartProvider";

type Props = { product: Product & { hoverImage?: string } };

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-60 sm:h-72 lg:h-80 overflow-hidden rounded-md bg-transparent">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-300 group-hover:opacity-0 group-hover:scale-[1.03]"
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.title} alternate`}
              fill
              className="object-cover opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          )}
        </div>

        <h3 className="mt-3 text-base font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
      </Link>

      <button
        onClick={() =>
          addItem(
            {
              sku: product.sku,
              title: product.title,
              price: product.price,
              image: product.image,
            },
            1
          )
        }
        className="mt-3 w-full rounded bg-cucumber-700 px-4 py-2 text-white hover:bg-cucumber-800 transition"
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
}