import { notFound } from "next/navigation";
import Image from "next/image";
import { bySlug } from "../../../lib/products"; // <-- fixed path

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = bySlug(params.slug);
  if (!product) return notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid lg:grid-cols-2 gap-10">
      <div className="relative w-full h-[480px] rounded-xl bg-gray-50 overflow-hidden">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
        <p className="mt-6 text-gray-700">{product.description}</p>

        <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {product.benefits.map((b) => (
            <li key={b} className="elevate p-3 rounded">{b}</li>
          ))}
        </ul>

        <form action="/api/checkout" method="POST" className="mt-8">
          <input type="hidden" name="sku" value={product.sku} />
          <button className="rounded bg-cucumber-600 px-5 py-3 text-white hover:bg-cucumber-700">
            Buy now
          </button>
        </form>
      </div>
    </section>
  );
}
