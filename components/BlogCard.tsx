// components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "../lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-xl overflow-hidden border bg-white/70 backdrop-blur hover:shadow-md transition"
    >
      <div className="relative h-48">
        <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-[1.02] transition-transform" />
      </div>
      <div className="p-4">
        <div className="text-xs tracking-widest text-gray-600">{new Date(post.date).toLocaleDateString()}</div>
        <h3 className="mt-1 font-semibold text-gray-900">{post.title}</h3>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map(t => (
            <span key={t} className="text-xs rounded-full border px-2 py-1 bg-white/70">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}