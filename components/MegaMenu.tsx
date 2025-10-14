import Link from "next/link";

const COL = "space-y-2";
const ITEM = "block text-[13px] text-gray-800 hover:text-cucumber-700 transition-colors";

export default function MegaMenu() {
  return (
  <div
  className={[
    // positioning
    "absolute top-full left-1/2 z-50 mt-3 -translate-x-[11%]", // ← use one X offset
    // size + surface
    "w-[920px] max-w-[92vw] rounded-lg border bg-[#e3d3b3]/95 p-6 shadow-lg backdrop-blur-md",
    // soft bottom fade
    "after:content-[''] after:absolute after:inset-x-0 after:-bottom-6 after:h-6 after:bg-gradient-to-b after:from-black/10 after:to-transparent after:pointer-events-none",

    // ✨ GOLD SHIMMER LINE (runs once on open)
    "before:content-[''] before:pointer-events-none before:absolute before:top-0 before:left-0",
    "before:h-[2px] before:w-1/3 before:rounded-full",
    "before:bg-gradient-to-r before:from-transparent before:via-[#f3d98e] before:to-transparent",
    "before:opacity-0 group-hover/menu:before:opacity-100 group-hover/menu:before:shimmer-once",

    // hidden by default + transitions
    "invisible opacity-0 translate-y-3 pointer-events-none transition-all duration-300 ease-out",
    // show on hover
    "group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto",
    "hover:visible hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto",

    // subtle luxury glow
    "hover:shadow-[0_0_25px_rgba(217,182,119,0.25)] hover:ring-1 hover:ring-[#b8860b]/40",
  ].join(" ")}
  role="menu"
  aria-label="Shop menu"
>
      <div className="grid grid-cols-3 gap-6 relative z-10">
        {/* FACE */}
        <div>
          <p className="mb-3 font-semibold tracking-wide text-gray-900 text-sm">FACE</p>
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
          <p className="mb-3 font-semibold tracking-wide text-gray-900 text-sm">BODY</p>
          <div className={COL}>
            <Link href="/shop?category=body" className={ITEM}>All Body</Link>
            <Link href="/shop?category=bath-body" className={ITEM}>Bath &amp; Body</Link>
            <Link href="/shop?category=hand-creams" className={ITEM}>Hand Creams</Link>
            <Link href="/shop?category=hair-products" className={ITEM}>Hair Products</Link>
          </div>
        </div>

        {/* FEATURED */}
        <div>
          <p className="mb-3 font-semibold tracking-wide text-gray-900 text-sm">FEATURED</p>
          <div className={COL}>
            <Link href="/shop?category=powders" className={ITEM}>Powders</Link>
            <Link href="/shop?category=toothpaste" className={ITEM}>Toothpaste</Link>
            <Link href="/shop?category=spa-packages" className={ITEM}>Spa Packages</Link>
            <Link href="/shop" className={ITEM}>All Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}