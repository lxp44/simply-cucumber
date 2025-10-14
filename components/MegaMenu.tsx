// components/MegaMenu.tsx
import Link from "next/link";

const COL = "space-y-2.5";
const ITEM = "block text-sm text-gray-800 hover:text-cucumber-700";

export default function MegaMenu() {
  return (
    <div
      className={[
        // position (under the "Shop" trigger)
        "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2",
        // responsive width caps
        "w-[92vw] max-w-[860px] md:max-w-[900px] lg:max-w-[980px]",
        // surface
        "rounded-xl border bg-[#e3d3b3]/95 p-6 md:p-7 shadow-lg backdrop-blur",
        // hidden by default
        "invisible opacity-0 translate-y-2 pointer-events-none",
        "transition duration-200",
        // show while hovering trigger OR the panel
        "group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto",
        "hover:visible hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto",
      ].join(" ")}
      role="menu"
      aria-label="Shop menu"
    >
      {/* 3 columns on md+, 2 on small screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-7">
        {/* FACE */}
        <div>
          <p className="mb-3 md:mb-4 font-semibold tracking-wide text-gray-900">FACE</p>
          <div className={COL}>
            <Link href="/shop?category=face" className={ITEM}>All Face</Link>
            <Link href="/shop?category=cleansers" className={ITEM}>Cleansers</Link>
            <Link href="/shop?category=toners" className={ITEM}>Toners</Link>
            <Link href="/shop?category=serums" className={ITEM}>Serums</Link>
            <Link href="/shop?category=moisturizers" className={ITEM}>Moisturizers</Link>
            <Link href="/shop?category=masks" className={ITEM}>Masks</Link>
          </div>
        </div>

        {/* BODY */}
        <div>
          <p className="mb-3 md:mb-4 font-semibold tracking-wide text-gray-900">BODY</p>
          <div className={COL}>
            <Link href="/shop?category=body" className={ITEM}>All Body</Link>
            <Link href="/shop?category=bath-body" className={ITEM}>Bath &amp; Body</Link>
            <Link href="/shop?category=hand-creams" className={ITEM}>Hand Creams</Link>
            <Link href="/shop?category=hair-products" className={ITEM}>Hair Products</Link>
          </div>
        </div>

        {/* RIGHT: Featured + promos (stacked) */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <p className="mb-3 md:mb-4 font-semibold tracking-wide text-gray-900">FEATURED</p>
            <div className={COL}>
              <Link href="/shop?category=powders" className={ITEM}>Powders</Link>
              <Link href="/shop?category=toothpaste" className={ITEM}>Toothpaste</Link>
              <Link href="/shop?category=spa-packages" className={ITEM}>Spa Packages</Link>
              <Link href="/shop" className={ITEM}>All Products</Link>
            </div>
          </div>

          {/* Promo thumbs (auto scale smaller) */}
          <div className="hidden sm:grid grid-cols-2 gap-4">
            <Link href="/shop" className="block overflow-hidden rounded-lg border">
              <img
                src="/assets/menu/drop-down-menu-1.jpg"
                alt="Simply Cucumber"
                className="h-28 w-full object-cover md:h-32"
              />
            </Link>
            <Link href="/shop" className="block overflow-hidden rounded-lg border">
              <img
                src="/assets/menu/drop-down-menu-2.jpg"
                alt="New arrivals"
                className="h-28 w-full object-cover md:h-32"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}