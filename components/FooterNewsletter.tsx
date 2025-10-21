// components/FooterNewsletter.tsx
"use client";

import { useState, FormEvent } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const filled = email.trim() !== "" || phone.trim() !== "";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!filled) return;
    // TODO: hook to your subscribe endpoint (Mailchimp/etc.)
    alert("Thanks! You’re on the list 🥒");
  }

  return (
    <div className="text-center py-12 px-6 md:px-0">
      <h3 className="text-lg md:text-xl font-semibold text-gold-metallic tracking-wide mb-2">
        STAY IN TOUCH.
      </h3>

      <p className="max-w-md mx-auto text-sm md:text-base text-white/90 mb-6">
        Signup to get first access to product launches & exclusive offers. Receive 15% Off Your First Order.
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto grid gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-white/40 bg-transparent text-white placeholder-white/60 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-metallic transition-all"
        />

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm select-none">🇺🇸</div>
          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-transparent text-white placeholder-white/60 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-metallic transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={!filled}
          className={`w-full rounded-full bg-gold-metallic text-cucumber-800 font-semibold text-sm py-2.5 tracking-wide transition-all duration-300
            ${filled ? "opacity-100 cursor-pointer hover:scale-[1.02] shadow-[0_0_10px_rgba(212,175,55,0.6),_0_0_25px_rgba(255,215,0,0.3)]" : "opacity-50 cursor-not-allowed grayscale-[40%]"}`}
        >
          SIGN UP
        </button>
      </form>

      <p className="text-xs text-white/70 mt-4 max-w-sm mx-auto">
        By submitting this form, you consent to receive marketing emails or text messages from Simply Cucumber.{" "}
        See our <a href="/privacy" className="underline hover:text-gold-metallic">Privacy Policy</a>.
      </p>
    </div>
  );
}