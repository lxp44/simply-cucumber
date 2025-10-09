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
  sku: "toothpaste",
  slug: "cucumber-toothpaste",
  title: "Cucumber Toothpaste",
  tagline: "Hydrate & Brighten — Naturally.",
  price: 8,
  description:
    "Experience the refreshingly pure clean your mouth deserves. Our Simply Cucumber Toothpaste combines cool mint and crisp cucumber for a soothing yet powerful oral care ritual. Formulated with natural minerals like silica and potassium, it helps support strong enamel and healthy gums while staying gentle on sensitive teeth. Every brush delivers a burst of freshness that lasts — fighting inflammation, balancing oral pH, and nourishing with Vitamin C and Zinc for immunity and repair. Fluoride-free and clean by design, it’s perfect for those who crave nature’s touch in their daily routine. Available in travel-size tubes or eco-friendly glass jars, the Simply Cucumber Toothpaste is your soothing care for sensitive gums — refreshing, natural, and undeniably clean.",
  image: "/assets/products/cucumber-toothpaste.jpg",
  benefits: [
    "Gentle on enamel and gums",
    "Freshens breath with natural mint and cucumber",
    "Fights inflammation and supports oral immunity",
    "Zinc + Vitamin C aid in tissue repair",
    "Clean, fluoride-free, and non-toxic formula",
    "Balances oral pH for long-lasting freshness"
  ],
  category: "toothpaste",
},
  {
  sku: "gum",
  slug: "cucumber-gum",
  title: "Simply Cucumber Gum",
  tagline: "Hydrate. Heal. Refresh.",
  price: 4,
  description:
    "Chew clean. Refresh naturally. Our Simply Cucumber Gum blends cool mint and crisp cucumber for a spa-fresh taste that hydrates, heals, and refreshes with every chew. Infused with Vitamin C, Zinc, and xylitol to help fight bad bacteria, support gum health, and encourage healthy saliva flow—gently nourishing your mouth while keeping breath fresh.",
  image: "/assets/products/cucumber-gum.jpg",
  benefits: [
    "Freshens breath naturally",
    "Vitamin C + Zinc support gum and immune health",
    "Xylitol helps fight bad bacteria",
    "Soothes dry mouth; boosts saliva production",
    "Helps protect enamel; balances oral pH"
  ],
  category: "toothpaste",
},
 {
  sku: "body-scrub",
  slug: "cucumber-body-scrub",
  title: "Simply Cucumber Body Scrub",
  tagline: "Refresh Your Glow — Naturally.",
  price: 22,
  description:
    "Reveal your skin’s natural radiance with our Simply Cucumber Body Scrub, a refreshing blend of cucumber extract, fine sugar crystals, and nourishing plant oils. Designed to exfoliate gently yet effectively, this scrub buffs away dull, dry skin while replenishing essential moisture — leaving you silky-smooth, hydrated, and glowing. The cooling power of cucumber calms inflammation, while natural antioxidants help detoxify and brighten the skin. Each use feels like a spa treatment — fresh, clean, and crisp, with a scent that relaxes your senses and revives your energy. Perfect for daily or weekly use on body, hands, or feet.",
  image: "/assets/products/cucumber-body-scrub.jpg",
  benefits: [
    "Deep exfoliation reveals softer, smoother skin",
    "Hydrating formula with cucumber extract and coconut oil",
    "Brightens skin tone and improves texture",
    "Soothes redness, bumps, and irritation",
    "Antioxidant protection from free radicals",
    "Preps skin for moisture or self-tanning"
  ],
  category: "body",
},
  {
  sku: "deodorant",
  slug: "cucumber-deodorant",
  title: "Simply Cucumber Deodorant",
  tagline: "Pure Confidence — Naturally.",
  price: 14,
  description:
    "Stay confident all day with Simply Cucumber Deodorant, a clean, aluminum-free formula powered by cucumber, aloe, and mineral salts. Designed to neutralize odor naturally without blocking pores, it keeps you feeling fresh, balanced, and dry while letting your body breathe. Infused with cucumber extract and coconut oil, it soothes delicate underarm skin, prevents irritation, and delivers a cool, calming scent that’s refreshing and subtle. No harsh chemicals. No white residue. Just natural protection that works — and feels like skincare.",
  image: "/assets/products/cucumber-deodorant-2.jpg",
  benefits: [
    "Long-lasting freshness powered by natural antibacterial ingredients",
    "Aluminum & paraben-free formula that lets skin breathe",
    "Soothes irritation with aloe and cucumber",
    "Hydrating protection with coconut oil and shea butter",
    "Clean, cooling cucumber scent that’s light and fresh",
    "Stain-free formula — glides on clear with no residue"
  ],
  category: "body",
},
  {
  sku: "lip-oil",
  slug: "cucumber-lip-oil",
  title: "Simply Cucumber Lip Oil",
  tagline: "Gloss Meets Wellness.",
  price: 12,
  description:
    "Give your lips the love they deserve with our Simply Cucumber Lip Oil — a weightless blend of cold-pressed cucumber seed oil, vitamin E, and plant-based gloss enhancers that instantly hydrates, soothes, and restores dry or chapped lips. Unlike sticky glosses or heavy balms, this formula melts in smoothly, leaving a soft, glass-like shine with long-lasting moisture. The cooling cucumber infusion refreshes on contact, delivering a clean, subtle scent that feels like skincare, not makeup.",
  image: "/assets/products/cucumber-lip-oil.jpg",
  benefits: [
    "Deep hydration that locks in moisture for hours",
    "Healing blend of Vitamin E + cucumber oil for repair and protection",
    "Lightweight, non-sticky shine with a natural finish",
    "Soothes and cools irritation or dryness",
    "Antioxidant-rich to keep lips youthful and supple",
    "Perfect alone or over lipstick for hydrated glow"
  ],
  category: "face",
},
  {
  sku: "face-mask",
  slug: "cucumber-face-mask",
  title: "Simply Cucumber Face Mask (Single Use)",
  tagline: "Cool Your Skin. Revive Your Glow.",
  price: 6,
  description:
    "Reset your skin with the refreshing power of cucumber. The Simply Cucumber Face Mask delivers a surge of deep hydration, antioxidants, and Vitamin C to instantly cool, soothe, and brighten your complexion. Designed for all skin types — even sensitive — it helps reduce puffiness, tighten pores, and restore a naturally balanced glow. The gel-based formula feels icy and weightless, melting into skin to calm inflammation and boost radiance in minutes. Whether used after a long day, a flight, or a night out, this mask brings your skin back to life — refreshed, smooth, and luminous.",
  image: "/assets/products/cucumber-face-mask-single.jpg",
  benefits: [
    "Deep hydration that replenishes and locks in moisture",
    "Reduces puffiness and dark circles for energized skin",
    "Calms irritation with antioxidants and Vitamin C",
    "Tightens pores and refines skin texture",
    "Brightens and softens for a healthy, natural glow"
  ],
  category: "face",
},
  {
  sku: "face-mask",
  slug: "cucumber-face-mask",
  title: "Simply Cucumber Face Mask (16 count)",
  tagline: "Cool Your Skin. Revive Your Glow.",
  price: 100,
  description:
    "Reset your skin with the refreshing power of cucumber. The Simply Cucumber Face Mask delivers a surge of deep hydration, antioxidants, and Vitamin C to instantly cool, soothe, and brighten your complexion. Designed for all skin types — even sensitive — it helps reduce puffiness, tighten pores, and restore a naturally balanced glow. The gel-based formula feels icy and weightless, melting into skin to calm inflammation and boost radiance in minutes. Whether used after a long day, a flight, or a night out, this mask brings your skin back to life — refreshed, smooth, and luminous.",
  image: "/assets/products/cucumber-face-mask.jpg",
  benefits: [
    "Deep hydration that replenishes and locks in moisture",
    "Reduces puffiness and dark circles for energized skin",
    "Calms irritation with antioxidants and Vitamin C",
    "Tightens pores and refines skin texture",
    "Brightens and softens for a healthy, natural glow"
  ],
  category: "face",
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
