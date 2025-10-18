// netlify/functions/subscribe-mailchimp.ts
import type { Handler } from "@netlify/functions";

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,      // aka list ID
  MAILCHIMP_DC,               // e.g. "us21" (from your API key suffix)
  BRAND_NAME = "Simply Cucumber",
} = process.env;

function bad(msg: string, code = 400) {
  return { statusCode: code, body: JSON.stringify({ ok: false, message: msg }) };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return bad("Method not allowed", 405);
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_DC)
    return bad("Server not configured.", 500);

  try {
    const { email, firstName, tags = [] } = JSON.parse(event.body || "{}");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Valid email required");

    // Mailchimp: create/update list member
    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending", // use "subscribed" to skip double opt-in
        merge_fields: { FNAME: firstName || "" },
        tags,               // optional: e.g. ["website","footer"]
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      // If already exists in pending/subscribed, Mailchimp returns 400 with title "Member Exists"
      if (data?.title === "Member Exists") {
        return { statusCode: 200, body: JSON.stringify({ ok: true, already: true }) };
      }
      return bad(data?.detail || "Subscription failed", res.status);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, brand: BRAND_NAME }),
    };
  } catch (e) {
    console.error("mailchimp subscribe error:", e);
    return bad("Unexpected error", 500);
  }
};