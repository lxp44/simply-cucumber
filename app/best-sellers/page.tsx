// app/best-sellers/page.tsx
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";

export const metadata = {
  title: "Best Sellers · Simply Cucumber",
  description: "Our most-loved products, handpicked for results.",
};

export default function BestSellersPage() {
  const items = PRODUCTS.filter(p => p.bestSeller);

  return (
    <section className="min-h-screen bg-[#e3d3b3]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Best Sellers</h1>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p) => (
            <Link
              key={p.sku}
              href={`/best-sellers/${p.slug}`}
              className="group block focus:outline-none"
            >
              <div className="relative h-64 rounded-lg overflow-hidden bg-white">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-gray-600">${p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}