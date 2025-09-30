export default function ProductsPage() {
  const items = [
    { title: "Sample Pack", price: 9, sku: "sample" },
    { title: "Cucumber Toner", price: 18, sku: "toner" },
    { title: "Hydra‑Gel Mask", price: 24, sku: "mask" }
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Products</h1>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i.sku} className="border rounded-lg p-4">
            <div className="h-44 rounded bg-gray-100"></div>
            <h3 className="mt-4 font-medium">{i.title}</h3>
            <p className="text-gray-600">${i.price.toFixed(2)}</p>
            <form action="/api/checkout" method="POST" className="mt-3">
              <input type="hidden" name="sku" value={i.sku} />
              <button className="w-full rounded bg-cucumber-600 px-4 py-2 text-white hover:bg-cucumber-700">Buy now</button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
