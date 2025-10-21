// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display, Lato } from "next/font/google";
import { CartProvider } from "../components/CartProvider";
import CartLink from "../components/CartLink";
import ProductSearch from "../components/ProductSearch";
// import NewsletterForm from "../components/NewsletterForm"; // ⛔️ no longer used
import MobileMenu from "../components/MobileMenu";
import SocialRow from "../components/SocialRow";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className={`${lato.className} antialiased`}>
        <PromoBar />

        <CartProvider>
          {/* Header */}
          <header className="sticky top-0 z-[9999] bg-white/80 backdrop-blur border-b overflow-visible">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-3 items-center py-2 md:py-3">
                {/* Left: hamburger on mobile, full nav on desktop */}
                <nav className="flex items-center gap-3 md:gap-6 text-sm relative justify-start">
                  {/* Mobile */}
                  <div className="md:hidden">
                    <MobileMenu />
                  </div>

                  {/* Desktop links (hover mega menu) */}
                  <div className="hidden md:block relative group/menu">
                    <Link
                      href="/shop"
                      className="text-gold-rich inline-block py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Shop
                    </Link>
                    <MegaMenu />
                  </div>

                  <Link
                    href="/best-sellers"
                    className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
                  >
                    Best Sellers
                  </Link>

                  <Link
                    href="/skin-doctor"
                    className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
                  >
                    Skin Doctor
                  </Link>
                </nav>

                {/* Center logo */}
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center gap-2">
                    <img
                      src="/assets/products/simply-cucumber-profile-logo.png"
                      alt="Simply Cucumber"
                      className="h-10 w-auto md:h-16"
                    />
                  </Link>
                </div>

                {/* Right: keep cart on mobile; other links only on desktop */}
                <nav className="flex items-center gap-4 md:gap-6 text-sm justify-end">
                  <Link
                    href="/rewards"
                    className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
                  >
                    Rewards
                  </Link>
                  <Link
                    href="/salon"
                    className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
                  >
                    Salon
                  </Link>

                  {/* 🔎 Product search (hidden on mobile) */}
                  <div className="hidden sm:block">
                    <ProductSearch />
                  </div>

                  <CartLink />
                </nav>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <footer
            className="
              mt-0 text-white
              bg-gradient-to-r from-cucumber-700 via-cucumber-800 to-cucumber-700
              bg-[length:200%_200%] animate-shimmer-gold
            "
          >
            {/* Big headline */}
            <div className="text-center py-6">
              <h2
                className="
                  font-[var(--font-playfair)] font-extrabold
                  leading-[0.9] tracking-[0.25em] text-center
                  text-[9vw] md:text-6xl lg:text-7xl
                "
                style={{
                  background: "linear-gradient(90deg,#d4af37,#ffd700,#b8860b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <span className="block">HEALTH&nbsp;IS</span>
                <span className="block mt-1">WEALTH</span>
              </h2>
            </div>

            {/* Social icons */}
            <div className="mt-2">
              <SocialRow
                links={{
                  x: "https://x.com/simplycucumber",
                  facebook: "https://facebook.com/simplycucumber",
                  instagram: "https://instagram.com/simplycucumber",
                  tiktok: "https://www.tiktok.com/@simplycucumber",
                  linkedin: "https://www.linkedin.com/company/simplycucumber",
                }}
              />
            </div>

            {/* Footer grid */}
            <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8">
              {/* Newsletter Section */}
<div className="text-center py-12 px-6 md:px-0">
  <h3 className="text-lg md:text-xl font-semibold text-gold-metallic tracking-wide mb-2">
    STAY IN TOUCH.
  </h3>
  <p className="max-w-md mx-auto text-sm md:text-base text-white/90 mb-6">
    Signup to get first access to product launches & exclusive offers. Receive 15% Off Your First Order.
  </p>

  <form
    className="max-w-sm mx-auto grid gap-3"
    onInput={(e) => {
      const form = e.currentTarget;
      const email = form.querySelector('input[type="email"]');
      const phone = form.querySelector('input[type="tel"]');
      const button = form.querySelector('button');
      if (email && phone && button) {
        const filled = email.value.trim() !== "" || phone.value.trim() !== "";
        if (filled) {
          button.disabled = false;
          button.style.opacity = "1";
          button.style.cursor = "pointer";
          button.style.boxShadow =
            "0 0 10px rgba(212,175,55,0.6), 0 0 25px rgba(255,215,0,0.3)";
          button.style.filter = "none";
        } else {
          button.disabled = true;
          button.style.opacity = "0.5";
          button.style.cursor = "not-allowed";
          button.style.boxShadow = "none";
          button.style.filter = "grayscale(0.4)";
        }
      }
    }}
  >
    {/* Email */}
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full rounded-full border border-white/40 bg-transparent text-white placeholder-white/60 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-metallic transition-all"
    />

    {/* Phone (optional) */}
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm select-none">
        🇺🇸
      </div>
      <input
        type="tel"
        placeholder="Phone Number (Optional)"
        className="w-full rounded-full border border-white/40 bg-transparent text-white placeholder-white/60 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-metallic transition-all"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled
      className="w-full rounded-full bg-gold-metallic text-cucumber-800 font-semibold text-sm py-2.5 tracking-wide opacity-50 transition-all duration-300"
      style={{
        transition:
          "opacity 0.3s ease, box-shadow 0.4s ease, filter 0.4s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (!e.currentTarget.disabled) {
          e.currentTarget.style.transform = "scale(1.03)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      SIGN UP
    </button>
  </form>

  <p className="text-xs text-white/70 mt-4 max-w-sm mx-auto">
    By submitting this form, you consent to receive marketing emails or text messages from Simply Cucumber.{" "}
    See our{" "}
    <a href="/privacy" className="underline hover:text-gold-metallic">
      Privacy Policy
    </a>
    .
  </p>
</div>

              {/* 2) Customer Care */}
              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Customer Care</p>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                  <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="hover:underline">Return Policy</Link></li>
                </ul>
              </div>

              {/* 3) Get to Know Us */}
              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Get to Know Us</p>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:underline">About Us</Link></li>
                  <li><Link href="/salon" className="hover:underline">Our Salon</Link></li>
                  <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                </ul>
              </div>

              {/* 4) Simply Cucumber */}
              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Simply Cucumber</p>
                <ul className="space-y-2">
                  <li><Link href="/rewards" className="hover:underline">Rewards</Link></li>
                  <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            <div className="text-center py-6 text-xs border-t border-white/20">
              © {new Date().getFullYear()} Simply Cucumber · All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}