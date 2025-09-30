import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Simply Cucumber",
  description: "Clean, natural cucumber beauty & wellness."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img alt="Simply Cucumber" src="/logo.svg" className="h-8 w-auto" />
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/products" className="hover:text-cucumber-700">Products</Link>
              <Link href="/science" className="hover:text-cucumber-700">Science</Link>
              <Link href="/about" className="hover:text-cucumber-700">About</Link>
              <Link href="/cart" className="rounded bg-cucumber-600 px-3 py-1.5 text-white hover:bg-cucumber-700">Cart</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Simply Cucumber · All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
