"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const safe = images?.length ? images : ["/assets/fallback.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-4 md:gap-6">
      {/* Thumbs - left (vertical on md+) / top row on mobile */}
      <div className="order-2 md:order-1 md:h-[520px] md:overflow-auto">
        <ul className="grid grid-cols-5 md:grid-cols-1 gap-2">
          {safe.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
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

      {/* Main image - right */}
      <div className="order-1 md:order-2">
        <div className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-lg border bg-white">
          <Image
            key={safe[active]}             // force transition on change
            src={safe[active]}
            alt="Product image"
            fill
            priority
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover md:object-contain transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
