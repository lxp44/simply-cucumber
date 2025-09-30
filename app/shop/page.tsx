// app/shop/page.tsx  (SERVER COMPONENT – no "use client")
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";

// Broad groups -> leaf categories used in PRODUCT.category
const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks", "eye-creams", "exfoliants", "makeup-removers"],
  body: ["bath-body", "hand-creams", "hair-products", "sun-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

// Simple price buckets that work with Product.price
const PRICE_BUCKETS = [
  { key: "lt20", label: "Under $20", test: (p: number) => p < 20 },
  { key: "20to40", label: "$20 – $40", test: (p: number) => p >= 20 && p <= 40 },
  { key: "gt40", label: "Over $40", test: (p: number) => p > 40 },
];

type PageProps = { searchParams?: { category?: string; price?: string } };

/** Merge current query params with changes and return href string */
function hrefWith(
  base: string,
  current: Record<string, string | undefined>,
  patch: Record<string, string | null | undefined>
) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...current, ...patch })) {
    if (v) params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export default function ShopPage({ searchParams }: PageProps) {
  const category = searchParams?.category ?? null;
  const priceKey = searchParams?.price ?? null;

  // Filter products by category group or exact leaf
  let items = PRODUCTS;
  if (category) {
    const leaves = GROUPS[category] || [];
    items = items.filter(
      (p) => p.category === category || leaves.includes(p.category)
    );
  }

  // Filter by price bucket
  if (priceKey) {
    const bucket = PRICE_BUCKETS.find((b) => b.key === priceKey);
    if (bucket) items = items.filter((p) => bucket.test(p.price));
  }

  return (
    <main>
      {/* HERO with background image like the screenshot */}
      <section className="relative h-72 md:h-96 w-full">
        <Image
          src="/assets/shop/shop-hero.jpg" // <-- put your banner image here
          alt="Simply Cucumber shop hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-semibold text-white drop-shadow-md">
            ALL PRODUCTS
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Top pills (quick groups) */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Pill label="ALL" href="/shop" active={!category} />
          <Pill label="FACE" href="/shop?category=face" active={category === "face"} />
          <Pill label="BODY" href="/shop?category=body" active={category === "body"} />
          <Pill label="POWDERS" href="/shop?category=powders" active={category === "powders"} />
          <Pill label="TOOTHPASTE" href="/shop?category=toothpaste" active={category === "toothpaste"} />
          <Pill
            label="SPA PACKAGES"
            href="/shop?category=spa-packages"
            active={category === "spa-packages"}
          />
        </div>

        {/* Content with sidebar + grid */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="md:sticky md:top-20 h-fit border rounded-lg p-4">
            <h2 className="text-base font-semibold mb-3">Filter by</h2>

            {/* Product type (groups) */}
            <FilterGroup title="Product type">
              <FacetLink
                label="All"
                href={hrefWith("/shop", { category: category ?? undefined, price: priceKey ?? undefined }, { category: null })}
                active={!category}
              />
              {Object.keys(GROUPS).map((g) => (
                <FacetLink
                  key={g}
                  label={formatLabel(g)}
                  active={category === g}
                  href={hrefWith("/shop", { category: category ?? undefined, price: priceKey ?? undefined }, { category: g })}
                />
              ))}
            </FilterGroup>

            {/* Price */}
            <FilterGroup title="Price">
              <FacetLink
                label="Any price"
                active={!priceKey}
                href={hrefWith("/shop", { category: category ?? undefined, price: priceKey ?? undefined }, { price: null })}
              />
              {PRICE_BUCKETS.map((b) => (
                <FacetLink
                  key={b.key}
                  label={b.label}
                  active={priceKey === b.key}
                  href={hrefWith("/shop", { category: category ?? undefined, price: priceKey ?? undefined }, { price: b.key })}
                />
              ))}
            </FilterGroup>

            {/* Clear filters */}
            {(category || priceKey) && (
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-sm text-cucumber-700 hover:underline"
                >
                  Clear all filters
                </Link>
              </div>
            )}
          </aside>

          {/* Product grid */}
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {items.length === 0 && (
              <p className="text-sm text-gray-600 mt-6">No products match those filters.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ——— UI bits ——— */

function Pill({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        active ? "bg-cucumber-600 text-white border-cucumber-600" : "hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FacetLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm ${
        active ? "text-cucumber-700 font-medium" : "text-gray-700 hover:text-black"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded border ${
          active ? "bg-cucumber-600 border-cucumber-600" : "bg-white"
        }`}
        aria-hidden
      />
      {label}
    </Link>
  );
}

function formatLabel(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
