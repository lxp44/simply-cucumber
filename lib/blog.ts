// lib/blog.ts
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;      // simple HTML string for now
  cover: string;        // /public path
  date: string;         // ISO
  tags: string[];
  author?: string;
  readMins?: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cucumber-skin-benefits",
    title: "7 Refreshing Benefits of Cucumber for Your Skin",
    excerpt:
      "From instant hydration to calming redness — here’s why cucumber is the quiet powerhouse in your routine.",
    content: `
      <p>Cucumber is rich in antioxidants, vitamin C, and natural silica — all stars for calm, hydrated skin.</p>
      <h3>1) Cooling Calm</h3>
      <p>Its natural cooling effect can help reduce the look of puffiness and irritation.</p>
      <h3>2) Hydration</h3>
      <p>High water content replenishes moisture without heaviness.</p>
      <p>Try our <a href="/products/face-mist" class="underline text-cucumber-700">Cucumber Face Mist</a> for an instant reset.</p>
    `,
    cover: "/assets/blog/cucumber-benefits.jpg",
    date: "2025-01-08",
    tags: ["Skincare 101", "Ingredients"],
    author: "Simply Cucumber Editors",
    readMins: 4,
  },
  {
    slug: "how-to-build-simple-routine",
    title: "How to Build a Simple, Effective Routine",
    excerpt:
      "Cleanse, mist, moisturize — then add targeted treatments only where you need them.",
    content: `
      <p>Minimal routines work — especially when formulas are clean and focused.</p>
      <ul>
        <li><strong>Cleanse:</strong> Keep it gentle.</li>
        <li><strong>Mist:</strong> Rebalance and prep with cucumber.</li>
        <li><strong>Moisturize:</strong> Seal hydration without heaviness.</li>
      </ul>
      <p>Personalize with our <a class="underline text-cucumber-700" href="/skin-doctor">Skin Doctor</a> quiz.</p>
    `,
    cover: "/assets/blog/simple-routine.jpg",
    date: "2025-01-02",
    tags: ["Routines", "Tips"],
    author: "Team SC",
    readMins: 5,
  },
  {
    slug: "winter-skin-rescue",
    title: "Winter Skin Rescue: Calm, Hydrate, Protect",
    excerpt:
      "Beat dryness and dullness with a few small changes that make a big difference.",
    content: `
      <p>Cold air outside, dry heat inside — winter is hydration season.</p>
      <p>Layer a mist under moisturizer and add weekly masking for glow.</p>
    `,
    cover: "/assets/blog/winter-skin.jpg",
    date: "2024-12-10",
    tags: ["Seasonal", "Tips"],
    author: "Simply Cucumber Editors",
    readMins: 3,
  },
];