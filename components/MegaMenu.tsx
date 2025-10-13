// components/MegaMenu.tsx
import Link from "next/link";

const COL = "space-y-3";
const ITEM = "block text-[15px] text-gray-800 hover:text-cucumber-700";

export default function MegaMenu() {
  return (
    <div
      className={[
        // position
        "absolute top-full z-40 mt-2",
        // align: left on small screens (no translate), center on md+
        "left-0 md:left-1/2 md:-translate-x-1/2",
        // responsive width: cap to viewport on small, max 980px overall
        "w-[92vw] max-w-[980px]",
        // surface
        "rounded-xl border bg-[#e3d3b3]/95 p-6 md:p-8 shadow-lg backdrop-blur",
        // hidden by default
        "invisible opacity-0 translate-y-2 pointer-events-none",
        "transition duration-200",
        // show while hovering trigger OR panel
        "group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto",
        "hover:visible hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto",
      ].join(" ")}
      role="menu"
      aria-label="Shop menu"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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

        {/* FEATURED */}
        <div>
          <p className="mb-3 md:mb-4 font-semibold tracking-wide text-gray-900">FEATURED</p>
          <div className={COL}>
            <Link href="/shop?category=powders" className={ITEM}>Powders</Link>
            <Link href="/shop?category=toothpaste" className={ITEM}>Toothpaste</Link>
            <Link href="/shop?category=spa-packages" className={ITEM}>Spa Packages</Link>
            <Link href="/shop" className={ITEM}>All Products</Link>
          </div>
        </div>

        {/* PROMO THUMBS */}
        <div className="hidden lg:block">
          <Link href="/shop" className="block overflow-hidden rounded-lg border">
            <img
              src="/assets/menu/drop-down-menu-1.jpg"
              alt="Simply Cucumber"
              className="h-48 w-full object-cover"
            />
          </Link>
          <Link href="/shop" className="mt-4 block overflow-hidden rounded-lg border">
            <img
              src="/assets/menu/drop-down-menu-2.jpg"
              alt="New arrivals"
              className="h-48 w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}