"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ensure portal target exists (SSR-safe)
  useEffect(() => setMounted(true), []);

  // lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Trigger button lives in the header
  const trigger = (
    <button
      type="button"
      className="md:hidden rounded-full border px-3 py-1.5 text-sm bg-white/90 shadow-sm"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
    >
      Menu
    </button>
  );

  // The drawer itself is portaled to <body>
  const drawer = !mounted ? null : createPortal(
    open ? (
      <div className="fixed inset-0 z-[100000] md:hidden">
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        />

        {/* Panel */}
        <aside
          className="
            absolute left-0 top-0 h-full w-[90%] max-w-[420px]
            bg-white shadow-[0_0_40px_rgba(0,0,0,0.25)]
            overflow-y-auto will-change-transform
            translate-x-0 animate-[slideIn_.25s_ease-out]
          "
        >
          <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between">
            <span className="font-medium">Menu</span>
            <button
              className="h-9 w-9 grid place-items-center rounded-full border"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* NAV CONTENT */}
          <nav className="px-4 py-4 space-y-6 text-base">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Shop</p>
              <ul className="[&>li]:py-2">
                <li><Link href="/shop?category=face" onClick={() => setOpen(false)}>Face</Link></li>
                <li><Link href="/shop?category=body" onClick={() => setOpen(false)}>Body</Link></li>
                <li><Link href="/shop?category=powders" onClick={() => setOpen(false)}>Powders</Link></li>
                <li><Link href="/shop?category=toothpaste" onClick={() => setOpen(false)}>Toothpaste</Link></li>
                <li><Link href="/shop?category=spa-packages" onClick={() => setOpen(false)}>Spa Packages</Link></li>
                <li><Link href="/best-sellers" onClick={() => setOpen(false)}>Best Sellers</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Brand</p>
              <ul className="[&>li]:py-2">
                <li><Link href="/rewards" onClick={() => setOpen(false)}>Rewards</Link></li>
                <li><Link href="/salon" onClick={() => setOpen(false)}>Salon</Link></li>
                <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
                <li><Link href="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
                <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
              </ul>
            </div>

            <div className="pt-2 border-t text-sm text-gray-600">
              <ul className="[&>li]:py-2">
                <li><Link href="/faqs" onClick={() => setOpen(false)}>FAQs</Link></li>
                <li><Link href="/shipping" onClick={() => setOpen(false)}>Shipping Policy</Link></li>
                <li><Link href="/returns" onClick={() => setOpen(false)}>Return Policy</Link></li>
                <li><Link href="/privacy" onClick={() => setOpen(false)}>Privacy Policy</Link></li>
                <li><Link href="/terms" onClick={() => setOpen(false)}>Terms of Service</Link></li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* slide-in keyframes */}
        <style jsx global>{`
          @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        `}</style>
      </div>
    ) : null,
    document.body
  );

  return (
    <>
      {trigger}
      {drawer}
    </>
  );
}