// app/shop/page.tsx
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";
import SortBy from "../../components/SortBy";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar"; // ← client sidebar

const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks"],
  body: ["bath-body", "hand-creams", "hair-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

type PageProps = {
  searchParams?: {
    category?: string;
    sort?: string;
    type?: string; // comma-separated product categories to include (from checkboxes)
    skin?: string; // comma-separated skin tags to include (from checkboxes)
  };
};

export default function ShopPage({ searchParams }: PageProps) {
  const category = searchParams?.category ?? null;
  const sort = searchParams?.sort ?? null;

  // read filter params from URL (comma-separated lists)
  const selectedTypes = new Set((searchParams?.type ?? "").split(",").filter(Boolean));
  const selectedSkin = new Set((searchParams?.skin ?? "").split(",").filter(Boolean));

  // Category filter first
  let items = (!category
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        const leaves = GROUPS[category] || [];
        return p.category === category || leaves.includes(p.category);
      })
  ).slice();

  // "Filter by" → matches product.category against selectedTypes
  if (selectedTypes.size > 0) {
    items = items.filter((p) => selectedTypes.has(p.category));
  }

  // "Skin Type" → matches any tag in product.skin (string[]) against selectedSkin
  if (selectedSkin.size > 0) {
    items = items.filter((p: any) => {
      const tags: string[] | undefined = (p as any).skin;
      if (!tags || tags.length === 0) return false;
      return [...selectedSkin].some((s) => tags.includes(s));
    });
  }

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
        <div className="relative h-48 md:h-60 w-full rounded-xl overflow-hidden -mt-6">
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

        {/* Sidebar + content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <FilterSidebar />

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

            {/* Product grid */}
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