// app/cart/page.tsx
import CartView from "../../components/CartView";

export const metadata = {
  title: "Your Bag · Simply Cucumber",
};

export default function CartPage() {
  return (
    <section className="min-h-screen bg-[#e3d3b3]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold text-center"
          style={{
            background: "linear-gradient(90deg,#d4af37,#ffd700,#b8860b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Bag
        </h1>

        <p className="mt-2 text-center text-gray-700">
          Clean, natural cucumber beauty—curated for you.
        </p>

        <div className="mt-10">
          <CartView />
        </div>
      </div>
    </section>
  );
}