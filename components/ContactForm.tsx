"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setError(data?.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className="w-full px-3 py-2 rounded border" />
        <input name="email" type="email" required placeholder="Your email" className="w-full px-3 py-2 rounded border" />
      </div>
      <input name="phone" placeholder="Phone (optional)" className="w-full px-3 py-2 rounded border" />
      <textarea name="message" required placeholder="How can we help?" rows={6} className="w-full px-3 py-2 rounded border" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-cucumber-700 px-5 py-2.5 text-white font-semibold hover:bg-cucumber-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "ok" && (
        <p className="text-green-700">Thanks! Your message was sent — we’ll get back to you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">Sorry — {error}</p>
      )}
    </form>
  );
}