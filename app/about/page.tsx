// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About — Simply Cucumber",
  description:
    "Born from the belief that true beauty begins with wellness. Health is Wealth.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6 text-xs text-gray-500">
        <Link href="/">Home</Link> <span className="mx-1">/</span> About
      </div>

      {/* Hero section: image left, copy right */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: old-world / apothecary image */}
          <div className="relative">
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src="/assets/about/heritage-1.jpg" // <-- put your B&W field/lab photo here
                alt="Old-world apothecary / field heritage"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Optional: subtle leaf overlay (delete if you don't want it) */}
            <div className="pointer-events-none absolute -left-6 -bottom-6 opacity-20 hidden sm:block">
              <Image
                src="/assets/about/leaf.png"
                alt=""
                width={220}
                height={220}
                aria-hidden
                className="select-none"
              />
            </div>
          </div>

          {/* Right: Headline + body */}
          <div>
            <h1 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-semibold tracking-tight">
              Health is Wealth.
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed text-base md:text-lg">
              Born from the belief that true beauty begins with wellness, Simply Cucumber was
              created to bring the natural benefits of cucumber into everyday self-care. From
              hydration to rejuvenation, every product is powered by clean, cucumber-first formulas
              that refresh the body and elevate the mind.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed text-base md:text-lg">
              We’re not just building skincare — we’re building a lifestyle. One where simplicity,
              purity, and wellness combine to remind you that taking care of yourself is the
              greatest luxury of all.
            </p>

            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-block rounded-md bg-cucumber-600 px-5 py-3 text-white hover:bg-cucumber-700"
              >
                Shop the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Optional secondary strip for future expansion */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3 text-sm">
          <Feature title="Clean by Design" body="Short, readable ingredient lists. Dermatologist-minded formulas that keep what works and skip what doesn’t." />
          <Feature title="Cucumber-First" body="Hydration, balance, and a cool, clean finish in every routine." />
          <Feature title="Little Rituals" body="Small daily choices compound—clarity, calm, and confidence." />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-700">{body}</p>
    </div>
  );
}
