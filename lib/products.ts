export type Product = {
  sku: string;
  slug: string;
  title: string;
  tagline?: string; // ✨ optional tagline
  price: number;
  description: string;
  image: string;
  benefits: string[];
  category: "face" | "body" | "powders" | "toothpaste" | "spa-packages";
};


export const PRODUCTS: Product[] = [
  {
    sku: "powder",
    slug: "powder",
    title: "Powder",
    price: 25,
    description:
      "Freeze-dried cucumber powder packed with vitamins and antioxidants. Blend it into drinks, face masks, or spa water for a daily boost of clarity and hydration.",
    image: "/assets/products/cucumber-powder.jpg",
    benefits: ["100% Natural", "Rich in Vitamins", "Hydration Boost"],
    category: "powders",
  },
  {
  sku: "soap",
  slug: "soap",
  title: "Cucumber Soap",
  price: 6,
  description:
    "Indulge your skin in the refreshing simplicity of cucumber. Our Simply Cucumber Soap cleanses deeply without stripping away natural oils, leaving your skin feeling soft, balanced, and hydrated. Each bar is crafted with real cucumber extract—rich in antioxidants and natural antibacterial properties—to help calm irritation, fight body acne, and reduce dryness. The fresh cucumber scent awakens your senses while providing a cooling, spa-like experience every time you bathe. Perfect for daily use on face and body, this bar transforms your shower into a moment of clean, natural clarity.",
  image: "/assets/products/cucumber-soap.jpg",
  benefits: [
    "100% Natural",
    "Gently cleanses without stripping",
    "Fights body acne",
    "Leaves skin soft, not dry",
    "Cucumber scent is fresh & calming"
  ],
  category: "body",
},
 {
  sku: "face-mist",
  slug: "face-mist",
  title: "Cucumber Face Mist",
  tagline: "Your daily dew in a bottle — calm, hydrate, refresh.",
  price: 18,
  description:
    "Hydration. Balance. Glow — Anywhere, Anytime. Give your skin a refreshing reset with our Simply Cucumber Face Mist, your instant dose of hydration and calm. Infused with cucumber extract, aloe, and natural antioxidants, this fine mist delivers cooling relief, deep moisture, and a healthy, dewy glow—whether you’re fresh out of the gym, setting your makeup, or winding down after a long day. Each spray feels like a cool breeze in a bottle, instantly soothing redness, reviving dull skin, and rebalancing oil without disrupting your routine. It’s skincare that travels with you—light, pure, and powerful.",
  image: "/assets/products/cucumber-face-mist.jpg",
  benefits: [
    "Instant hydration — replenishes moisture anytime",
    "Cooling & calming — reduces redness, puffiness, and heat",
    "Brightening + refreshing — boosts natural glow",
    "Antioxidant defense — shields from stressors and blue light",
    "Balances oil & pH — keeps skin dewy, not greasy",
    "Soothes sensitive skin — cucumber and aloe calm irritation"
  ],
  category: "face",
},
  {
    sku: "mask",
    slug: "hydra-gel-mask",
    title: "Hydra-Gel Mask",
    price: 24,
    description:
      "Cooling gel mask for instant plumpness and glow.",
    image: "/assets/products/mask.jpg",
    benefits: ["Plumps Skin", "Cooling Feel"],
    category: "face",
  },
  {
    sku: "paste",
    slug: "cucumber-toothpaste",
    title: "Cucumber Toothpaste",
    price: 8,
    description:
      "Fresh cucumber-mint toothpaste for a clean, cool feel.",
    image: "/assets/products/toothpaste.jpg",
    benefits: ["Fluoride-Free", "Fresh Breath"],
    category: "toothpaste",
  },
  {
    sku: "spa",
    slug: "at-home-spa-kit",
    title: "At-Home Spa Kit",
    price: 39,
    description:
      "Curated cucumber spa ritual — includes mist, scrub, mask, and gel pads for full-body rejuvenation.",
    image: "/assets/products/spa.jpg",
    benefits: ["Great Gift", "Complete Ritual"],
    category: "spa-packages",
  },
  {
    sku: "lotion",
    slug: "cucumber-body-lotion",
    title: "Cucumber Body Lotion",
    price: 16,
    description:
      "Lightweight daily hydration infused with cooling cucumber extract.",
    image: "/assets/products/lotion.jpg",
    benefits: ["Non-Greasy", "Quick Absorb"],
    category: "body",
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
