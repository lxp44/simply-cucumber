// netlify/functions/mc-subscribe.ts
import type { Handler } from "@netlify/functions";
import crypto from "node:crypto";

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_DC,
} = process.env;

const required = (name: string, v?: string) => {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const API_KEY = required("MAILCHIMP_API_KEY", MAILCHIMP_API_KEY);
    const LIST_ID = required("MAILCHIMP_AUDIENCE_ID", MAILCHIMP_AUDIENCE_ID);
    const DC = required("MAILCHIMP_DC", MAILCHIMP_DC);

    const { email, fname = "", lname = "", tags = [] } = JSON.parse(event.body || "{}");

    if (!email || typeof email !== "string") {
      return { statusCode: 400, body: "Email required." };
    }

    const subscriberHash = crypto
      .createHash("md5")
      .update(email.trim().toLowerCase())
      .digest("hex");

    const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`;

    // Idempotent upsert via PUT
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Mailchimp expects HTTP Basic: anyusername:API_KEY
        Authorization: "Basic " + Buffer.from(`any:${API_KEY}`).toString("base64"),
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: { FNAME: fname, LNAME: lname },
        tags: Array.isArray(tags) ? tags : [],
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Treat "Member Exists" as success for UX
      if (data?.title === "Member Exists") {
        return { statusCode: 200, body: JSON.stringify({ ok: true, already: true }) };
      }
      console.error("Mailchimp error:", data);
      return { statusCode: res.status, body: "Subscribe failed." };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("mc-subscribe error:", err);
    return { statusCode: 500, body: "Server error." };
  }
};