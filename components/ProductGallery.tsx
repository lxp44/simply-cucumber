"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const safe = images?.length ? images : ["/assets/fallback.jpg"];
  const [active, setActive] = useState(0);

  // helpers
  const go = (n: number) =>
    setActive((i) => (i + n + safe.length) % safe.length);
  const goTo = (n: number) => setActive(n);

  // swipe support (mobile)
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx =
      (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  // keyboard arrows (nice on desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-4 md:gap-6">
      {/* Thumbnails — hidden on mobile, same vertical strip on desktop */}
      <div className="hidden md:block md:order-1 md:h-[520px] md:overflow-auto">
        <ul className="grid md:grid-cols-1 gap-2">
          {safe.map((src, i) => (
            <li key={src + i}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-16 w-full overflow-hidden rounded border transition
                  ${i === active ? "ring-2 ring-cucumber-600 border-cucumber-600" : "hover:border-gray-400"}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main image */}
      <div className="order-1 md:order-2">
        <div
          className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-lg border bg-white"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            key={safe[active]} // force transition on change
            src={safe[active]}
            alt="Product image"
            fill
            priority
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover md:object-contain transition-transform duration-300"
          />

{/* Mobile slide dots (keeps desktop thumbs) */}
{safe.length > 1 && (
  <div className="md:hidden mt-3 flex justify-center gap-2">
    {safe.map((_, i) => (
      <button
        key={i}
        aria-label={`Go to image ${i + 1}`}
        onClick={() => setActive(i)}
        className={`h-2.5 w-2.5 rounded-full ${
          i === active ? "bg-cucumber-700" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
)}

          {/* Mobile-only arrows (Mario-style). Desktop keeps thumbs to navigate */}
          {safe.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}