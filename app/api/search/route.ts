// app/api/search/route.ts
import { NextResponse } from "next/server";
import { products } from "@/lib/products"; // ← uses your existing product data

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  // no query → empty payload (so UI can hide panel)
  if (!q) {
    return NextResponse.json({ suggestions: [], products: [] }, { status: 200 });
  }

  // Basic scoring: title starts-with > includes; also search tags/category
  const scored = products
    .map((p) => {
      const hay = [
        p.title,
        p.category,
        ...(Array.isArray(p.tags) ? p.tags : []),
        ...(Array.isArray(p.keywords) ? p.keywords : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const starts = p.title.toLowerCase().startsWith(q) ? 2 : 0;
      const includes = hay.includes(q) ? 1 : 0;
      const score = starts + includes;

      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ p }) => ({
      slug: p.slug,
      title: p.title,
      price: p.price,
      image: p.images?.[0] || p.image || "/placeholder.png",
    }));

  // Simple “suggestions” from matched words in titles
  const suggestions = Array.from(
    new Set(
      scored
        .flatMap((r) => r.title.split(/\s+/))
        .filter((w) => w.length > 3)
        .slice(0, 5)
    )
  );

  return NextResponse.json({ suggestions, products: scored }, { status: 200 });
}