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
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      {/* Label */}
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      {/* First name */}
      <div className="relative">
        <input
          id="newsletter-fname"
          type="text"
          inputMode="text"
          autoComplete="given-name"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="
            w-full rounded-md bg-white/95 text-cucumber-900
            placeholder-gray-500 px-3 py-2 outline-none
            ring-1 ring-white/30 focus:ring-2 focus:ring-white
            shadow-sm
          "
        />
      </div>

      {/* Email + Button (inline on md+) */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            flex-1 rounded-md bg-white/95 text-cucumber-900
            placeholder-gray-500 px-3 py-2 outline-none
            ring-1 ring-white/30 focus:ring-2 focus:ring-white
            shadow-sm
          "
        />

        <button
          type="submit"
          disabled={disabled}
          className="
            inline-flex items-center justify-center
            rounded-md px-5 py-2 font-semibold
            bg-white text-cucumber-800
            hover:bg-cucumber-50 transition
            disabled:opacity-70 disabled:cursor-not-allowed
            ring-1 ring-white/30 shadow-sm
          "
        >
          {status.kind === "loading" ? "Subscribing…" : "Join"}
        </button>
      </div>

      {/* Honeypot (hidden) */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        placeholder="Leave this field empty"
        aria-hidden="true"
      />

      {/* Status line */}
      <p
        aria-live="polite"
        className="text-sm min-h-[1.25rem]"
      >
        {status.kind === "ok" &&
          (status.already ? "You’re already subscribed—check your inbox for updates." : "You’re in! Check your inbox.")}
        {status.kind === "error" && status.message}
      </p>

      {/* small reassurance text */}
      <p className="text-xs text-white/80">
        We respect your inbox. Unsubscribe anytime.
      </p>
    </form>
  );
}