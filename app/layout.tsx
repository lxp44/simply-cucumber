// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display } from "next/font/google";
import { CartProvider } from "../components/CartProvider";
import CartLink from "../components/CartLink";
import ProductSearch from "../components/ProductSearch";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <PromoBar />

        <CartProvider>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b overflow-visible">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-3 items-center py-3">
                {/* Left nav */}
                <nav className="flex items-center gap-6 text-sm relative justify-start">
                  {/* ⬇️ changed 'group' → 'group/menu' */}
                  <div className="relative group/menu">
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
                  <Link href="/best-sellers"  className="text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Best Sellers</Link>
                 <Link
  href="/gifts"
  className="text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300"
>
  Gifts
</Link>
</nav> 

                {/* Center logo */}
                <div className="flex justify-center">
                  <Link href="/" className="flex items-center gap-2">
                    <img
                      src="/assets/products/simply-cucumber-profile-logo.png"
                      alt="Simply Cucumber"
                      className="h-12 w-auto md:h-14"
                    />
                  </Link>
                </div>

                {/* Right nav */}
                <nav className="flex items-center gap-6 text-sm justify-end">
                  <Link href="/rewards" className="text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Rewards</Link>
                  <Link href="/salon" className="text-gold-rich py-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300">Salon</Link>
                    {/* 🔎 Product search */}
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

            <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8 text-gold-metallic">
              {/* Newsletter */}
              <div>
                <p className="font-semibold mb-3">Stay in touch.</p>
                <p className="mb-4">Signup to get first access to product launches & exclusive offers.</p>
                <form className="space-y-3">
                  <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 rounded border text-black" />
                  <input type="text" placeholder="Phone Number (Optional)" className="w-full px-3 py-2 rounded border text-black" />
                  <button type="submit" className="w-full bg-white text-cucumber-700 font-semibold py-2 rounded hover:bg-gray-100">
                    SIGN UP
                  </button>
                </form>
              </div>

              {/* Customer Care */}
              <div>
                <p className="font-semibold mb-3">Customer Care</p>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                  <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="hover:underline">Return Policy</Link></li>
                </ul>
              </div>

              {/* Get to Know Us */}
              <div>
                <p className="font-semibold mb-3">Get to Know Us</p>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:underline">About Us</Link></li>
                  <li><Link href="/salon" className="hover:underline">Our Salon</Link></li>
                  <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                </ul>
              </div>

              {/* Brand */}
              <div>
                <p className="font-semibold mb-3">Simply Cucumber</p>
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
