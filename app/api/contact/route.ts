// app/api/contact/route.ts
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime on Netlify

function required(name: string, v?: string | null) {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name = "", email = "", phone = "", message = "", honey = "" } = body ?? {};

    // simple validation
    if (honey) return Response.json({ ok: true }); // bot trap
    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Please fill in name, email, and message." }, { status: 400 });
    }

    const GMAIL_USER = required("GMAIL_USER", process.env.GMAIL_USER);
    const GMAIL_APP_PASS = required("GMAIL_APP_PASS", process.env.GMAIL_APP_PASS);
    const CONTACT_TO = required("CONTACT_TO", process.env.CONTACT_TO);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASS },
    });

    const subject = `New contact from ${name}`;
    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.6">
        <h2 style="margin:0 0 8px">New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap; background:#f6f6f6; padding:12px; border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: `"Simply Cucumber" <${GMAIL_USER}>`, // must be your Gmail
      to: CONTACT_TO,
      replyTo: email, // so you can just “Reply” in Gmail
      subject,
      html,
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("Contact send error:", err);
    return Response.json({ ok: false, error: "Failed to send. Please try again." }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}