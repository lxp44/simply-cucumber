// app/faq/page.tsx
import Link from "next/link";
import FAQAccordion from "../../components/FAQAccordion";

export const metadata = {
  title: "FAQ · Simply Cucumber",
  description:
    "Answers to common questions about Simply Cucumber skincare, shipping, returns, and more.",
};

const FAQS = [
  {
    q: "What skin types are your products for?",
    a: "Our formulas are designed for all skin types, especially sensitive and combination skin.",
  },
  {
    q: "How long is shipping?",
    a: "Orders typically ship in 1–2 business days and arrive in 3–5 business days.",
  },
  {
    q: "What’s your return policy?",
    a: "30-day returns on unopened items. Start a return on the Contact page.",
  },
];

export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-[var(--font-playfair)] mb-6">
        Frequently Asked Questions
      </h1>

      {/* Interactive (client) accordion */}
      <FAQAccordion items={FAQS} />

      <p className="mt-8 text-sm text-gray-600">
        Still need help?{" "}
        <Link href="/contact" className="underline hover:text-cucumber-700">
          Contact us
        </Link>
        .
      </p>
    </section>
  );
}