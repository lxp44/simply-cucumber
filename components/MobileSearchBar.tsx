// components/MobileSearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function MobileSearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!q.trim()) return;
    // send users to your shop page with a query param
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div className="sm:hidden px-4 pb-3 bg-white/80 backdrop-blur border-t">
      <form
        onSubmit={submit}
        className="relative"
        role="search"
        aria-label="Site search"
      >
        {/* input */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="
            w-full rounded-full
            bg-white border border-black/10
            pl-11 pr-12 py-3
            text-[15px]
            shadow-sm
            placeholder-black/40
            focus:outline-none focus:ring-2 focus:ring-cucumber-600/30 focus:border-cucumber-700
          "
        />

        {/* search icon (left) */}
        <button
          type="submit"
          aria-label="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
        >
          <Search className="w-5 h-5 text-black/60" />
        </button>

        {/* clear (right) */}
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQ("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
          >
            <X className="w-5 h-5 text-black/50" />
          </button>
        )}
      </form>
    </div>
  );
}