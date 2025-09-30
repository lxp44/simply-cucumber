import Link from "next/link";

export const metadata = {
  title: "Contact Us — Simply Cucumber",
  description: "Questions, wholesale, press, or support — we’re here to help."
};

export default function ContactPage() {
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
        {/* Left: form & note */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold">Stay in touch.</h2>
          <p className="mt-3 text-cucumber-50/90">
            Questions, product advice, or order support — send us a note.
            You’ll also get first access to launches & offers.
          </p>

          {/* Netlify form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/contact/thanks"
            className="mt-6 space-y-3"
          >
            {/* Netlify needs this hidden input */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>

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
            <button
              className="w-full rounded-md bg-white text-cucumber-900 font-semibold tracking-wide px-4 py-3 hover:bg-cucumber-50 transition"
              type="submit"
            >
              SIGN UP / SEND
            </button>

            <p className="text-xs text-white/80">
              By submitting this form you agree to receive messages from
              Simply Cucumber. See{" "}
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

        {/* Right: link columns */}
        <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <p className="uppercase tracking-wider text-sm font-semibold">Customer Care</p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li><Link href="/contact" className="underline-offset-4 hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:underline underline-offset-4">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:underline underline-offset-4">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:underline underline-offset-4">Return Policy</Link></li>
              <li><Link href="/retailers" className="hover:underline underline-offset-4">Become a Retailer</Link></li>
              <li><Link href="/offers" className="hover:underline underline-offset-4">Offers</Link></li>
            </ul>
          </div>

          <div>
            <p className="uppercase tracking-wider text-sm font-semibold">Get to Know Us</p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li><Link href="/about" className="hover:underline underline-offset-4">About Us</Link></li>
              <li><Link href="/salon" className="hover:underline underline-offset-4">Our Salon</Link></li>
              <li><Link href="/certificates" className="hover:underline underline-offset-4">Salon Certificates</Link></li>
              <li><Link href="/reviews" className="hover:underline underline-offset-4">Reviews</Link></li>
              <li><Link href="/blog" className="hover:underline underline-offset-4">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="uppercase tracking-wider text-sm font-semibold">Simply Cucumber</p>
            <ul className="mt-3 space-y-2 text-white/90">
              <li><Link href="/rewards" className="hover:underline underline-offset-4">Rewards</Link></li>
              <li><Link href="/ambassador" className="hover:underline underline-offset-4">Brand Ambassador</Link></li>
              <li><Link href="/students" className="hover:underline underline-offset-4">Student Discount</Link></li>
              <li><Link href="/workers" className="hover:underline underline-offset-4">Essential Worker Discount</Link></li>
              <li><Link href="/skin-analysis" className="hover:underline underline-offset-4">Skin Analysis</Link></li>
              <li><Link href="/gift-cards" className="hover:underline underline-offset-4">E-gift Balance</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
