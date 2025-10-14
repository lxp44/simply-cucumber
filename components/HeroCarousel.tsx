text"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  image: string; // path under /public
  headline: string;
  sub: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function HeroCarousel({ slides, interval = 6000 }: { slides: Slide[]; interval?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  const s = slides[idx];

  return (
    <section className="relative overflow-hidden">
      {/* Image */}
      <div className="relative h-[64vh] md:h-[72vh]">
        <Image src={s.image} alt={s.headline} fill priority className="object-cover" />
      </div>

         {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <p className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs tracking-wide">
            Friends & Family
          </p>
          <h1 className="mt-4 text-gold-metallic drop-shadow-sm font-[var(--font-playfair)] text-3xl md:text-5xl">
            {s.headline}
          </h1>
          <p className="mt-3 text-gold-metallic/90">{s.sub}</p>
          <a
            href={s.ctaHref}
            className="mt-6 inline-block rounded bg-white/90 px-6 py-3 text-white font-medium hover:bg-white"
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
            className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
