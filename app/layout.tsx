import "../styles/globals.css";
import Link from "next/link";
import PromoBar from "../components/PromoBar";
import MegaMenu from "../components/MegaMenu";
import { Playfair_Display } from "next/font/google";

// Load Playfair Display
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick the weights you’ll need
  variable: "--font-playfair"           // this lets us call it in Tailwind
});


export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body>
        <PromoBar />
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between py-3">
              <Link href="/" className="flex items-center gap-2">
                <img alt="Simply Cucumber" src="/assets/brand/logo.svg" className="h-8 w-auto" />
              </Link>
              <nav className="flex items-center gap-6 text-sm relative">
                <div className="relative group">
                  <Link href="/shop" className="hover:text-cucumber-700 inline-block py-2">Shop</Link>
                  {/* Hover mega menu */}
                  <MegaMenu />
                </div>
                <Link href="/best-sellers" className="hover:text-cucumber-700 py-2">Best Sellers</Link>
                <Link href="/gifts" className="hover:text-cucumber-700 py-2">Gifts</Link>
                <Link href="/skin-analysis" className="hover:text-cucumber-700 py-2">Skin Analysis</Link>
                <Link href="/rewards" className="hover:text-cucumber-700 py-2">Rewards</Link>
                <Link href="/salon" className="hover:text-cucumber-700 py-2">Salon</Link>
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t">
          <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900">Simply Cucumber</p>
              <p className="mt-2">Clean, cucumber-first beauty & wellness.</p>
            </div>
            <nav className="space-y-2">
              <a href="/shop" className="hover:text-cucumber-700">Shop</a><br/>
              <a href="/about" className="hover:text-cucumber-700">About Us</a><br/>
              <a href="/contact" className="hover:text-cucumber-700">Contact</a>
            </nav>
            <div className="md:text-right">
              <p>© {new Date().getFullYear()} Simply Cucumber</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
