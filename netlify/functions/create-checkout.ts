// @ts-nocheck
import Stripe from "stripe";

const priceMap: Record<string, string> = {
  sample: process.env.STRIPE_PRICE_ID_SAMPLE || "",
  toner: process.env.STRIPE_PRICE_ID_TONER || process.env.STRIPE_PRICE_ID_SAMPLE || "",
  mask: process.env.STRIPE_PRICE_ID_MASK || process.env.STRIPE_PRICE_ID_SAMPLE || ""
};

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { sku = "sample" } = JSON.parse(event.body || "{}");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const price = priceMap[sku] || priceMap.sample;
    if (!price) throw new Error("Missing Stripe Price ID for sku: " + sku);
    const site = process.env.SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      success_url: `${site}/success`,
      cancel_url: `${site}/products`
    });
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: String(err) }) };
  }
}
