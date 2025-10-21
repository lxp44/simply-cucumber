"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Result = {
  sku: string;
  title: string;
  price: number;
  image: string;
  slug: string;
};

export default function MobileSearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  // simple debounce so we don't fetch on every keystroke
  const debouncedQ = useDebounce(q, 160);

  useEffect(() => {
    // close + reset when empty
    if (!debouncedQ.trim()) {
      safeClear();
      return;
    }

    // abort any in-flight request
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    (async () => {
      try {
        setLoading(true);
        setErrMsg(null);

        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQ)}`, {
          signal: ctrl.signal,
          headers: { "accept": "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // validate shape safely
        const list = Array.isArray(data?.products) ? data.products : [];
        const cleaned: Result[] = list
          .filter(
            (p: any) =>
              p &&
              typeof p.title === "string" &&
              typeof p.price === "number" &&
              typeof p.slug === "string"
          )
          .map((p: any) => ({
            sku: String(p.sku ?? p.slug),
            title: p.title,
            price: p.price,
            image: typeof p.image === "string" ? p.image : "/placeholder.png",
            slug: p.slug,
          }));

        setResults(cleaned);
        setOpen(true);
      } catch (err: any) {
        if (err?.name === "AbortError") return; // ignore aborts
        console.error("[MobileSearchBar] search error:", err);
        setErrMsg("Something went wrong. Try again.");
        setResults([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    })();

    function safeClear() {
      setResults([]);
      setErrMsg(null);
      setOpen(false);
    }

    // cleanup
    return () => ctrl.abort();
  }, [debouncedQ]);

  // close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (!el.closest?.("[data-mobile-search]")) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div
      data-mobile-search
      className="md:hidden border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => q && setOpen(true)}
            placeholder="Search products…"
            className="w-full rounded-full border border-gray-300/70 bg-white px-4 py-3 text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cucumber-700/30"
            aria-label="Search products"
          />

          {/* dropdown */}
          {open && (
            <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-xl overflow-hidden z-[60]">
              {/* loading state */}
              {loading && (
                <div className="p-4 text-sm text-gray-600">Searching…</div>
              )}

              {/* error state */}
              {!loading && errMsg && (
                <div className="p-4 text-sm text-red-600">{errMsg}</div>
              )}

              {/* empty state */}
              {!loading && !errMsg && results.length === 0 && q.trim() && (
                <div className="p-4 text-sm text-gray-600">
                  No results for “{q}”.
                </div>
              )}

              {/* results */}
              {!loading && !errMsg && results.length > 0 && (
                <ul className="divide-y">
                  {results.map((r) => (
                    <li key={r.sku} className="bg-white hover:bg-gray-50">
                      <Link
                        href={`/products/${r.slug}`}
                        className="flex items-center gap-3 p-3"
                        onClick={() => setOpen(false)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.image || "/placeholder.png"}
                          alt={r.title}
                          className="h-12 w-12 rounded-md object-cover border"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-[15px] font-medium">
                            {r.title}
                          </div>
                          <div className="text-sm text-cucumber-800 font-semibold">
                            ${r.price.toFixed(2)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- small debounce hook ---------- */
function useDebounce<T>(value: T, delay = 150) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}