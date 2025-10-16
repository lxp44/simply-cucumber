// app/terms/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Terms of Service · Simply Cucumber",
  description:
    "Please review the Terms of Service for Simply Cucumber, including use of our site, purchases, intellectual property, and limitations of liability.",
};

export default function TermsOfServicePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#b8860b]">Terms of Service</h1>
          <p className="mt-2 text-gray-700">
            By accessing or using SimplyCucumber.com, you agree to the following terms.
          </p>
        </header>

        <div className="rounded-xl border bg-white/85 backdrop-blur p-6 space-y-8 leading-relaxed text-gray-800">
          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">1. Overview</h2>
            <p className="mt-2">
              These Terms of Service (“Terms”) govern your access to and use of Simply
              Cucumber’s website, products, and services. By visiting our site or making a
              purchase, you agree to be bound by these Terms and our{" "}
              <Link href="/privacy" className="underline text-cucumber-700">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              2. Online Store Terms
            </h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>You must be at least 18 years old or have parental consent to use this site.</li>
              <li>
                You may not use our products for any illegal or unauthorized purpose, nor
                violate any laws in your jurisdiction (including copyright laws).
              </li>
              <li>
                A breach or violation of any of the Terms will result in an immediate
                termination of your services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              3. Product Information & Availability
            </h2>
            <p className="mt-2">
              We make every effort to display products accurately. However, we cannot
              guarantee that your monitor’s display of any color or texture will be
              perfectly accurate. Prices and availability are subject to change without
              notice. We reserve the right to discontinue any product at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              4. Billing & Account Information
            </h2>
            <p className="mt-2">
              You agree to provide current, complete, and accurate purchase and account
              information for all transactions made through our store. We may limit or
              cancel orders if we suspect fraud or unauthorized activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              5. Intellectual Property
            </h2>
            <p className="mt-2">
              All content on this site — including images, logos, designs, and text — is
              the property of Simply Cucumber and is protected by copyright and trademark
              laws. You may not reproduce, distribute, or exploit any content without
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              6. Third-Party Links
            </h2>
            <p className="mt-2">
              Certain content, products, or services available through our site may include
              materials from third parties. We are not responsible for any third-party
              websites, materials, or services and encourage you to review their terms and
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              7. Personal Information
            </h2>
            <p className="mt-2">
              Your submission of personal information is governed by our{" "}
              <Link href="/privacy" className="underline text-cucumber-700">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              8. Errors, Inaccuracies & Omissions
            </h2>
            <p className="mt-2">
              Occasionally, information on our site may contain typographical errors,
              inaccuracies, or omissions related to pricing, descriptions, or availability.
              We reserve the right to correct such errors without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">9. Prohibited Uses</h2>
            <p className="mt-2">
              You are prohibited from using the site or its content for any unlawful
              purpose, to solicit others to perform unlawful acts, to violate regulations or
              laws, to harass or harm others, or to upload malicious code or spam.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">
              10. Disclaimer of Warranties; Limitation of Liability
            </h2>
            <p className="mt-2">
              We do not guarantee that your use of our service will be uninterrupted,
              timely, secure, or error-free. In no case shall Simply Cucumber, its
              directors, employees, or partners be liable for any injury, loss, or claim
              arising from your use of our products or site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">11. Indemnification</h2>
            <p className="mt-2">
              You agree to indemnify, defend, and hold harmless Simply Cucumber and our
              partners from any claim or demand, including reasonable attorneys’ fees, made
              by any third party due to your breach of these Terms or violation of any law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">12. Governing Law</h2>
            <p className="mt-2">
              These Terms shall be governed by and construed in accordance with the laws of
              the State of New York, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">13. Changes to Terms</h2>
            <p className="mt-2">
              You can review the most current version of the Terms at any time on this
              page. We reserve the right to update or change these Terms by posting
              revisions to this site. Continued use of the site means acceptance of those
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-cucumber-800">14. Contact Information</h2>
            <p className="mt-2">
              Questions about the Terms of Service should be sent via{" "}
              <Link href="/contact" className="underline text-cucumber-700">
                our contact form
              </Link>
              .
            </p>
          </section>
        </div>

        <p className="mt-6 text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} Simply Cucumber. All rights reserved.
        </p>
      </div>
    </section>
  );
}