// app/shop/page.tsx  (SERVER COMPONENT – no "use client")
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";

// Broad groups -> leaf categories used in PRODUCT.category
const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks", "eye-creams", "exfoliants"],
  body: ["bath-body", "hand-creams", "hair-products", "sun-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

type PageProps = { searchParams?: { category?: string } };

export default function ShopPage({ searchParams }: PageProps) {
  const category = searchParams?.category ?? null;

  const items = !category
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        const leaves = GROUPS[category] || [];
        return p.category === category || leaves.includes(p.category);
      });

  return (
    <main>
      {/* HERO with background image like the screenshot */}
      <section className="relative h-72 md:h-96 w-full">
        <Image
          src="/assets/shop/shop-hero.jpg" // <-- put your banner image here (public/assets/shop/shop-hero.jpg)
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
        {/* Filter pills */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
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

        {/* Product grid */}
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
    </main>
  );
}

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
