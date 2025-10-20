// components/MobileMenu.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Section = {
  title: string;
  items?: { label: string; href: string }[];
};

const SECTIONS: Section[] = [
  {
    title: "Shop",
    items: [
      { label: "Face", href: "/shop?category=face" },
      { label: "Body", href: "/shop?category=body" },
      { label: "By Concern", href: "/skin-doctor" },
      { label: "Featured", href: "/best-sellers" },
    ],
  },
  { title: "Best Sellers", items: [{ label: "View all", href: "/best-sellers" }] },
  { title: "Gifts", items: [{ label: "Discover gifts", href: "/shop?category=spa-packages" }] },
  { title: "Rewards", items: [{ label: "Join Rewards", href: "/rewards" }] },
  { title: "Salon", items: [{ label: "Our Salon", href: "/salon" }] },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close if you click outside panel
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <>
      {/* Trigger (hamburger) – visible on mobile only */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
      >
        <span className="sr-only">Open menu</span>
        {/* simple hamburger icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-900">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div className="absolute inset-0 bg-black/40" />
          {/* Drawer panel */}
          <div
            ref={panelRef}
            className="absolute left-0 top-0 h-full w-[86%] max-w-[420px] bg-white shadow-xl overflow-y-auto"
          >
            {/* Header inside drawer */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-md border px-2.5 py-1.5"
              >
                ✕
              </button>
            </div>

            {/* Sections */}
            <nav className="px-2 py-2">
              {SECTIONS.map((sec) => {
                const isOpen = expanded === sec.title;
                const hasChildren = !!sec.items?.length;

                return (
                  <div key={sec.title} className="border-b last:border-b-0">
                    <button
                      className="w-full flex items-center justify-between px-2 py-3 text-left font-semibold"
                      onClick={() => setExpanded(isOpen ? null : sec.title)}
                      aria-expanded={isOpen}
                    >
                      <span>{sec.title}</span>
                      <span className="ml-2 text-xl leading-none select-none">{isOpen ? "–" : "+"}</span>
                    </button>

                    {hasChildren && isOpen && (
                      <ul className="pb-3 pl-4 space-y-2">
                        {sec.items!.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              onClick={() => setOpen(false)}
                              className="block py-1.5 text-gray-700 hover:text-cucumber-700"
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}