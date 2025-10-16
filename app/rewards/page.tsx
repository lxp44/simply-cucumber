// app/rewards/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RewardsPage() {
  const [joined, setJoined] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f7f2e9] via-[#e3d3b3] to-[#d6b98c] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#b8860b] mb-4">
          Simply Cucumber Rewards
        </h1>
        <p className="text-gray-700 mb-8">
          Become a member to earn points every time you shop, unlock exclusive
          rewards, and enjoy early access to new launches.
        </p>

        {!joined ? (
          <button
            onClick={() => setJoined(true)}
            className="bg-cucumber-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-cucumber-800 transition"
          >
            Join Now
          </button>
        ) : (
          <div className="bg-white/80 p-6 rounded-xl border mt-6 shadow-md">
            <h2 className="text-2xl font-semibold text-cucumber-800">
              Welcome to the Club 🌿
            </h2>
            <p className="text-gray-700 mt-2">
              You’re now a Simply Cucumber Member!
            </p>

            <div className="mt-6">
              <div className="bg-[#e3d3b3]/50 p-4 rounded-lg text-left">
                <p className="font-medium text-cucumber-800">Your Points:</p>
                <p className="text-3xl font-bold text-[#b8860b]">0</p>
                <p className="text-sm text-gray-600 mt-1">
                  Earn 5 points for every $1 you spend.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-cucumber-800">
                  How it works
                </h3>
                <ul className="text-gray-700 text-left mt-2 space-y-2">
                  <li>🛍️ Earn 5 points per $1 spent</li>
                  <li>🎁 Redeem points for discounts and free products</li>
                  <li>💎 Unlock exclusive rewards as you level up</li>
                  <li>🚀 Get early access to new product drops</li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-block bg-cucumber-600 text-white px-5 py-2 rounded-full hover:bg-cucumber-700 transition"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}