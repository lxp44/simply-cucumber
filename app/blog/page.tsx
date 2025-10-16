// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../lib/blog";

export const metadata = {
  title: "Blog · Simply Cucumber",
  description: "Clean, natural skincare tips, routines, and ingredient education.",
};

const ALL_TAGS = Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)));

export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#b8860b]">Simply Cucumber Journal</h1>
          <p className="mt-2 text-gray-700">Fresh reads on skincare, routines, and ingredient wisdom.</p>
        </header>

        {/* Featured */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-6 rounded-xl overflow-hidden border bg-white/70 backdrop-blur hover:shadow-lg transition"
          >
            <div className="relative h-64 md:h-80">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform"
                priority
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="text-xs tracking-widest text-gray-600">{new Date(featured.date).toLocaleDateString()}</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">{featured.title}</h2>
              <p className="mt-3 text-gray-700">{featured.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.tags.map(t => (
                  <span key={t} className="text-xs rounded-full border px-2 py-1 bg-white/70">{t}</span>
                ))}
              </div>
              <span className="mt-5 inline-block text-cucumber-700 underline underline-offset-4">
                Read more →
              </span>
            </div>
          </Link>
        )}

        {/* Tag rail */}
        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/blog" className="px-3 py-1.5 rounded-full text-sm border bg-white/80 hover:bg-white">All</Link>
          {ALL_TAGS.map(tag => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-full text-sm border bg-white/60 hover:bg-white"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(p => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-xl overflow-hidden border bg-white/70 backdrop-blur hover:shadow-md transition"
            >
              <div className="relative h-48">
                <Image src={p.cover} alt={p.title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
              </div>
              <div className="p-4">
                <div className="text-xs tracking-widest text-gray-600">{new Date(p.date).toLocaleDateString()}</div>
                <h3 className="mt-1 font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-700 line-clamp-3">{p.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs rounded-full border px-2 py-1 bg-white/70">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* (Optional) pagination placeholder */}
        <div className="mt-10 text-center text-sm text-gray-600">More posts coming soon.</div>
      </div>
    </section>
  );
}