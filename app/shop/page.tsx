// app/shop/page.tsx  (SERVER COMPONENT)
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../../lib/products";
import SortBy from "../../components/SortBy";

// Broad groups -> leaf categories used in PRODUCT.category
const GROUPS: Record<string, string[]> = {
  face: ["cleansers", "toners", "serums", "moisturizers", "masks"],
  body: ["bath-body", "hand-creams", "hair-products"],
  powders: ["powders"],
  toothpaste: ["toothpaste"],
  "spa-packages": ["spa-packages"],
};

type PageProps = { searchParams?: { category?: string; sort?: string } };

// Local helper so TS doesn't complain before you add `hoverImage` in products.ts
type WithHover = { hoverImage?: string };

export default function ShopPage({ searchParams }: PageProps) {
  const category = searchParams?.category ?? null;
  const sort = searchParams?.sort ?? null;

  // Filter by group/category
  let items = (!category
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        const leaves = GROUPS[category] || [];
        return p.category === category || leaves.includes(p.category);
      })
  ).slice(); // copy for safe sorting

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
    case "date-asc":
      // keep list order for now
      break;
    case "date-desc":
      items.reverse();
      break;
    case "best":
    case "featured":
    default:
      // leave as-is (seed order)
      break;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero header image */}
      <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden bg-gray-50">
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
        {/* Sidebar (dummy checkboxes for now) */}
        <aside className="border rounded-lg p-4 h-max sticky top-24">
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

            {/* Sort by (client) */}
            <SortBy category={category} sort={sort} />
          </div>

          {/* Product grid */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => {
              const hoverImage = (p as unknown as WithHover).hoverImage;
              return (
                <div key={p.sku} className="border rounded-lg p-4">
                  <Link href={`/products/${p.slug}`}>
                    {/* Hover-swap image block */}
                    <div className="relative h-44 rounded bg-gray-50 overflow-hidden group">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:opacity-0 group-hover:scale-105"
                      />
                      {hoverImage && (
                        <Image
                          src={hoverImage}
                          alt={`${p.title} alternate view`}
                          fill
                          className="object-cover opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}
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
              );
            })}
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
        active ? "bg-cucumber-600 text-white border-cucumber-600" : "hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}