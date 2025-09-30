import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="relative mx-auto h-64 md:h-80 rounded-xl bg-cucumber-100 flex items-center justify-center">
            {/* You can swap this block for a hero image later */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
              ENJOY 30% OFF SITEWIDE
            </h1>
          </div>
          <p className="mt-4 text-gray-700">
            Plus get a FREE Radiance Kit on $65+ · Use code: <span className="font-semibold">FRIENDS</span>
          </p>
          <div className="mt-6">
            <Link href="/shop" className="inline-block rounded-full border px-6 py-3 hover:bg-gray-50">
              SHOP NOW
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <span className="h-2 w-2 rounded-full bg-gray-900"></span>
          </div>
        </div>
      </section>
    </>
  );
}