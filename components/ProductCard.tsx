// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../lib/products"; // adjust path if your Product type lives elsewhere

type Props = { product: Product };

// Some catalogs have an optional hoverImage; keep it flexible
type WithHover = Product & { hoverImage?: string };

export default function ProductCard({ product }: Props) {
  const p = product as WithHover;

  return (
    <div className="group">
      <Link href={`/products/${p.slug}`} className="block">
        {/* Image area (no border/shadow) */}
        <div className="relative h-60 sm:h-72 lg:h-80 overflow-hidden rounded-md bg-transparent">
          {/* default image */}
          <Image
            src={p.image}
            alt={p.title}
            fill
            priority={false}
            className="object-cover transition duration-300 group-hover:opacity-0 group-hover:scale-[1.03]"
          />
          {/* hover swap (if provided) */}
          {p.hoverImage && (
            <Image
              src={p.hoverImage}
              alt={`${p.title} alternate`}
              fill
              className="object-cover opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-[1.03]"
            />
          )}
        </div>

        {/* Text */}
        <h3 className="mt-3 text-base font-semibold text-gray-900">
          {p.title}
        </h3>
        <p className="text-sm text-gray-700">${p.price.toFixed(2)}</p>
      </Link>

     {/* CTA */}
<form action="/api/checkout" method="POST" className="mt-3">
  <input type="hidden" name="sku" value={p.sku} />
  <button
    className="w-full rounded bg-cucumber-700 px-4 py-2 text-white hover:bg-cucumber-800 transition"
    type="submit"
  >
    Add to cart
  </button>
</form>
    </div>
  );
}