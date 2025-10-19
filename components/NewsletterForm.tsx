// components/NewsletterForm.tsx
"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; already?: boolean }
  | { kind: "error"; message: string };

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [hp, setHp] = useState(""); // honeypot

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return; // bot caught

    setStatus({ kind: "loading" });

    try {
      const res = await fetch("/.netlify/functions/mc-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fname: firstName,
          tags: ["website", "footer"],
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }
      const data = await res.json().catch(() => ({}));
      setStatus({ kind: "ok", already: Boolean(data?.already) });
      setEmail("");
      setFirstName("");
    } catch (err: any) {
      setStatus({
        kind: "error",
        message:
          "Sorry—couldn’t subscribe right now. Please try again in a moment.",
      });
    }
  }

  const disabled = status.kind === "loading";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* First name */}
      <div>
        <label
          htmlFor="newsletter-fname"
          className="block text-sm font-semibold text-gold-metallic mb-1"
        >
          First Name
        </label>
        <input
          id="newsletter-fname"
          type="text"
          inputMode="text"
          autoComplete="given-name"
          placeholder="Enter your first name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="
            w-full rounded-md bg-white/95 text-cucumber-900
            placeholder-gray-500 px-3 py-2 outline-none
            ring-1 ring-white/30 focus:ring-2 focus:ring-gold-metallic
            shadow-sm
          "
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="newsletter-email"
          className="block text-sm font-semibold text-gold-metallic mb-1"
        >
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full rounded-md bg-white/95 text-cucumber-900
            placeholder-gray-500 px-3 py-2 outline-none
            ring-1 ring-white/30 focus:ring-2 focus:ring-gold-metallic
            shadow-sm
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={disabled}
        className="
          w-full rounded-md px-5 py-2.5 font-semibold text-cucumber-900
          bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500
          hover:from-yellow-400 hover:to-yellow-300
          transition disabled:opacity-70 disabled:cursor-not-allowed
          shadow-md
        "
      >
        {status.kind === "loading" ? "Subscribing…" : "Join Newsletter"}
      </button>

      {/* Honeypot */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        placeholder="Leave this field empty"
        aria-hidden="true"
      />

      {/* Status message */}
      <p
        aria-live="polite"
        className="text-sm min-h-[1.25rem] text-white"
      >
        {status.kind === "ok" &&
          (status.already
            ? "You’re already subscribed—check your inbox for updates."
            : "You’re in! Check your inbox.")}
        {status.kind === "error" && status.message}
      </p>

      {/* Subtext */}
      <p className="text-xs text-white/80">
        We respect your inbox. Unsubscribe anytime.
      </p>
    </form>
  );
}