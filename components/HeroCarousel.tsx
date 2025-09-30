// components/HeroCarousel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Slide = {
  image: string;            // /assets/home/hero-1.jpg
  mobileImage?: string;     // optional mobile variant
  eyebrow?: string;         // small label (e.g., “Friends & Family”)
  title: string;            // big headline
  subtitle?: string;        // supporting copy
  ctaText?: string;
  ctaHref?: string;
  align?: 'center' | 'left' | 'right';
};

export default function HeroCarousel({
  slides,
  interval = 6000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const paused = useRef(false);

  // auto-advance
  useEffect(() => {
    if (paused.current) return;
    timer.current = setTimeout(() => setI((p) => (p + 1) % slides.length), interval);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [i, slides.length, interval]);

  function goto(next: number) {
    if (timer.current) clearTimeout(timer.current);
    setI((next + slides.length) % slides.length);
  }

  function contentAlign(a: Slide['align']) {
    switch (a) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      default:
        return 'items-center text-center';
    }
  }

  return (
    <section
      className="relative isolate"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => {
        paused.current = false;
        setI((p) => p); // kick effect
      }}
    >
      {/* Slides */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={s.title + idx}
            aria-hidden={i !== idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background image */}
            <Image
              src={s.image}
              alt=""
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Copy */}
            <div className="absolute inset-0 flex justify-center px-4">
              <div className={`mx-auto max-w-5xl flex flex-col gap-4 ${contentAlign(s.align)}`}>
                {s.eyebrow && (
                  <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-medium tracking-wide">
                    {s.eyebrow}
                  </span>
                )}
                <h1 className="font-[var(--font-playfair)] text-white text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow">
                  {s.title}
                </h1>
                {s.subtitle && (
                  <p className="max-w-2xl text-white/95 text-sm sm:text-base md:text-lg drop-shadow">
                    {s.subtitle}
                  </p>
                )}

                {s.ctaText && s.ctaHref && (
                  <div className="pt-2">
                    <Link
                      href={s.ctaHref}
                      className="inline-block rounded-md bg-white/95 px-6 py-3 text-sm font-medium hover:bg-white"
                    >
                      {s.ctaText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition ${
              i === idx ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
            }`}
            onClick={() => goto(idx)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm hover:bg-white"
        onClick={() => goto(i - 1)}
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm hover:bg-white"
        onClick={() => goto(i + 1)}
      >
        ›
      </button>
    </section>
  );
}
