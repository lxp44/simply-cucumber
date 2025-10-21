// app/api/search/route.ts
import { NextResponse } from "next/server";
// NOTE: use the correct export name and a relative path
import { PRODUCTS, type Product } from "../../../lib/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ products: [] });
  }

  const tokens = q.split(/\s+/);

  // simple relevance scoring over title/description/category
  const results = PRODUCTS.map((p: Product) => {
    const haystack = [
      p.title,
      p.description || "",
      (p as any).category || "",
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const t of tokens) if (haystack.includes(t)) score += 1;
    if (p.title.toLowerCase().startsWith(tokens[0])) score += 1;

    return { p, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8) // cap results for the dropdown
    .map(({ p }) => ({
      sku: p.sku,
      title: p.title,
      price: p.price,
      image: p.images?.[0] ?? "/placeholder.png",
      slug: (p as any).slug ?? p.sku,
    }));

  return NextResponse.json({ products: results });
}