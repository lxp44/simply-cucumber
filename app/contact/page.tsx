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
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        message: String(formData.get("message") || "").trim(),
        source: "contact-page", // helpful context in the email
      };

      const res = await fetch("/.netlify/functions/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      router.push("/contact/thanks");
    } catch (err) {
      console.error(err);
      setError("Sorry—something went wrong. Please try again.");
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

      {/* Two-column */}
      <section className="mx-auto max-w-6xl px-4 pb-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold">Stay in touch.</h2>
          <p className="mt-3 text-cucumber-50/90">
            Questions, product advice, or order support — send us a note.
          </p>

          <form name="contact" onSubmit={handleSubmit} className="mt-6 space-y-3">
            {/* Fields */}
            <input className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
                   type="text" name="name" placeholder="Full name" required />
            <input className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
                   type="email" name="email" placeholder="Enter your email" required />
            <input className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white"
                   type="tel" name="phone" placeholder="Phone number (optional)" />
            <textarea className="w-full rounded-md bg-transparent border border-white/70 px-3 py-3 placeholder-white/80 outline-none focus:ring-2 focus:ring-white min-h-[120px]"
                      name="message" placeholder="How can we help?" required />

            {error && <p className="text-sm text-red-200">{error}</p>}

            <button className="w-full rounded-md bg-white text-cucumber-900 font-semibold tracking-wide px-4 py-3 hover:bg-cucumber-50 transition disabled:opacity-70"
                    type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send message"}
            </button>

            <p className="text-xs text-white/80">
              By submitting this form you agree to receive messages from Simply Cucumber. See{" "}
              <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link> &{" "}
              <Link href="/terms" className="underline underline-offset-2">Terms</Link>.
            </p>
          </form>
        </div>
        {/* right column unchanged */}
      </section>
    </main>
  );
}