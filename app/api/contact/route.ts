// app/api/contact/route.ts
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function required(name: string, v?: string | null) {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v!;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const nodemailer = await import("nodemailer"); // ← keep ONLY this import

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: required("GMAIL_USER", process.env.GMAIL_USER),
        pass: required("GMAIL_APP_PASS", process.env.GMAIL_APP_PASS),
      },
    });

    const info = await transporter.sendMail({
      from: `"Simply Cucumber" <${required("GMAIL_USER", process.env.GMAIL_USER)}>`,
      to: required("CONTACT_TO", process.env.CONTACT_TO),
      subject: `Contact form: ${name || "No name"}`,
      replyTo: email,
      text: message || "",
      html: `
        <div>
          <p><strong>Name:</strong> ${name || "-"}</p>
          <p><strong>Email:</strong> ${email || "-"}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap">${message || "-"}</pre>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true, id: info.messageId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err?.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}