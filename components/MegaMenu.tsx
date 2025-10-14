// components/MegaMenu.tsx
import Link from "next/link";

const COL = "space-y-2";
const ITEM = "block text-[13px] text-gray-800 hover:text-cucumber-700";

export default function MegaMenu() {
  return (
   <div
  className={[
    // position — under “Shop” trigger, slightly more to the right
    "absolute top-full z-50 mt-2",
    // keep width flexible but not too wide
    "w-[920px] max-w-[92vw]",
    // surface
    "rounded-lg border bg-[#e3d3b3]/95 p-5 shadow-lg backdrop-blur",
    // hidden by default
    "invisible opacity-0 translate-y-2 pointer-events-none",
    "transition duration-200",
    // show while hovering trigger OR the panel
    "group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto",
    "hover:visible hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto",
  ].join(" ")}
  role="menu"
  aria-label="Shop menu"
  style={{
    left: "50%",
    transform: "translateX(-11%)", // adjust this: -35% or -45% if needed
  }}
>
      <div className="grid grid-cols-3 gap-6">
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

        {/* FEATURED + Images */}
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