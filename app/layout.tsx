// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display, Lato } from "next/font/google";
import { CartProvider } from "../components/CartProvider";
import CartLink from "../components/CartLink";
import ProductSearch from "../components/ProductSearch";
import NewsletterForm from "../components/NewsletterForm";
import MobileMenu from "../components/MobileMenu";
import SocialRow from "@/components/SocialRow"; // or "../components/SocialRow"

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

          {/* Footer (unchanged) */}
          <footer
            className="
              mt-0 text-white
              bg-gradient-to-r from-cucumber-700 via-cucumber-800 to-cucumber-700
              bg-[length:200%_200%] animate-shimmer-gold
            "
          >
            <div className="text-center py-6">
              <h2
                className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold"
                style={{
                  background: "linear-gradient(90deg,#d4af37,#ffd700,#b8860b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                HEALTH IS WEALTH
              </h2>
            </div>

import SocialRow from "@/components/SocialRow";

// ...inside the footer/newsletter section:
<SocialRow
  links={{
    x: "https://x.com/simplycucumber",
    facebook: "https://facebook.com/simplycucumber",
    instagram: "https://instagram.com/simplycucumber",
    tiktok: "https://www.tiktok.com/@simplycucumber",
    linkedin: "https://www.linkedin.com/company/simplycucumber",
  }}
/>

            <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8">
              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Stay in touch.</p>
                <p className="mb-4">
                  Signup to get first access to product launches &amp; exclusive offers.
                </p>
                <NewsletterForm />
              </div>

              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Customer Care</p>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                  <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="hover:underline">Return Policy</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-3 text-gold-metallic">Get to Know Us</p>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:underline">About Us</Link></li>
                  <li><Link href="/salon" className="hover:underline">Our Salon</Link></li>
                  <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                </ul>
              </div>

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