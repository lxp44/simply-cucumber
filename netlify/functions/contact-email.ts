// Netlify Function: contact-email.ts
// Sends owner notification + customer auto-reply via Gmail SMTP

import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

const {
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "465",
  SMTP_USER,
  SMTP_PASS,
  SUPPORT_TO, // where owner notification goes (defaults to SMTP_USER)
  BRAND_NAME = "Simply Cucumber",
  BRAND_FROM_NAME = "Simply Cucumber Support",
  SITE_URL = "https://www.simplycucumber.com",
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // true for 465
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const ownerEmailHtml = (p: Required<Payload>) => `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
    <h2 style="margin:0 0 8px">${BRAND_NAME} — New Contact</h2>
    <p style="margin:0 0 16px">A new message was submitted from the website.</p>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 8px;"><b>Name:</b></td><td style="padding:4px 8px;">${p.name}</td></tr>
      <tr><td style="padding:4px 8px;"><b>Email:</b></td><td style="padding:4px 8px;">${p.email}</td></tr>
      ${p.phone ? `<tr><td style="padding:4px 8px;"><b>Phone:</b></td><td style="padding:4px 8px;">${p.phone}</td></tr>` : ""}
      ${p.source ? `<tr><td style="padding:4px 8px;"><b>Source:</b></td><td style="padding:4px 8px;">${p.source}</td></tr>` : ""}
    </table>
    <p style="margin:16px 0 6px"><b>Message</b></p>
    <pre style="white-space:pre-wrap;margin:0;background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px">${p.message}</pre>
  </div>
`;

const customerEmailHtml = (p: Required<Payload>) => `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
    <div style="text-align:center;margin-bottom:18px">
      <img src="${SITE_URL}/assets/products/simply-cucumber-profile-logo.png" alt="${BRAND_NAME}" height="48" />
    </div>
    <h2 style="text-align:center;margin:0 0 10px">${BRAND_NAME}</h2>
    <p>Hi ${p.name.split(" ")[0] || "there"},</p>
    <p>Thanks for reaching out — we’ve received your message and a team member will reply shortly.</p>
    <p style="margin:16px 0 6px"><b>Your message</b></p>
    <pre style="white-space:pre-wrap;margin:0;background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px">${p.message}</pre>
    <p style="margin-top:18px">If you need to add anything, just reply to this email.</p>
    <p style="margin-top:22px">With care,<br/>${BRAND_FROM_NAME}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
    <p style="font-size:12px;color:#666;text-align:center">
      ${BRAND_NAME} · <a href="${SITE_URL}" style="color:#0a7">simplycucumber.com</a>
    </p>
  </div>
`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}") as Payload;
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();
    const phone = (data.phone || "").trim();
    const source = (data.source || "").trim();

    if (!name || !email || !message) {
      return { statusCode: 400, body: "Missing required fields." };
    }

    // 1) Owner notification
    await transporter.sendMail({
      from: `"${BRAND_FROM_NAME}" <${SMTP_USER}>`,
      to: SUPPORT_TO || SMTP_USER,
      subject: `New message from ${name}`,
      replyTo: `${name} <${email}>`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSource: ${source}\n\nMessage:\n${message}`,
      html: ownerEmailHtml({ name, email, phone, message, source }),
    });

    // 2) Customer auto-reply
    await transporter.sendMail({
      from: `"${BRAND_FROM_NAME}" <${SMTP_USER}>`,
      to: email,
      subject: `We received your message — ${BRAND_NAME}`,
      replyTo: SUPPORT_TO || SMTP_USER,
      text:
        `Hi ${name.split(" ")[0] || ""},\n\n` +
        `Thanks for reaching out — we’ve received your note and will reply shortly.\n\n` +
        `Your message:\n${message}\n\n` +
        `${BRAND_NAME} • ${SITE_URL}`,
      html: customerEmailHtml({ name, email, phone, message, source }),
    });

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("contact-email error:", err);
    return { statusCode: 500, body: "Email send failed." };
  }
};