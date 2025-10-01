// app/layout.tsx
import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import ShopMenu from "../components/ShopMenu";
import { Playfair_Display } from "next/font/google";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
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

       {/* Header with centered logo */}
<header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
  <div className="mx-auto max-w-6xl px-4">
    <div className="grid grid-cols-3 items-center py-3">
      {/* LEFT: primary nav */}
      <nav className="flex items-center gap-6 text-sm">
        <ShopMenu />
        <Link href="/best-sellers" className="hover:text-cucumber-700 py-2">
          Best Sellers
        </Link>
        <Link href="/gifts" className="hover:text-cucumber-700 py-2">
          Gifts
        </Link>
      </nav>

      {/* CENTER: logo */}
      <div className="justify-self-center">
        <Link href="/" aria-label="Simply Cucumber" className="inline-flex items-center">
          <img
            alt="Simply Cucumber"
            src="/assets/products/simply-cucumber-profile-logo.png"
            className="h-9 w-auto"
          />
        </Link>
      </div>

      {/* RIGHT: secondary nav / actions */}
      <nav className="flex items-center gap-6 text-sm justify-self-end">
        <Link href="/skin-analysis" className="hover:text-cucumber-700 py-2">
          Skin Analysis
        </Link>
        <Link href="/rewards" className="hover:text-cucumber-700 py-2">
          Rewards
        </Link>
        <Link href="/salon" className="hover:text-cucumber-700 py-2">
          Salon
        </Link>
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

        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-24 border-t">
          <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900">Simply Cucumber</p>
              <p className="mt-2">
                Clean, cucumber-first beauty & wellness.{" "}
                <span className="font-[var(--font-playfair)]">Health is Wealth.</span>
              </p>
            </div>

            <nav className="space-y-2">
              <a href="/shop" className="hover:text-cucumber-700">Shop</a><br />
              <a href="/about" className="hover:text-cucumber-700">About Us</a><br />
              <a href="/contact" className="hover:text-cucumber-700">Contact</a>
            </nav>

            <div className="md:text-right space-y-2">
              <p>© {new Date().getFullYear()} Simply Cucumber</p>
              <div className="space-x-4">
                <Link href="/privacy" className="hover:text-cucumber-700">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-cucumber-700">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
