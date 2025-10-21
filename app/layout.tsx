// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display, Lato } from "next/font/google";
import { CartProvider } from "../components/CartProvider";
import CartLink from "../components/CartLink";
import ProductSearch from "../components/ProductSearch";
import MobileMenu from "../components/MobileMenu";
import SocialRow from "../components/SocialRow";
import FooterNewsletter from "../components/FooterNewsletter"; // ✅ client newsletter

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
                <nav className="flex items-center gap-3 md:gap-6 text-sm relative justify-start">
                  <div className="md:hidden"><MobileMenu /></div>
                  <div className="hidden md:block relative group/menu">
                    <Link href="/shop" className="text-gold-rich inline-block py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Shop</Link>
                    <MegaMenu />
                  </div>
                  <Link href="/best-sellers" className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Best Sellers</Link>
                  <Link href="/skin-doctor" className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Skin Doctor</Link>
                </nav>
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center gap-2">
                    <img src="/assets/products/simply-cucumber-profile-logo.png" alt="Simply Cucumber" className="h-10 w-auto md:h-16" />
                  </Link>
                </div>
                <nav className="flex items-center gap-4 md:gap-6 text-sm justify-end">
                  <Link href="/rewards" className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Rewards</Link>
                  <Link href="/salon" className="hidden md:inline-block text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Salon</Link>
                  <div className="hidden sm:block"><ProductSearch /></div>
                  <CartLink />
                </nav>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="mt-0 text-white bg-gradient-to-r from-cucumber-700 via-cucumber-800 to-cucumber-700 bg-[length:200%_200%] animate-shimmer-gold">
            {/* Big headline */}
            <div className="text-center py-6">
              <h2
                className="font-[var(--font-playfair)] font-extrabold leading-[0.9] tracking-[0.25em] text-center text-[9vw] md:text-6xl lg:text-7xl"
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
              {/* 1) Newsletter */}
              <FooterNewsletter />

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