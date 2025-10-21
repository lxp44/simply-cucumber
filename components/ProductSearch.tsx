"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

type ApiResult = {
  suggestions: string[];
  products: { slug: string; title: string; price: number; image: string }[];
};

export default function ProductSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<ApiResult>({ suggestions: [], products: [] });
  const debounced = useDebounce(q, 250);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function run() {
      if (!debounced) {
        setData({ suggestions: [], products: [] });
        return;
      }
      const res = await fetch(`/api/search?q=${encodeURIComponent(debounced)}`);
      const json = (await res.json()) as ApiResult;
      setData(json);
    }
    run();
  }, [debounced]);

  // close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative w-72" ref={boxRef}>
      <input
        value={q}
        onFocus={() => setOpen(true)}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-full border px-4 py-2 text-sm bg-white/70 backdrop-blur focus:bg-white focus:outline-none"
        aria-label="Search"
      />

      {/* Results panel */}
      {open && (data.products.length > 0 || data.suggestions.length > 0) && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-xl overflow-hidden z-[60]">
          {/* Suggestions */}
          {data.suggestions.length > 0 && (
            <div className="px-4 pt-4 pb-2 text-[12px] font-semibold tracking-widest text-gray-500">
              POPULAR SEARCH
            </div>
          )}
          {data.suggestions.length > 0 && (
            <ul className="px-2 pb-2">
              {data.suggestions.map((s) => (
                <li key={s}>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => setQ(s)}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Products */}
          {data.products.length > 0 && (
            <>
              <div className="px-4 pt-3 pb-2 text-[12px] font-semibold tracking-widest text-gray-500">
                POPULAR PRODUCTS
              </div>
              <ul className="max-h-[48vh] overflow-auto px-2 pb-3 grid grid-cols-2 gap-3">
                {data.products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="block rounded-lg border hover:shadow-sm"
                      onClick={() => setOpen(false)}
                    >
                      <div className="relative w-full h-28 rounded-t-lg overflow-hidden">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="p-2">
                        <div className="text-xs line-clamp-2">{p.title}</div>
                        <div className="text-sm font-semibold mt-1">${p.price.toFixed(2)}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}