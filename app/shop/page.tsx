"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { PRODUCTS } from "../../lib/products";
import SortBy from "../../components/SortBy";
import ProductCard from "../../components/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";
import MobileFilters from "../../components/MobileFilters";
import MobileSortDrawer from "../../components/MobileSortDrawer";

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
    type?: string;
    skin?: string;
  };
};

export default function ShopPage({ searchParams }: PageProps) {
  // ✅ only declare once
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const category = searchParams?.category ?? null;
  const sort = searchParams?.sort ?? null;

  const selectedTypes = new Set((searchParams?.type ?? "").split(",").filter(Boolean));
  const selectedSkin = new Set((searchParams?.skin ?? "").split(",").filter(Boolean));

  // Category filter
  let items = (!category
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        const leaves = GROUPS[category] || [];
        return p.category === category || leaves.includes(p.category);
      })
  ).slice();

  // Filters
  if (selectedTypes.size > 0) {
    items = items.filter((p) => selectedTypes.has(p.category));
  }
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
          <h1 className="absolute left-6 bottom-6 text-3xl md:text-4xl font-semibold text-gold-metallic drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            Shop
          </h1>
        </div>

        {/* --- MOBILE: Filter/Sort bar (static under hero) --- */}
<div className="md:hidden bg-[#e3d3b3] border-b -mx-4 px-4">
  <div className="py-3 flex items-center gap-3">
    <button
      onClick={() => setFiltersOpen(true)}
      className="flex-1 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm active:scale-[0.99]"
    >
      Filter
    </button>
    <button
      onClick={() => setSortOpen(true)}
      className="flex-1 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm active:scale-[0.99]"
    >
      Sort
    </button>
  </div>
</div>

        {/* Sidebar + content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block sticky top-[120px] self-start z-10">
            <div className="rounded-lg border bg-white/80 backdrop-blur p-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Right column */}
          <div>
            {/* Desktop pills + sort */}
            <div className="hidden md:flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill label="ALL" href="/shop" active={!category} />
                <Pill label="FACE" href="/shop?category=face" active={category === "face"} />
                <Pill label="BODY" href="/shop?category=body" active={category === "body"} />
                <Pill label="POWDERS" href="/shop?category=powders" active={category === "powders"} />
                <Pill label="TOOTHPASTE" href="/shop?category=toothpaste" active={category === "toothpaste"} />
                <Pill label="SPA PACKAGES" href="/shop?category=spa-packages" active={category === "spa-packages"} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Results: {items.length}</span>
                <SortBy category={category} sort={sort} />
              </div>
            </div>

            {/* Mobile pills */}
            <div className="md:hidden mt-4 flex flex-wrap items-center gap-2">
              <Pill label="ALL" href="/shop" active={!category} />
              <Pill label="FACE" href="/shop?category=face" active={category === "face"} />
              <Pill label="BODY" href="/shop?category=body" active={category === "body"} />
              <Pill label="POWDERS" href="/shop?category=powders" active={category === "powders"} />
              <Pill label="TOOTHPASTE" href="/shop?category=toothpaste" active={category === "toothpaste"} />
              <Pill label="SPA PACKAGES" href="/shop?category=spa-packages" active={category === "spa-packages"} />
            </div>

            {/* Grid / empty */}
            <div className="mt-6">
              {items.length === 0 ? (
                <div className="rounded-lg border bg-white/70 p-8 text-center">
                  <p className="text-gray-800 font-medium">No products match your filters.</p>
                  <div className="mt-4">
                    <Link
                      href="/shop"
                      className="inline-block rounded bg-cucumber-700 px-4 py-2 text-white hover:bg-cucumber-800"
                    >
                      Reset filters
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="md:hidden mb-2 text-sm text-gray-700">
                    Results: {items.length}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {items.map((p) => (
                      <ProductCard key={p.sku} product={p} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawers */}
      <MobileFilters open={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <FilterSidebar />
      </MobileFilters>

      <MobileSortDrawer
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        current={sort}
        onSelect={(value) => {
          const url = new URL(window.location.href);
          if (value) url.searchParams.set("sort", value);
          else url.searchParams.delete("sort");
          window.location.href = url.toString();
        }}
      />
    </section>
  );
}

function Pill({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        active ? "bg-cucumber-600 text-white border-cucumber-600" : "bg-white/70 hover:bg-white/90"
      }`}
    >
      {label}
    </Link>
  );
}