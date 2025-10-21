// components/HeroCarousel.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  image: string;     // path under /public
  headline: string;
  sub: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function HeroCarousel({
  slides,
  interval = 6000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      interval
    );
    return () => clearInterval(id);
  }, [slides.length, interval]);

  const s = slides[idx];

  return (
    <section className="relative overflow-hidden">
      {/* Image wrapper:
         - a little shorter on mobile (56vh) so we don’t create big gaps
         - desktop unchanged */}
      <div className="relative h-[56vh] sm:h-[64vh] md:h-[72vh]">
        <Image
          src={s.image}
          alt={s.headline}
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            md:object-cover
          "
        />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-x-0 bottom-0 top-16 sm:top-24 md:top-0 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <p className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs tracking-wide">
            Friends & Family
          </p>
          <h1 className="mt-4 text-gold-metallic drop-shadow-sm font-[var(--font-playfair)] text-3xl md:text-5xl">
            {s.headline}
          </h1>
          <p className="mt-3 text-black">{s.sub}</p>
          <a
            href={s.ctaHref}
            className="mt-6 inline-block rounded bg-white/90 px-6 py-3 text-black font-medium hover:bg-white"
          >
            {s.ctaLabel}
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === idx ? "bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}