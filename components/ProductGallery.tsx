// components/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const safe = images?.length ? images : ["/assets/fallback.jpg"];
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setActive((i) => (i + 1) % safe.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-4 md:gap-6">
      {/* Thumbnails — desktop only */}
      <div className="hidden md:block md:h-[520px] md:overflow-auto md:order-1">
        <ul className="grid md:grid-cols-1 gap-2">
          {safe.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-16 w-full overflow-hidden rounded border transition ${
                  i === active
                    ? "ring-2 ring-cucumber-600 border-cucumber-600"
                    : "hover:border-gray-400"
                }`}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main image */}
      <div className="order-1 md:order-2">
        <div className="relative w-full h-[560px] sm:h-[600px] md:h-[520px] overflow-hidden rounded-lg border bg-white">
          <Image
            key={safe[active]}
            src={safe[active]}
            alt="Product image"
            fill
            priority
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-contain transition-transform duration-300"
          />

          {/* Arrows — mobile only */}
          {safe.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 text-lg font-semibold shadow"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur px-3 py-1.5 text-lg font-semibold shadow"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Mobile dots */}
        {safe.length > 1 && (
          <div className="md:hidden mt-3 flex justify-center gap-2">
            {safe.map((_, i) => (
              <span
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  i === active ? "bg-cucumber-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}