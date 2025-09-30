// app/page.tsx
import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import Link from "next/link";

const SLIDES: Slide[] = [
  {
    image: "/assets/home/hero-1.jpg",
    eyebrow: "Friends & Family",
    title: "Enjoy 30% Off Sitewide",
    subtitle: "Plus get a FREE sample kit on $65+ orders. Use code: FRIENDS",
    ctaText: "Shop Now",
    ctaHref: "/shop",
    align: "center",
  },
  {
    image: "/assets/home/hero-2.jpg",
    eyebrow: "Cucumber-First",
    title: "Refresh. Rebalance. Revive.",
    subtitle:
      "Clean, cucumber-powered skincare for clarity, calm, and a cool finish.",
    ctaText: "Explore Best Sellers",
    ctaHref: "/best-sellers",
    align: "left",
  },
  {
    image: "/assets/home/hero-3.jpg",
    eyebrow: "Health is Wealth",
    title: "Wellness Starts With Ritual",
    subtitle:
      "Little daily choices compound. Start with skin—keep what works, skip what doesn’t.",
    ctaText: "Discover Our Story",
    ctaHref: "/about",
    align: "right",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO SLIDESHOW */}
      <HeroCarousel slides={SLIDES} interval={6500} />

      {/* Optional: quick links row under hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <Link href="/shop?category=face" className="rounded-lg border p-5 hover:shadow-sm">Face</Link>
        <Link href="/shop?category=body" className="rounded-lg border p-5 hover:shadow-sm">Body</Link>
        <Link href="/shop?category=powders" className="rounded-lg border p-5 hover:shadow-sm">Powders</Link>
        <Link href="/shop?category=spa-packages" className="rounded-lg border p-5 hover:shadow-sm">Spa Packages</Link>
      </section>
    </main>
  );
}
