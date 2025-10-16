// app/privacy/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · Simply Cucumber",
  description:
    "How Simply Cucumber collects, uses, and protects your personal information. Learn about cookies, marketing, analytics, and your privacy rights.",
};

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#b8860b]">Privacy Policy</h1>
          <p className="mt-2 text-gray-700">
            We value your privacy. This notice explains what we collect, how we use it, and the choices you have.
          </p>
        </header>

        <div className="rounded-xl border bg-white/85 backdrop-blur p-6 space-y-8 leading-relaxed text-gray-800">
          {/* 1. Overview */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">1. Overview</h2>
            <p className="mt-2">
              This Privacy Policy describes how Simply Cucumber (“we,” “us,” or “our”) collects, uses, and shares
              information when you visit SimplyCucumber.com, make a purchase, contact us, or interact with our
              services (the “Services”). By using the Services, you agree to this Policy.
            </p>
          </section>

          {/* 2. What we collect */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">2. Information We Collect</h2>
            <h3 className="mt-2 font-medium">A. Information you provide</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Contact details (name, email, phone, shipping/billing address)</li>
              <li>Account details (passwords are hashed)</li>
              <li>Order details (items purchased, payment method, transaction data)</li>
              <li>Messages, reviews, survey responses (e.g., Skin Doctor quiz)</li>
            </ul>
            <h3 className="mt-4 font-medium">B. Information collected automatically</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Device and usage data (IP address, browser, pages viewed, referring URLs, timestamps)</li>
              <li>Cookies and similar technologies (pixels, local storage, analytics tags)</li>
            </ul>
            <h3 className="mt-4 font-medium">C. Information from third parties</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Payment processors (payment confirmation, fraud screening results)</li>
              <li>Advertising/analytics partners (aggregate campaign metrics)</li>
              <li>Fulfillment/shipping partners (delivery updates)</li>
            </ul>
          </section>

          {/* 3. How we use it */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process and fulfill orders, returns, and customer support</li>
              <li>Personalize experiences and product recommendations</li>
              <li>Improve our site, Services, and product offerings</li>
              <li>Send transactional messages (order confirmations, shipping notices)</li>
              <li>Send marketing communications with your consent (you can opt out anytime)</li>
              <li>Detect, investigate, and prevent fraud or misuse</li>
              <li>Comply with legal obligations and enforce our <Link href="/terms" className="underline text-cucumber-700">Terms</Link></li>
            </ul>
          </section>

          {/* 4. Cookies / Ads / Analytics */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">4. Cookies, Ads & Analytics</h2>
            <p className="mt-2">
              We use cookies and similar technologies to operate the site, remember preferences, analyze traffic,
              and measure marketing. You can control cookies via your browser settings. Blocking cookies may affect
              some site functions.
            </p>
          </section>

          {/* 5. SMS/Email marketing */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">5. Email & SMS Marketing</h2>
            <p className="mt-2">
              If you opt in, we may send you emails or text messages about new products, offers, and updates. You can
              unsubscribe via the link in our emails or reply STOP to SMS. Message and data rates may apply.
            </p>
          </section>

          {/* 6. How we share */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">6. How We Share Information</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <span className="font-medium">Service providers</span> (e.g., payment processing, hosting, analytics,
                customer support, email/SMS, fulfillment, and shipping) under confidentiality obligations.
              </li>
              <li>
                <span className="font-medium">Legal and safety</span>—to comply with law, enforce policies, or protect
                rights, property, and safety.
              </li>
              <li>
                <span className="font-medium">Business transfers</span>—in connection with a merger, acquisition, or
                sale of assets, your information may be transferred as permitted by law.
              </li>
              <li>
                <span className="font-medium">With your consent</span>—for any other sharing you approve.
              </li>
            </ul>
          </section>

          {/* 7. Your choices & rights */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">7. Your Choices & Rights</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access, correct, or delete certain personal information</li>
              <li>Opt out of marketing emails/SMS at any time</li>
              <li>Control cookies via your browser</li>
              <li>
                California residents: you may have rights under the CCPA/CPRA (access, delete, correct, and opt out of
                certain data sharing). See our{" "}
                <Link href="/privacy#state-rights" className="underline text-cucumber-700">
                  State Privacy Rights
                </Link>{" "}
                below.
              </li>
              <li>
                EEA/UK residents: you may have GDPR rights (access, portability, erasure, restriction, objection). You
                may also have the right to lodge a complaint with your local supervisory authority.
              </li>
            </ul>
          </section>

          {/* 8. State privacy rights anchor */}
          <section id="state-rights">
            <h2 className="text-xl font-semibold text-cucumber-800">8. State Privacy Rights (U.S.)</h2>
            <p className="mt-2">
              Depending on your state, you may have additional rights to access, correct, delete, or opt out of certain
              processing (including targeted advertising or “selling/sharing” of personal information). You can submit a request via{" "}
              <Link href="/contact" className="underline text-cucumber-700">our contact form</Link>. If applicable in
              your state, you may appeal a denied request by replying to our decision notice.
            </p>
            <p className="mt-2">
              To exercise an opt-out of targeted advertising, adjust your cookie preferences in your browser and/or use
              the “Do Not Sell or Share My Personal Information” link (if provided for your region).
            </p>
          </section>

          {/* 9. Do Not Track */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">9. “Do Not Track” Signals</h2>
            <p className="mt-2">
              Some browsers offer a “Do Not Track” (DNT) setting. Because there is no common industry standard, our site
              does not currently respond to DNT signals. We’ll update this Policy if that changes.
            </p>
          </section>

          {/* 10. Children */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">10. Children’s Privacy</h2>
            <p className="mt-2">
              Our Services are not directed to children under 13 (or the minimum age required in your jurisdiction). We
              do not knowingly collect personal information from children.
            </p>
          </section>

          {/* 11. Security */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">11. Data Security</h2>
            <p className="mt-2">
              We use administrative, technical, and physical safeguards designed to protect your information. However,
              no method of transmission or storage is 100% secure.
            </p>
          </section>

          {/* 12. Retention */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">12. Data Retention</h2>
            <p className="mt-2">
              We retain personal information for as long as necessary to provide the Services, comply with legal
              obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          {/* 13. International */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">13. International Transfers</h2>
            <p className="mt-2">
              If you access the Services from outside the United States, your information may be processed in the U.S.
              and other countries, which may have different data protection laws than your country.
            </p>
          </section>

          {/* 14. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">14. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Policy from time to time. The updated version will be indicated by an updated “Last
              Updated” date and will be effective when posted on the site.
            </p>
          </section>

          {/* 15. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">15. Contact Us</h2>
            <p className="mt-2">
              Have questions about this Policy or your data? Reach us via{" "}
              <Link href="/contact" className="underline text-cucumber-700">
                our contact form
              </Link>
              .
            </p>
          </section>

          <p className="text-xs text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <p className="mt-6 text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} Simply Cucumber. All rights reserved.
        </p>
      </div>
    </section>
  );
}