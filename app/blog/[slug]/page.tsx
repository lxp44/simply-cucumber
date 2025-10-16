// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../../lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export const metadata = {
  title: "Article · Simply Cucumber",
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) return notFound();

  const date = new Date(post.date).toLocaleDateString();

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/blog" className="text-cucumber-700 underline">← Back to blog</Link>

        <header className="mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
            <span>{date}</span>
            {post.author && <>· <span>{post.author}</span></>}
            {post.readMins && <>· <span>{post.readMins} min read</span></>}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="text-xs rounded-full border px-2 py-1 bg-white/80">{t}</span>
            ))}
          </div>
        </header>

        <div className="relative mt-6 h-64 md:h-96 rounded-xl overflow-hidden border">
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Content (from HTML string) */}
        <div
          className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-cucumber-700 max-w-none bg-white/80 backdrop-blur rounded-xl border p-6 mt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA strip */}
        <div className="mt-10 rounded-xl border bg-white/70 p-5 text-center">
          <p className="text-gray-800">
            Want personalized recommendations? Try our{" "}
            <Link href="/skin-doctor" className="underline text-cucumber-700">
              Skin Doctor
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}