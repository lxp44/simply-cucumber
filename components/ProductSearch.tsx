"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "../lib/products";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function ProductSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keyboard: "/" to focus, ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !/input|textarea/i.test((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node) && e.target !== inputRef.current) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const n = normalize(q);
    if (!n) return [];
    return PRODUCTS.filter((p) => {
      const hay = [
        p.title,
        p.slug,
        p.description,
        p.category,
        ...(p.benefits || []),
      ]
        .filter(Boolean)
        .map(normalize)
        .join(" ");
      return hay.includes(n);
    }).slice(0, 8);
  }, [q]);

  return (
    <div className="relative w-[220px] md:w-[280px]" ref={panelRef}>
      <div className="flex items-center rounded-lg border bg-white px-2.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-cucumber-600/40">
        {/* icon */}
        <svg aria-hidden className="h-4 w-4 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none">
          <path d="M11 19a8 8 0 1 0-8-8 8 8 0 0 0 8 8Zm10 2-5.65-5.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search products…"
          aria-label="Search products"
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />

        {/* quick hint */}
        <kbd className="ml-2 hidden md:inline-flex items-center rounded border px-1 text-[10px] text-gray-500">
          /
        </kbd>
      </div>

      {/* results */}
      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-[min(92vw,560px)] overflow-hidden rounded-lg border bg-white shadow-xl z-[60]"
        >
          {q && results.length === 0 && (
            <div className="p-4 text-sm text-gray-600">No results for “{q}”.</div>
          )}

          {results.map((p) => (
            <Link
              key={p.sku}
              href={`/products/${p.slug}`}
              className="flex gap-3 p-3 hover:bg-gray-50"
              onClick={() => setOpen(false)}
              role="option"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-medium">{p.title}</p>
                  <span className="whitespace-nowrap text-sm text-gray-700">${p.price.toFixed(2)}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">
                  {p.description}
                </p>
                <div className="mt-1 text-[10px]">
                  <span className="rounded-full border px-2 py-0.5 text-gray-700 bg-white/70">
                    {p.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* View all link when there are matches */}
          {results.length > 0 && (
            <div className="border-t bg-gray-50/60 p-2 text-right">
              <Link
                href={`/shop?sort=az`}
                className="text-xs font-medium text-cucumber-700 hover:underline"
                onClick={() => setOpen(false)}
              >
                View all products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
