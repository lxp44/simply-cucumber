import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Hydrate. Soothe. Glow.<br/><span className="text-cucumber-700">Cucumber-first formulas.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            We craft clean, high‑performance beauty & wellness powered by freeze‑dried cucumber.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/products" className="rounded bg-cucumber-600 px-5 py-3 text-white hover:bg-cucumber-700">Shop Products</Link>
            <Link href="/science" className="rounded border px-5 py-3 hover:bg-gray-50">Why Cucumber?</Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 text-sm">
            <li className="elevate p-4 rounded">100% Natural</li>
            <li className="elevate p-4 rounded">Lab Tested</li>
            <li className="elevate p-4 rounded">No Parabens</li>
            <li className="elevate p-4 rounded">Vegan & Cruelty‑Free</li>
          </ul>
        </div>
        <div className="brand-gradient h-96 rounded-xl elevate"></div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-semibold">Best Sellers</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <ProductCard />
          <ProductCard title="Cucumber Toner" price={18} sku="toner" />
          <ProductCard title="Hydra‑Gel Mask" price={24} sku="mask" />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ title = "Sample Pack", price = 9, sku = "sample" }:{ title?: string; price?: number; sku?: string }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="h-44 rounded bg-gray-100"></div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <form action="/api/checkout" method="POST" className="mt-3">
        <input type="hidden" name="sku" value={sku} />
        <button className="w-full rounded bg-cucumber-600 px-4 py-2 text-white hover:bg-cucumber-700">Buy now</button>
      </form>
    </div>
  )
}
