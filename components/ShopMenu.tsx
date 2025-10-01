// components/ShopMenu.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ShopMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const onEnter = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const onLeave = () => {
    // small delay so users can move into the panel without it closing
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* The button */}
      <Link href="/shop" className="hover:text-cucumber-700 inline-block py-2">
        Shop
      </Link>

      {/* The panel */}
      <div
        className={`absolute left-0 mt-2 w-[760px] max-w-[calc(100vw-2rem)]
        rounded-xl border bg-white shadow-xl z-50 transition-opacity duration-150
        ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="grid grid-cols-4 gap-8 p-6">
          {/* COLUMN 1 */}
          <div>
            <p className="mb-3 font-semibold">Featured</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=powders" className="hover:text-cucumber-700">Powders</Link></li>
              <li><Link href="/shop?category=toothpaste" className="hover:text-cucumber-700">Toothpaste</Link></li>
              <li><Link href="/shop?category=spa-packages" className="hover:text-cucumber-700">Spa Packages</Link></li>
              <li><Link href="/shop" className="hover:text-cucumber-700">All Products</Link></li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <p className="mb-3 font-semibold">Face</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=face" className="hover:text-cucumber-700">Cleansers</Link></li>
              <li><Link href="/shop?category=face" className="hover:text-cucumber-700">Toners</Link></li>
              <li><Link href="/shop?category=face" className="hover:text-cucumber-700">Serums</Link></li>
              <li><Link href="/shop?category=face" className="hover:text-cucumber-700">Moisturizers</Link></li>
              <li><Link href="/shop?category=face" className="hover:text-cucumber-700">Masks</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <p className="mb-3 font-semibold">Body</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=body" className="hover:text-cucumber-700">Bath &amp; Body</Link></li>
              <li><Link href="/shop?category=body" className="hover:text-cucumber-700">Hand Creams</Link></li>
              <li><Link href="/shop?category=body" className="hover:text-cucumber-700">Hair Products</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 – visual card(s) */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
              <Image
                src="/assets/shop/card-1.jpg"   // optional promo image
                alt="Featured"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
              <Image
                src="/assets/shop/card-2.jpg"   // optional promo image
                alt="New Arrivals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
