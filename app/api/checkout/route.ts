import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const sku = String(form.get("sku") || "sample");
  // Forward to Netlify function in production, or run locally using process.env
  const url = process.env.NEXT_PUBLIC_NETLIFY_FUNC_URL || "http://localhost:8888/.netlify/functions/create-checkout";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku })
  });
  const data = await res.json();
  if (data.url) {
    return NextResponse.redirect(data.url, { status: 303 });
  }
  return NextResponse.json(data, { status: 400 });
}
