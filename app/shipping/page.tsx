// app/shipping/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Shipping Policy · Simply Cucumber",
  description:
    "Learn about shipping methods, processing times, tracking, and international delivery for Simply Cucumber orders.",
};

export default function ShippingPolicyPage() {
  return (
    <section className="min-h-screen bg-[#e3d3b3]">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cucumber-700 via-cucumber-800 to-cucumber-700 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold">
            Shipping Policy
          </h1>
          <p className="mt-2 text-white/90">
            How we process, pack, and deliver your Simply Cucumber favorites.
          </p>
        </div>

        {/* Body */}
        <div className="mt-8 space-y-8 rounded-xl border bg-white/90 p-6 leading-relaxed text-gray-800">
          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Processing Times</h2>
            <p className="mt-2">
              Orders are typically processed within <strong>1–2 business days</strong>.
              During launches, promotions, or holidays, processing may take an extra day.
              Orders placed after 12 PM local time are processed the next business day.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Domestic Shipping</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Standard:</strong> 3–5 business days after dispatch</li>
              <li><strong>Expedited:</strong> 2–3 business days after dispatch</li>
              <li><strong>Express:</strong> 1–2 business days after dispatch</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              Transit estimates are provided by the carrier and exclude processing time.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Shipping Rates & Free Shipping</h2>
            <p className="mt-2">
              Rates are calculated at checkout based on order weight and destination.
              We offer <strong>free standard shipping on U.S. orders over $75</strong> (after discounts, before taxes).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Order Tracking</h2>
            <p className="mt-2">
              You’ll receive a shipping confirmation email with a tracking link once your
              order has left our facility. Tracking may take up to 24 hours to update.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Address Changes</h2>
            <p className="mt-2">
              Enter your address carefully at checkout. If you need to correct it,{" "}
              please <Link href="/contact" className="underline underline-offset-2">contact us</Link>{" "}
              immediately with your order number. Once an order is dispatched, we’re unable to
              modify the address.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Lost, Delayed, or Damaged Packages</h2>
            <p className="mt-2">
              If your package appears lost or arrives damaged, reach out within{" "}
              <strong>7 days</strong> of the delivery date (or expected delivery) at{" "}
              <Link href="/contact" className="underline underline-offset-2">Contact Us</Link>. 
              We’ll help open a carrier investigation and make it right per our{" "}
              <Link href="/returns" className="underline underline-offset-2">Return Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">International Shipping</h2>
            <p className="mt-2">
              International delivery times and rates vary by destination. Duties, taxes,
              and import fees are the recipient’s responsibility and are collected by the carrier
              upon delivery. We can’t control customs delays.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">PO Boxes & APO/FPO</h2>
            <p className="mt-2">
              We ship to PO Boxes and APO/FPO whenever possible via eligible carrier services.
              Some expedited options may be unavailable for these addresses.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Pre-Orders & Backorders</h2>
            <p className="mt-2">
              If your order includes a pre-order or backordered item, we’ll ship the package once
              all items are available unless otherwise noted at checkout.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-cucumber-800">Holiday & Peak Seasons</h2>
            <p className="mt-2">
              Carriers may experience delays during peak periods. Please allow extra time for
              delivery and order early for gift-giving.
            </p>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-600">
              Questions? We’re happy to help—visit{" "}
              <Link href="/contact" className="underline underline-offset-2">Contact Us</Link>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}