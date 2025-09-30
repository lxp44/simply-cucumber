import Link from "next/link";

const columns = [
  {
    title: "FACE",
    items: [
      { label: "Cleansers", href: "/shop?category=face" },
      { label: "Toners", href: "/shop?category=face" },
      { label: "Masks", href: "/shop?category=face" },
      { label: "Serums", href: "/shop?category=face" },
      { label: "Moisturizers", href: "/shop?category=face" },
    ]
  },
  {
    title: "BODY",
    items: [
      { label: "Hand Creams", href: "/shop?category=body" },
      { label: "Bath & Body", href: "/shop?category=body" },
      { label: "Hair Products", href: "/shop?category=body" },
    ]
  },
  {
    title: "CONCERN",
    items: [
      { label: "Dryness", href: "/shop" },
      { label: "Sensitivity", href: "/shop" },
      { label: "Uneven Texture", href: "/shop" },
    ]
  },
  {
    title: "FEATURED",
    items: [
      { label: "Best Sellers", href: "/shop" },
      { label: "New Arrivals", href: "/shop" },
      { label: "Travel Collection", href: "/shop" },
    ]
  },
  {
    title: "SIMPLY CUCUMBER",
    items: [
      { label: "Powders", href: "/shop?category=powders" },
      { label: "Toothpaste", href: "/shop?category=toothpaste" },
      { label: "Spa Packages", href: "/shop?category=spa-packages" }
    ]
  }
];

export default function MegaMenu() {
  return (
    <div className="menu-panel group-hover:menu-open absolute left-0 right-0 top-full bg-white border-b border-t shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {columns.map(col => (
          <div key={col.title}>
            <p className="text-xs font-semibold tracking-wider text-gray-800">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.items.map(i => (
                <li key={i.label}>
                  <Link href={i.href} className="hover:text-cucumber-700">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}