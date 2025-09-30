// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        {/* Top promo bar */}
        <PromoBar />

        {/* Header with centered logo + hover mega menu */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative flex items-center justify-between py-3">

              {/* Left nav items */}
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <div className="relative group">
                  <Link href="/shop" className="hover:text-cucumber-700 inline-block py-2">
                    Shop
                  </Link>
                  <MegaMenu />
                </div>
                <Link href="/best-sellers" className="hover:text-cucumber-700 py-2">Best Sellers</Link>
                <Link href="/gifts" className="hover:text-cucumber-700 py-2">Gifts</Link>
              </nav>

              {/* Center logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <img
                  alt="Simply Cucumber"
                  src="/assets/products/simply-cucumber-profile-logo.png"
                  className="h-14 w-auto md:h-16"
                />
              </Link>

              {/* Right nav items */}
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/skin-analysis" className="hover:text-cucumber-700 py-2">Skin Analysis</Link>
                <Link href="/rewards" className="hover:text-cucumber-700 py-2">Rewards</Link>
                <Link href="/salon" className="hover:text-cucumber-700 py-2">Salon</Link>
                <Link
                  href="/cart"
                  className="rounded bg-cucumber-600 px-3 py-1.5 text-white hover:bg-cucumber-700"
                >
                  Cart
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer (green band + headline) */}
        <footer className="mt-24 bg-cucumber-700 text-white">
          {/* Big message */}
          <div className="border-b border-white/15">
            <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 text-center">
              <h2 className="font-[var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl tracking-tight">
                HEALTH IS WEALTH.
              </h2>
            </div>
          </div>

          {/* Link columns */}
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-3 text-sm">
            <div>
              <p className="text-white/90 font-medium">Simply Cucumber</p>
              <p className="mt-3 text-white/80">
                Clean, cucumber-first beauty & wellness. Little rituals, big returns.
              </p>
            </div>

            <nav className="space-y-2">
              <p className="uppercase tracking-widest text-xs text-white/60">Customer Care</p>
              <a href="/contact" className="block hover:underline">Contact</a>
              <a href="/shop" className="block hover:underline">Shop</a>
              <a href="/about" className="block hover:underline">About Us</a>
            </nav>

            <nav className="space-y-2 md:text-right">
              <p className="uppercase tracking-widest text-xs text-white/60">More</p>
              <a href="/privacy" className="block hover:underline">Privacy Policy</a>
              <a href="/terms" className="block hover:underline">Terms of Service</a>
              <p className="mt-4 text-white/70">
                © {new Date().getFullYear()} Simply Cucumber
              </p>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
