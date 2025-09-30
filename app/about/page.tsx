import Image from "next/image";
import Link from "next/link";

const SECTIONS = [
  {
    title: "Health is Wealth.",
    body:
      "We believe real luxury is feeling well. Simply Cucumber blends clean science with cucumber-first ingredients to refresh skin, calm the senses, and simplify your ritual.",
    image: "/assets/about/heritage-1.jpg", // ← replace with your image
    imageAlt: "Original flagship / apothecary illustration",
    imageLeft: true,
  },
  {
    title: "Born from a belief in everyday wellness.",
    body:
      "True beauty begins with wellness. We were created to bring the natural benefits of cucumber into everyday self-care—hydration, balance, and a cool, clean finish.",
    image: "/assets/about/hero-2.jpg", // ← replace
    imageAlt: "Fresh cucumber and water droplets",
    imageLeft: false,
  },
  {
    title: "Clean by design.",
    body:
      "Short, readable ingredient lists. Vegan where possible. Dermatologist-minded formulas that keep what works and skip what doesn’t.",
    image: "/assets/about/lab-3.jpg", // ← replace
    imageAlt: "Minimal lab setup with glass beakers",
    imageLeft: true,
  },
  {
    title: "Little rituals, big returns.",
    body:
      "Skincare that fits your day—and pays you back in clarity, calm, and confidence. Because small daily choices compound. Health is wealth.",
    image: "/assets/about/ritual-4.jpg", // ← replace
    imageAlt: "Morning sink ritual with green tones",
    imageLeft: false,
  },
];

export const metadata = {
  title: "About Us — Simply Cucumber",
  description:
    "Our story, our philosophy, and why Health is Wealth guides everything we make at Simply Cucumber.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Breadcrumb (subtle) */}
      <div className="mx-auto max-w-6xl px-4 pt-6 text-xs text-gray-500">
        <Link href="/">Home</Link> <span className="mx-1">/</span> About Us
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-6xl px-4">
        {SECTIONS.map((s, i) => (
          <section
            key={s.title}
            className="py-16 md:py-20 border-b last:border-0"
          >
            <div
              className={`grid items-center gap-10 md:gap-12 md:grid-cols-2 ${
                s.imageLeft ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              {/* Image */}
              <div className="relative">
                <div className="relative h-64 sm:h-80 md:h-[22rem] rounded-xl overflow-hidden shadow-sm">
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
                {/* Headline in a classy serif vibe; adjust font in CSS if you add a custom one */}
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
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

      {/* Soft CTA strip */}
      <section className="bg-cucumber-50">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">
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
