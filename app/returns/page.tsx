// app/returns/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Return Policy • Simply Cucumber",
  description:
    "Easy returns & exchanges with Simply Cucumber. Learn how to start a return, exchange an item, and when to expect your refund.",
};

export default function ReturnsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#b8860b]">Return Policy</h1>
          <p className="mt-2 text-gray-700">
            We want you to love everything from Simply Cucumber. If something
            isn’t right, we’ll help make it right.
          </p>
        </header>

        {/* Quick facts */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            ["30 Days", "for returns & exchanges"],
            ["Free Exchange", "on first exchange for the same item"],
            ["Fast Refunds", "3–10 business days after receipt"],
          ].map(([title, sub]) => (
            <div
              key={title}
              className="rounded-xl border bg-white/80 backdrop-blur p-4 text-center"
            >
              <div className="text-xl font-semibold text-cucumber-800">
                {title}
              </div>
              <div className="text-sm text-gray-600">{sub}</div>
            </div>
          ))}
        </div>

        {/* Policy body */}
        <div className="rounded-xl border bg-white/85 backdrop-blur p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Eligibility
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-800">
              <li>Returns are accepted within <strong>30 days</strong> of delivery.</li>
              <li>
                Items must be unused, unopened, and in original packaging to
                receive a full refund.
              </li>
              <li>
                Lightly tried items (single use) may be eligible for store
                credit on a case-by-case basis for skincare items.
              </li>
              <li>Gift cards and final-sale items are non-returnable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Exchanges
            </h2>
            <p className="mt-3 text-gray-800">
              Need a different item? We offer a <strong>free first exchange</strong> for the
              same product (different variant) or a product of equal value. If
              the replacement costs more, we’ll send a secure payment link for
              the difference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Start a Return or Exchange
            </h2>
            <ol className="mt-3 list-decimal pl-5 space-y-2 text-gray-800">
              <li>
                Contact us via{" "}
                <Link href="/contact" className="underline text-cucumber-700">
                  the contact form
                </Link>{" "}
                with your order number and reason.
              </li>
              <li>
                We’ll reply with a prepaid return label (if eligible) and next
                steps.
              </li>
              <li>
                Pack items securely; include any accessories and original
                inserts.
              </li>
              <li>Drop the package off within 7 days of receiving the label.</li>
            </ol>
            <p className="mt-2 text-xs text-gray-600">
              International customers: return shipping is customer-paid unless
              the item arrived damaged or incorrect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Refunds
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-800">
              <li>
                Once your return is delivered to our facility and inspected,
                refunds are issued to the original payment method within{" "}
                <strong>3–10 business days</strong>.
              </li>
              <li>
                Shipping fees are non-refundable, except for damaged/incorrect
                items.
              </li>
              <li>
                Store credit (when applicable) is issued instantly once your
                return is processed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Damaged or Incorrect Items
            </h2>
            <p className="mt-3 text-gray-800">
              If your order arrives damaged or incorrect, please contact us
              within <strong>7 days</strong> of delivery with photos of the package and
              product. We’ll replace it or refund you promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Non-Returnable Items
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-gray-800">
              <li>Opened consumables (e.g., powders) beyond a single trial use</li>
              <li>Final-sale or promotional giveaways</li>
              <li>Gift cards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              Need Help?
            </h2>
            <p className="mt-3 text-gray-800">
              We’re here for you. Start your request via{" "}
              <Link href="/contact" className="underline text-cucumber-700">
                our contact page
              </Link>{" "}
              and we’ll take care of the rest.
            </p>
          </section>
        </div>

        <p className="mt-6 text-xs text-gray-600 text-center">
          This policy applies to purchases made on simplycucumber.com. We may
          update it periodically to improve your experience.
        </p>
      </div>
    </section>
  );
}