// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

type Section = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageLeft: boolean;
};

const SECTIONS: Section[] = [
  {
    title: "Health is Wealth.",
    body:
      "Born from the belief that true beauty begins with wellness, Simply Cucumber was created to bring the natural benefits of cucumber into everyday self-care. Using real freeze-dried cucumbers as the first main ingredient in every product.",
    image: "/assets/about/heritage-1.jpg", // ← add your B&W “old world” image
    imageAlt: "Old-world apothecary / heritage image",
    imageLeft: true,
  },
  {
    title: "Born from the belief in everyday wellness.",
    body:
      "From hydration to rejuvenation, our cucumber-first formulas refresh the body and elevate the mind—bringing spa-level calm to daily ritual. Because our cucumbers are freeze-dried and finely grained, we are able to maximize all the benefits from the fruit.",
    image: "/assets/about/hero-2.jpg", // ← add your second image
    imageAlt: "Cucumber detail / water droplets",
    imageLeft: false,
  },
  {
    title: "Clean by design.",
    body:
      "The first of its kind. Short, readable ingredient lists. Vegan where possible. Dermatologist-minded formulas that keep what works and skip what doesn’t.",
    image: "/assets/about/lab-3.jpg",
    imageAlt: "Minimal lab beakers with soft light",
    imageLeft: true,
  },
  {
    title: "Little rituals, big returns.",
    body:
      "Skincare that fits your day or electrolytes for a boost will pay you back in clarity, calm, and confidence. Because small daily choices compound.",
    image: "/assets/about/ritual-4.jpg",
    imageAlt: "Morning sink ritual in fresh green tones",
    imageLeft: false,
  },
];

export const metadata = {
  title: "About — Simply Cucumber",
  description:
    "Our story, our philosophy, and why Health is Wealth guides everything we make at Simply Cucumber.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6 text-xs text-gray-500">
        <Link href="/">Home</Link> <span className="mx-1">/</span> About
      </div>

      {/* Alternating sections */}
      <div className="mx-auto max-w-6xl px-4">
        {SECTIONS.map((s, i) => (
          <section key={s.title} className="py-16 md:py-20 border-b last:border-0">
            <div
              className={`grid items-center gap-10 md:gap-14 md:grid-cols-2 ${
                s.imageLeft ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              {/* Image */}
              <div className="relative">
                <div className="relative h-72 sm:h-96 md:h-[24rem] rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </div>

              {/* Copy */}
              <div>
                <h2 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-semibold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-5 text-base md:text-lg text-gray-700 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Soft CTA */}
      <section className="bg-cucumber-50">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-[var(--font-playfair)] font-semibold">
            Ready to refresh your ritual?
          </h3>
          <p className="mt-3 text-gray-700">
            Explore cucumber-first formulas designed for clarity and calm.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 rounded-full border px-6 py-3 hover:bg-white"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
