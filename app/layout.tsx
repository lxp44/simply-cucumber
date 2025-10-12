// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display } from "next/font/google";
import { CartProvider, useCart } from "../components/CartProvider"; // ← add

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness.",
};

// Small client cart badge for header
function CartLink() {
  // client-only component
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="relative rounded bg-cucumber-600 px-3 py-1.5 text-white hover:bg-cucumber-700"
    >
      Cart
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-xs font-semibold text-cucumber-700">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <PromoBar />

        <CartProvider>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-3 items-center py-3">
                {/* Left nav */}
                <nav className="flex items-center gap-6 text-sm relative justify-start">
                  <div className="relative group">
                    <Link href="/shop" className="hover:text-cucumber-700 inline-block py-2">Shop</Link>
                    <MegaMenu />
                  </div>
                  <Link href="/best-sellers" className="hover:text-cucumber-700 py-2">Best Sellers</Link>
                  <Link href="/gifts" className="hover:text-cucumber-700 py-2">Gifts</Link>
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
                  <Link href="/skin-analysis" className="hover:text-cucumber-700 py-2">Skin Analysis</Link>
                  <Link href="/rewards" className="hover:text-cucumber-700 py-2">Rewards</Link>
                  <Link href="/salon" className="hover:text-cucumber-700 py-2">Salon</Link>
                  <CartLink /> {/* ← live count */}
                </nav>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main>{children}</main>

          {/* Footer (unchanged) */}
          <footer className="mt-0 text-white bg-gradient-to-r from-cucumber-700 via-cucumber-800 to-cucumber-700 bg-[length:200%_200%] animate-shimmer-gold">
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
            <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
              {/* ... your existing footer columns ... */}
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