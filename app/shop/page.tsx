'use client';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";
import { useMemo } from "react";

// Map broad groups -> leaf categories used in PRODUCT.category
const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks"],
  body: ["bath-body", "hand-creams", "hair-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

export default function ShopPage() {
  const params = useSearchParams();
  const category = params.get("category");

  const items = useMemo(() => {
    if (!category) return PRODUCTS;

    // match exact leaf category, or match when the product's category is inside a group
    const leaves = GROUPS[category] || [];
    return PRODUCTS.filter((p) => p.category === category || leaves.includes(p.category));
  }, [category]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">All Products</h1>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Pill label="ALL" href="/shop" active={!category} />
        <Pill label="FACE" href="/shop?category=face" active={category === "face"} />
        <Pill label="BODY" href="/shop?category=body" active={category === "body"} />
        <Pill label="POWDERS" href="/shop?category=powders" active={category === "powders"} />
        <Pill label="TOOTHPASTE" href="/shop?category=toothpaste" active={category === "toothpaste"} />
        <Pill label="SPA PACKAGES" href="/shop?category=spa-packages" active={category === "spa-packages"} />
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p.sku} className="border rounded-lg p-4">
            <Link href={`/products/${p.slug}`}>
              <div className="relative h-44 rounded bg-gray-50 overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
              </div>
            </Link>
            <h3 className="mt-4 font-medium">
              <Link href={`/products/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="text-gray-600">${p.price.toFixed(2)}</p>
            <form action="/api/checkout" method="POST" className="mt-3">
              <input type="hidden" name="sku" value={p.sku} />
              <button className="w-full rounded bg-cucumber-600 px-4 py-2 text-white hover:bg-cucumber-700">
                Buy now
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pill({ label, href, active }:{ label:string; href:string; active:boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-sm border ${active ? 'bg-cucumber-600 text-white border-cucumber-600' : 'hover:bg-gray-50'}`}
    >
      {label}
    </Link>
  );
}
