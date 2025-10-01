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
            className="h-16 w-auto"
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
<footer className="bg-cucumber-600 text-white mt-24">
  {/* Top message bar */}
  <div className="text-center py-6">
    <h2
      className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold"
      style={{
        background: "linear-gradient(90deg, #d4af37, #ffd700, #b8860b)", // metallic gold tones
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      HEALTH IS WEALTH
    </h2>
  </div>

  {/* Footer content */}
  <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
    {/* Newsletter */}
    <div>
      <p className="font-semibold mb-3">Stay in touch.</p>
      <p className="mb-4">Signup to get first access to product launches & exclusive offers.</p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 rounded border text-black"
        />
        <input
          type="text"
          placeholder="Phone Number (Optional)"
          className="w-full px-3 py-2 rounded border text-black"
        />
        <button
          type="submit"
          className="w-full bg-white text-cucumber-700 font-semibold py-2 rounded hover:bg-gray-100"
        >
          SIGN UP
        </button>
      </form>
    </div>

    {/* Customer Care */}
    <div>
      <p className="font-semibold mb-3">Customer Care</p>
      <ul className="space-y-2">
        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
        <li><a href="/faqs" className="hover:underline">FAQs</a></li>
        <li><a href="/shipping" className="hover:underline">Shipping Policy</a></li>
        <li><a href="/returns" className="hover:underline">Return Policy</a></li>
      </ul>
    </div>

    {/* Get to Know Us */}
    <div>
      <p className="font-semibold mb-3">Get to Know Us</p>
      <ul className="space-y-2">
        <li><a href="/about" className="hover:underline">About Us</a></li>
        <li><a href="/salon" className="hover:underline">Our Salon</a></li>
        <li><a href="/blog" className="hover:underline">Blog</a></li>
      </ul>
    </div>

    {/* Brand */}
    <div>
      <p className="font-semibold mb-3">Simply Cucumber</p>
      <ul className="space-y-2">
        <li><a href="/rewards" className="hover:underline">Rewards</a></li>
        <li><a href="/skin-analysis" className="hover:underline">Skin Analysis</a></li>
        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
        <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="text-center py-6 text-xs border-t border-white/20">
    © {new Date().getFullYear()} Simply Cucumber · All rights reserved.
  </div>
</footer>
