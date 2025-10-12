// app/shop/page.tsx  (SERVER COMPONENT)
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";
import SortBy from "../../components/SortBy";
import ProductCard from "../../components/ProductCard"; // ← use the new sleek card

const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks"],
  body: ["bath-body", "hand-creams", "hair-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

type PageProps = { searchParams?: { category?: string; sort?: string } };

export default function ShopPage({ searchParams }: PageProps) {
  const category = searchParams?.category ?? null;
  const sort = searchParams?.sort ?? null;

  // Filter
  let items = (!category
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        const leaves = GROUPS[category] || [];
        return p.category === category || leaves.includes(p.category);
      })
  ).slice();

  // Sort
  switch (sort) {
    case "az":
      items.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      items.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price-asc":
      items.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      items.sort((a, b) => b.price - a.price);
      break;
    case "date-desc":
      items.reverse();
      break;
    default:
      break;
  }

  return (
    <section className="min-h-screen bg-[#e3d3b3]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Hero */}
        <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden">
          <Image
            src="/assets/shop/products-hero.jpg"
            alt="Shop header"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <h1 className="absolute left-6 bottom-6 text-3xl md:text-4xl font-semibold text-white drop-shadow-lg" />
        </div>

        {/* Filters + content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar (kept subtle glass effect) */}
          <aside className="border rounded-lg bg-white/60 backdrop-blur p-4 h-max sticky top-24">
            <p className="font-medium">Filter by</p>
            <div className="mt-4 space-y-3 text-sm">
              {[
                "Acne Products",
                "Cleansers",
                "Toners",
                "Serums",
                "Moisturizers",
                "Masks",
                "Bath & Body",
              ].map((label) => (
                <label key={label} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-cucumber-600" />
                  {label}
                </label>
              ))}
            </div>
          </aside>

          {/* Right column */}
          <div>
            {/* Filter pills + Sort */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill label="ALL" href="/shop" active={!category} />
                <Pill label="FACE" href="/shop?category=face" active={category === "face"} />
                <Pill label="BODY" href="/shop?category=body" active={category === "body"} />
                <Pill label="POWDERS" href="/shop?category=powders" active={category === "powders"} />
                <Pill label="TOOTHPASTE" href="/shop?category=toothpaste" active={category === "toothpaste"} />
                <Pill label="SPA PACKAGES" href="/shop?category=spa-packages" active={category === "spa-packages"} />
              </div>
              <SortBy category={category} sort={sort} />
            </div>

            {/* Product grid — no borders/shadows now */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        active
          ? "bg-cucumber-600 text-white border-cucumber-600"
          : "bg-white/70 hover:bg-white/90"
      }`}
    >
      {label}
    </Link>
  );
}