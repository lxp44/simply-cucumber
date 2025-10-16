// app/faq/page.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export const metadata = {
  title: "FAQ · Simply Cucumber",
  description:
    "Answers to common questions about Simply Cucumber skincare, shipping, returns, and more.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Where are Simply Cucumber products made?",
      a: "All Simply Cucumber products are formulated and produced in the United States using clean, responsibly sourced ingredients. Each formula is crafted in small batches to preserve freshness and quality.",
    },
    {
      q: "Are your products cruelty-free and vegan?",
      a: "Yes! Every Simply Cucumber product is 100% cruelty-free and vegan. We never test on animals, and we avoid all animal-derived ingredients.",
    },
    {
      q: "Are your products safe for sensitive skin?",
      a: "Absolutely. Our formulas are dermatologist-tested and designed to soothe and balance even the most sensitive skin. We avoid harsh chemicals, parabens, and synthetic fragrances to keep your skin calm and hydrated.",
    },
    {
      q: "How should I store my Simply Cucumber products?",
      a: "We recommend storing your products in a cool, dry place away from direct sunlight. For extra refreshment, keep mists, masks, and eye pads in the refrigerator for a cooling spa experience.",
    },
    {
      q: "Do Simply Cucumber products have a fragrance?",
      a: "Our signature scent comes naturally from real cucumber extract. It’s light, refreshing, and clean — never synthetic or overpowering.",
    },
    {
      q: "How long will my products last?",
      a: "For most products, we recommend use within 6–12 months after opening. Check the packaging for a small jar symbol (the ‘Period After Opening’ icon) which indicates the product’s freshness window.",
    },
    {
      q: "Can I use Simply Cucumber with other skincare brands?",
      a: "Yes. Our products are designed to blend easily into any routine. We recommend starting with our cleanser, face mist, and moisturizer — then layering other treatments as needed.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you’ll receive a confirmation email with tracking details. You can also view your order status by logging into your account or visiting the link in your shipping email.",
    },
    {
      q: "What is your return policy?",
      a: (
        <>
          We want you to love your Simply Cucumber experience. If you’re not satisfied
          with your purchase, you may return unused or gently used items within{" "}
          <strong>30 days</strong> of delivery. See our{" "}
          <Link href="/returns" className="underline text-cucumber-700">
            Return Policy
          </Link>{" "}
          for full details.
        </>
      ),
    },
    {
      q: "Do you ship internationally?",
      a: (
        <>
          Yes! We currently ship to select countries worldwide. Shipping times vary by
          region. For details, please visit our{" "}
          <Link href="/shipping" className="underline text-cucumber-700">
            Shipping Policy
          </Link>
          .
        </>
      ),
    },
    {
      q: "Do you offer samples?",
      a: "We include complimentary samples with select orders and during promotional periods. Sign up for our newsletter to be notified when samples or trial kits are available.",
    },
    {
      q: "How can I earn rewards or points?",
      a: (
        <>
          Join our upcoming{" "}
          <Link href="/rewards" className="underline text-cucumber-700">
            Simply Rewards
          </Link>{" "}
          program to earn points for every purchase, review, and referral. Members get
          early access to new launches and exclusive discounts.
        </>
      ),
    },
    {
      q: "How do I contact customer service?",
      a: (
        <>
          Our support team is here to help! Visit our{" "}
          <Link href="/contact" className="underline text-cucumber-700">
            Contact page
          </Link>{" "}
          to submit a message or email us directly. Please allow 24–48 hours for a reply
          during business hours.
        </>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#b8860b]">Frequently Asked Questions</h1>
          <p className="mt-2 text-gray-700">
            Everything you need to know about Simply Cucumber — from ingredients to shipping.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`rounded-xl border bg-white/85 backdrop-blur p-5 transition-all ${
                  isOpen ? "shadow-lg border-cucumber-400" : "hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <h3 className="font-semibold text-cucumber-800 text-base md:text-lg">
                    {faq.q}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cucumber-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cucumber-700" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-3 text-gray-700 text-sm md:text-base animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray-700">
          Still have questions?{" "}
          <Link href="/contact" className="underline text-cucumber-700">
            Contact our team
          </Link>{" "}
          — we’re happy to help.
        </p>

        <p className="mt-6 text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} Simply Cucumber. All rights reserved.
        </p>
      </div>
    </section>
  );
}