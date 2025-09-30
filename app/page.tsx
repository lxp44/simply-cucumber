import HeroCarousel from "../components/HeroCarousel";

const SLIDES = [
  {
    image: "/assets/home/hero-1.jpg",
    headline: "ENJOY 30% OFF SITEWIDE",
    sub: "Plus get a FREE Radiance Kit when you spend $65 or more. Use code: FRIENDS",
    ctaHref: "/shop",
    ctaLabel: "SHOP NOW",
  },
  {
    image: "/assets/home/hero-2.jpg",
    headline: "Cucumber-Fresh Essentials",
    sub: "Hydrate, soothe, and refresh with cucumber-first formulas.",
    ctaHref: "/best-sellers",
    ctaLabel: "SHOP BEST SELLERS",
  },
  {
    image: "/assets/home/hero-3.jpg",
    headline: "Little rituals, big returns.",
    sub: "Skincare that fits your day—and pays you back in clarity and calm.",
    ctaHref: "/gifts",
    ctaLabel: "DISCOVER GIFTS",
  },
];

export default function HomePage() {
  return (
    <main>
      <HeroCarousel slides={SLIDES} />

      {/* add more blocks here as you build out the page */}
    </main>
  );
}
