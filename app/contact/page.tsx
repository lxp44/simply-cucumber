"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // basic anti-bot: if honeypot has a value, abort silently
      if ((formData.get("company") as string)?.trim()) {
        setSubmitting(false);
        return;
      }

      const payload = {
        name: (formData.get("name") as string)?.trim(),
        email: (formData.get("email") as string)?.trim(),
        phone: (formData.get("phone") as string)?.trim() || undefined,
        message: (formData.get("message") as string)?.trim(),
        // optionally pass a source so the function can include it in the email
        source: "contact-page",
      };

      const res = await fetch("/.netlify/functions/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${txt}`);
      }

      router.push("/contact/thanks");
    } catch (err) {
      console.error(err);
      setError("Sorry—something went wrong sending your message. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-cucumber-700 text-white">
      {/* Hero headline */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-6">
        <h1 className="text-4xl md:text-6xl font-[var(--font-playfair)] font-semibold tracking-tight">
          Good Skin is Forever.
        </h1>
      </section>

      {/* Two-column: left form, right quick-links */}
      <section className="mx-auto max-w-6xl px-4 pb-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold">Stay in touch.</h2>
          <p className="mt-3 text-cucumber-50/90">
            Questions, product advice, or order support — send us a note.
          </p>

          {/* AJAX form → hits Netlify Function (Gmail SMTP) */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
            {/* Honeypot (hidden from users) */}
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <input
              className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
              type="text"
              name="name"
              placeholder="Full name"
              required
            />
            <input
              className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <input
              className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
              type="tel"
              name="phone"
              placeholder="Phone number (optional)"
            />
            <textarea
              className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white min-h-[120px]"
              name="message"
              placeholder="How can we help?"
              required
            />

            {error && <p className="text-sm text-red-200">{error}</p>}

            <button
              className="w-full rounded-md bg-white text-cucumber-900 font-semibold tracking-wide px-4 py-3 hover:bg-cucumber-50 transition disabled:opacity-70"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "SEND MESSAGE"}
            </button>

            <p className="text-xs text-white/80">
              By submitting this form you agree to receive messages from Simply Cucumber. See{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              &{" "}
              <Link href="/terms" className="underline underline-offset-2">
                Terms
              </Link>
              .
            </p>
          </form>
        </div>

        {/* ...right-side links unchanged... */}
      </section>
    </main>
  );
}