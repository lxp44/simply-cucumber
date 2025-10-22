// lib/products.ts

export type Variant = {
  label: string;
  price: number;
  sku?: string;
  /** New: allow multiple images per variant (preferred) */
  images?: string[];
  /** Back-compat: single image still supported */
  image?: string;
};

export type Product = {
  sku: string;
  slug: string;
  title: string;
  tagline?: string;

  price: number;
  description: string;
  bio?: string;                 // optional long-form

  image: string;                // primary
  images?: string[];            // gallery
  hoverImage?: string;

  benefits: string[];
  badges?: string[];            // e.g. ["Vegan","Paraben-Free","Alcohol-Free"]
  highlights?: string[];        // fallback if badges missing

  // NEW optional fields used by ProductDetailMobile:
  shortDescription?: string;    // brief blurb under badges
  ingredients?: string;         // shows in accordion
  usage?: string;               // shows in accordion
  variants?: Variant[];         // sizes/prices
  rating?: number;              // 0–5
  reviewCount?: number;         // total # reviews

  bestSeller?: boolean;
  category: "face" | "body" | "powders" | "toothpaste" | "spa-packages";
};

export const PRODUCTS: Product[] = [
  {
    sku: "powder",
    slug: "powder",
    title: "Powder",
    price: 50,
    description:
      "Freeze-dried cucumber powder packed with vitamins and antioxidants. Blend it into your favorate drink or water for a daily boost of clarity and hydration.",
    image: "/assets/products/cucumber-powder.jpg",
    hoverImage: "/assets/products/cucumber-powder-hover.jpg",
    benefits: ["100% Natural", "Rich in Vitamins", "Hydration Boost"],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Vegan", "Paraben-Free", "Synthetic Fragrance-Free"],
    bestSeller: true,
    variants: [
      {
        label: "14 ct",
        price: 27,
        sku: "powder-14ct",
        images: [ "/assets/products/powder-14-ct.jpg",
        "/assets/products/powder-14-ct-back.jpg",
                 ],
      },
      {
        label: "30 ct",
        price: 50,
        sku: "powder-30ct",
        images: [
          "/assets/products/powder-product-1.jpg",
          "/assets/products/powder-product-2.jpg",
           "/assets/products/powder-30-ct-model",
        ],
      },
    ],
    images: [
      // "/assets/products/powder-hero-1.jpg",
      // "/assets/products/powder-hero-2.jpg",
    ],
    category: "powders",
  },

  {
    sku: "soap",
    slug: "soap",
    title: "Cucumber Soap",
    price: 14,
    description:
      "Indulge your skin in the refreshing simplicity of cucumber. Our Simply Cucumber Soap cleanses deeply without stripping away natural oils, leaving your skin feeling soft, balanced, and hydrated. Each bar is crafted with real cucumber extract—rich in antioxidants and natural antibacterial properties—to help calm irritation, fight body acne, and reduce dryness. The fresh cucumber scent awakens your senses while providing a cooling, spa-like experience every time you bathe. Perfect for daily use on face and body, this bar transforms your shower into a moment of clean, natural clarity.",
    image: "/assets/products/cucumber-soap.jpg",
    images: [
      "/assets/products/soap-product-1.jpg",
      "/assets/products/soap-product-2.jpg",
      "/assets/products/soap-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-soap-hover.jpg",
    benefits: [
      "100% Natural",
      "Gently cleanses without stripping",
      "Fights body acne",
      "Leaves skin soft, not dry",
      "Cucumber scent is fresh & calming",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Vegan", "Paraben-Free", "Synthetic Fragrance-Free"],
    category: "body",
  },

  {
    sku: "face-mist",
    slug: "face-mist",
    title: "Cucumber Face Mist",
    tagline: "Your daily dew in a bottle — calm, hydrate, refresh.",
    price: 27,
    description:
      "Hydration. Balance. Glow — Anywhere, Anytime. Give your skin a refreshing reset with our Simply Cucumber Face Mist, your instant dose of hydration and calm. Infused with cucumber extract, aloe, and natural antioxidants, this fine mist delivers cooling relief, deep moisture, and a healthy, dewy glow—whether you’re fresh out of the gym, setting your makeup, or winding down after a long day. Each spray feels like a cool breeze in a bottle, instantly soothing redness, reviving dull skin, and rebalancing oil without disrupting your routine. It’s skincare that travels with you—light, pure, and powerful.",
    image: "/assets/products/cucumber-face-mist.jpg",
    images: [
      "/assets/products/face-mist-product-1.jpg",
      "/assets/products/face-mist-product-2.jpg",
    ],
    hoverImage: "/assets/products/cucumber-face-mist-hover.jpg",
    benefits: [
      "Instant hydration — replenishes moisture anytime",
      "Cooling & calming — reduces redness, puffiness, and heat",
      "Brightening + refreshing — boosts natural glow",
      "Antioxidant defense — shields from stressors and blue light",
      "Balances oil & pH — keeps skin dewy, not greasy",
      "Soothes sensitive skin — cucumber and aloe calm irritation",
    ],
    variants: [
      {
        label: "2 oz",
        price: 18,
        sku: "face-mist-2oz",
        image: "/assets/products/face-mist-2-oz.jpg",
      },
      {
        label: "4 oz",
        price: 27,
        sku: "face-mist-4oz",
        image: "/assets/products/face-mist-product-1.jpg",
      },
      {
        label: "8 oz",
        price: 42,
        sku: "face-mist-8oz",
        image: "/assets/products/face-mist-8-oz-model.jpg",
      },
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Vegan", "Paraben-Free", "Cooling"],
    category: "face",
  },

  {
    sku: "toothpaste",
    slug: "cucumber-toothpaste",
    title: "Cucumber Toothpaste",
    tagline: "Hydrate & Brighten — Naturally.",
    price: 15,
    description:
      "Experience the refreshingly pure clean your mouth deserves. Our Simply Cucumber Toothpaste combines cool mint and crisp cucumber for a soothing yet powerful oral care ritual. Formulated with natural minerals like silica and potassium, it helps support strong enamel and healthy gums while staying gentle on sensitive teeth. Every brush delivers a burst of freshness that lasts — fighting inflammation, balancing oral pH, and nourishing with Vitamin C and Zinc for immunity and repair. Fluoride-free and clean by design, it’s perfect for those who crave nature’s touch in their daily routine. Available in travel-size tubes or eco-friendly glass jars, the Simply Cucumber Toothpaste is your soothing care for sensitive gums — refreshing, natural, and undeniably clean.",
    image: "/assets/products/cucumber-toothpaste.jpg",
    images: [
      "/assets/products/toothpaste-product-1.jpg",
      "/assets/products/toothpaste-product-2.jpg",
      "/assets/products/toothpaste-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-toothpaste-hover.jpg",
    benefits: [
      "Gentle on enamel and gums",
      "Freshens breath with natural mint and cucumber",
      "Fights inflammation and supports oral immunity",
      "Zinc + Vitamin C aid in tissue repair",
      "Clean, fluoride-free, and non-toxic formula",
      "Balances oral pH for long-lasting freshness",
    ],
    badges: ["Fluoride-Free", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Fluoride-Free", "Gentle", "Freshens Breath"],
    category: "toothpaste",
  },

  {
    sku: "charcoal-toothpaste",
    slug: "simply-cucumber-charcoal-toothpaste",
    title: "Simply Cucumber Charcoal Toothpaste",
    tagline: "Detox. Brighten. Refresh — Naturally.",
    price: 20,
    description:
      "Deep-clean your smile with Simply Cucumber Charcoal Toothpaste — a natural detoxifying formula powered by activated charcoal, mint, and cucumber extract. Designed to lift surface stains, balance oral pH, and freshen breath, this fluoride-free blend delivers a cool, clean polish that leaves your mouth feeling refreshed and renewed. The smooth black paste foams gently without grit, while cucumber and coconut oil hydrate and soothe sensitive gums. Safe for daily use and ideal for anyone seeking a bright, naturally balanced smile.",
    image: "/assets/products/cucumber-charcoal-toothpaste.jpg",
    images: [
      "/assets/products/charcoal-toothpaste-product-1.jpg",
      "/assets/products/charcoal-toothpaste-product-2.jpg",
      "/assets/products/charcoal-toothpaste-product-3.png",
    ],
    hoverImage: "/assets/products/cucumber-charcoal-toothpaste-hover.png",
    benefits: [
      "Whitens and detoxifies with activated charcoal",
      "Gently removes stains and buildup without harsh abrasives",
      "Balances pH and supports oral microbiome health",
      "Hydrates and soothes with cucumber + coconut oil",
      "Fluoride-free, non-toxic, and safe for daily use",
      "Cool, mint-cucumber freshness that lasts",
    ],
    badges: ["Fluoride-Free", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Detoxifying", "Whitens", "Fluoride-Free"],
    category: "toothpaste",
  },

  {
    sku: "gum",
    slug: "cucumber-gum",
    title: "Simply Cucumber Gum",
    tagline: "Hydrate. Heal. Refresh.",
    price: 10,
    description:
      "Chew clean. Refresh naturally. Our Simply Cucumber Gum blends cool mint and crisp cucumber for a spa-fresh taste that hydrates, heals, and refreshes with every chew. Infused with Vitamin C, Zinc, and xylitol to help fight bad bacteria, support gum health, and encourage healthy saliva flow—gently nourishing your mouth while keeping breath fresh.",
    image: "/assets/products/cucumber-gum.jpg",
    images: [
      "/assets/products/gum-product-1.jpg",
      "/assets/products/gum-product-2.jpg",
      "/assets/products/gum-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-gum-hover.jpg",
    benefits: [
      "Freshens breath naturally",
      "Vitamin C + Zinc support gum and immune health",
      "Xylitol helps fight bad bacteria",
      "Soothes dry mouth; boosts saliva production",
      "Helps protect enamel; balances oral pH",
    ],
    badges: ["Sugar-Free", "Vegan", "Alcohol-Free"],
    highlights: ["Freshens Breath", "Balances pH", "Vegan"],
    category: "toothpaste",
  },

  {
    sku: "mouthwash",
    slug: "simply-cucumber-mouthwash",
    title: "Simply Cucumber Mouthwash",
    tagline: "Fresh. Clean. Cool — Naturally.",
    price: 25,
    description:
      "Rinse, refresh, and restore with Simply Cucumber Mouthwash — a fluoride-free, alcohol-free formula that leaves your mouth feeling clean and hydrated. Infused with cucumber extract, mint, and zinc, this gentle rinse neutralizes odor, balances pH, and supports gum health without the burn. The cool cucumber-mint blend provides a refreshing finish while naturally soothing irritation and dryness. Perfect for daily use morning and night, it’s the ideal complement to your Simply Cucumber Toothpaste — for a pure, cooling clean that lasts.",
    image: "/assets/products/cucumber-mouth-wash.jpg",
    images: [
      "/assets/products/mouth-wash-product-1.jpg",
      "/assets/products/mouth-wash-product-2.jpg",
      "/assets/products/mouth-wash-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-mouth-wash-hover.jpg",
    benefits: [
      "Neutralizes bad breath and odor naturally",
      "Alcohol-free, fluoride-free gentle formula",
      "Balances oral pH for a healthy mouth environment",
      "Supports gum health with zinc and cucumber extract",
      "Soothes irritation and dryness",
      "Clean, cooling cucumber-mint finish",
    ],
     variants: [
      {
        label: "2 oz",
        price: 18,
        sku: "face-mist-2oz",
        image: "/assets/products/face-mist-2-oz.jpg",
      },
      {
        label: "4 oz",
        price: 27,
        sku: "face-mist-4oz",
        image: "/assets/products/face-mist-product-1.jpg",
      },
      {
        label: "8 oz",
        price: 42,
        sku: "face-mist-8oz",
        image: "/assets/products/face-mist-8-oz-model.jpg",
      },
    ],
    badges: ["Fluoride-Free", "Alcohol-Free", "Paraben-Free"],
    highlights: ["Alcohol-Free", "Fluoride-Free", "Freshens Breath"],
    category: "toothpaste",
  },

  {
    sku: "body-scrub",
    slug: "cucumber-body-scrub",
    title: "Simply Cucumber Body Scrub",
    tagline: "Refresh Your Glow — Naturally.",
    price: 40,
    description:
      "Reveal your skin’s natural radiance with our Simply Cucumber Body Scrub, a refreshing blend of cucumber extract, fine sugar crystals, and nourishing plant oils. Designed to exfoliate gently yet effectively, this scrub buffs away dull, dry skin while replenishing essential moisture — leaving you silky-smooth, hydrated, and glowing. The cooling power of cucumber calms inflammation, while natural antioxidants help detoxify and brighten the skin. Each use feels like a spa treatment — fresh, clean, and crisp, with a scent that relaxes your senses and revives your energy. Perfect for daily or weekly use on body, hands, or feet.",
    image: "/assets/products/cucumber-body-scrub.jpg",
    images: [
      "/assets/products/body-scrub-product-1.jpg",
      "/assets/products/body-scrub-product-2.jpg",
      "/assets/products/body-scrub-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-body-scrub-hover.jpg",
    benefits: [
      "Deep exfoliation reveals softer, smoother skin",
      "Hydrating formula with cucumber extract and coconut oil",
      "Brightens skin tone and improves texture",
      "Soothes redness, bumps, and irritation",
      "Antioxidant protection from free radicals",
      "Preps skin for moisture or self-tanning",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Vegan", "Hydrating", "Brightening"],
    category: "body",
  },

  {
    sku: "face-scrub",
    slug: "cucumber-face-scrub",
    title: "Simply Cucumber Face Scrub",
    tagline: "Polish, Purify, and Glow — Naturally.",
    price: 40,
    description:
      "Give your skin a fresh start every day with our Simply Cucumber Face Scrub. This gentle, yet powerful exfoliator blends cucumber extract, fine rice powder, and natural fruit enzymes to smooth away dead skin cells and impurities without irritation. Enriched with aloe and green tea, it calms redness while promoting an even, radiant complexion. Designed for all skin types, this refreshing scrub refines texture, unclogs pores, and enhances the absorption of serums and moisturizers. The result — clean, balanced, and glowing skin that feels as soft as it looks.",
    image: "/assets/products/cucumber-face-scrub.jpg",
    images: [
      "/assets/products/face-scrub-product-1.jpg",
      "/assets/products/face-scrub-product-2.jpg",
      "/assets/products/face-scrub-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-face-scrub-hover.jpg",
    benefits: [
      "Gently exfoliates without micro-tears",
      "Smooths and brightens dull skin",
      "Unclogs pores and reduces blackheads",
      "Soothes with aloe and cucumber extract",
      "Prepares skin for better product absorption",
      "100% natural and non-stripping formula",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Gentle", "Brightening", "Soothing"],
    category: "face",
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
    images: [
      "/assets/products/deodorant-product-1.jpg",
      "/assets/products/deodorant-product-2.jpg",
      "/assets/products/deodorant-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-deordorant-hover.jpg",
    benefits: [
      "Long-lasting freshness powered by natural antibacterial ingredients",
      "Aluminum & paraben-free formula that lets skin breathe",
      "Soothes irritation with aloe and cucumber",
      "Hydrating protection with coconut oil and shea butter",
      "Clean, cooling cucumber scent that’s light and fresh",
      "Stain-free formula — glides on clear with no residue",
    ],
    badges: ["Aluminum-Free", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Aluminum-Free", "Soothing", "Non-Irritating"],
    category: "body",
  },

  {
    sku: "lotion-2",
    slug: "simply-cucumber-lotion",
    title: "Simply Cucumber Lotion",
    tagline: "Smooth. Hydrate. Restore — Naturally.",
    price: 30,
    description:
      "Lightweight, fast-absorbing hydration for silky, balanced skin. Simply Cucumber Lotion is crafted with cucumber extract, aloe, and shea butter to deliver long-lasting moisture that feels breathable, never greasy. This refreshing formula absorbs instantly, soothing dryness and restoring elasticity while leaving a cool, clean scent that refreshes the senses. Perfect for daily use on both face and body, it’s your go-to lotion for smooth, nourished skin — simple, pure, and naturally effective.",
    image: "/assets/products/cucumber-lotion.jpg",
    images: [
      "/assets/products/lotion-products-1.jpg",
      "/assets/products/lotion-products-2.jpg",
      "/assets/products/lotion-products-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-lotion-hover.jpg",
    benefits: [
      "Deep, lasting hydration without heaviness",
      "Calms and soothes dry or sensitive skin",
      "Fast-absorbing, non-greasy formula",
      "Restores elasticity and smooth texture",
      "Infused with cucumber extract, aloe, and shea butter",
      "Light, cooling scent that refreshes all day",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Soothing", "Fast-Absorbing"],
    category: "body",
  },

  {
    sku: "shampoo",
    slug: "simply-cucumber-shampoo",
    title: "Simply Cucumber Shampoo",
    tagline: "Clean. Calm. Revive — Naturally.",
    price: 16,
    description:
      "Bring your hair back to life with Simply Cucumber Shampoo — a refreshing, sulfate-free cleanser designed to purify the scalp while restoring natural shine and softness. Infused with cucumber extract, aloe, and vitamin B5, this gentle formula removes buildup, balances oil, and delivers lightweight hydration from root to tip. Each wash leaves your hair feeling fresh, smooth, and naturally vibrant with a subtle, clean cucumber scent that lingers just long enough to refresh your senses.",
    image: "/assets/products/cucumber-shampoo.jpg",
    images: [
      "/assets/products/shampoo-product-1.jpg",
      "/assets/products/shampoo-product-2.jpg",
      "/assets/products/shampoo-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-shampoo-hover.jpg",
    benefits: [
      "Gently cleanses without stripping moisture",
      "Balances scalp oils and reduces buildup",
      "Infused with cucumber, aloe, and vitamin B5",
      "Adds shine and smoothness to dull hair",
      "Light, fresh cucumber scent for daily refresh",
      "Safe for color-treated and sensitive scalps",
    ],
    badges: ["Sulfate-Free", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Sulfate-Free", "Hydrating", "Balancing"],
    category: "body",
  },

  {
    sku: "conditioner",
    slug: "simply-cucumber-conditioner",
    title: "Simply Cucumber Conditioner",
    tagline: "Nourish. Detangle. Shine — Naturally.",
    price: 16,
    description:
      "Complete your clean hair ritual with Simply Cucumber Conditioner — a lightweight, hydrating blend that restores softness and shine without weighing your hair down. Infused with cucumber extract, aloe, and coconut oil, it smooths frizz, strengthens strands, and seals in moisture for a silky, healthy finish. Designed for all skin types, it leaves your scalp refreshed and your hair beautifully balanced with a subtle, clean cucumber scent. Use daily after shampooing for naturally radiant hair that feels fresh, soft, and renewed.",
    image: "/assets/products/cucumber-conditioner.jpg",
    images: [
      "/assets/products/conditioner-product-1.jpg",
      "/assets/products/conditioner-product-2.jpg",
      "/assets/products/conditioner-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-conditioner-hover.jpg",
    benefits: [
      "Deep hydration without heaviness or residue",
      "Smooths frizz and detangles instantly",
      "Strengthens and restores shine",
      "Infused with cucumber, aloe, and coconut oil",
      "Light, clean cucumber scent refreshes daily",
      "Safe for all hair types, including color-treated hair",
    ],
    badges: ["Silicone-Free", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Detangling", "Smoothing"],
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
    images: [
      "/assets/products/lip-oil-product-1.jpg",
      "/assets/products/lip-oil-product-2.jpg",
      "/assets/products/lip-oil-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-lip-oil-hover.jpg",
    benefits: [
      "Deep hydration that locks in moisture for hours",
      "Healing blend of Vitamin E + cucumber oil for repair and protection",
      "Lightweight, non-sticky shine with a natural finish",
      "Soothes and cools irritation or dryness",
      "Antioxidant-rich to keep lips youthful and supple",
      "Perfect alone or over lipstick for hydrated glow",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Soothing", "Non-Sticky"],
    category: "face",
  },

  {
    sku: "lip-balm",
    slug: "cucumber-lip-balm",
    title: "Simply Cucumber Lip Balm",
    tagline: "Softness, Simplified.",
    price: 10,
    description:
      "Nourish your lips with the cooling comfort of cucumber. Our Simply Cucumber Lip Balm is crafted with cucumber extract, shea butter, and vitamin E to deliver lasting hydration and protection in one swipe. It melts effortlessly into dry lips, sealing in moisture while creating a soft, natural finish — no shine, no stickiness, just smooth, healthy lips. Infused with antioxidants and natural oils, it helps heal cracks, calm irritation, and defend against dryness from weather or daily wear. The subtle cucumber scent feels light and refreshing — perfect for anyone who loves clean, effortless care.",
    image: "/assets/products/cucumber-lip-balm.jpg",
    images: [
      "/assets/products/lip-balm-products-1.jpg",
      "/assets/products/lip-balm-products-2.jpg",
      "/assets/products/lip-balm-products-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-lip-balm-hover.jpg",
    benefits: [
      "Deep moisture locks in softness all day",
      "Healing cucumber + vitamin E repair dryness",
      "Protective barrier against wind and sun",
      "Smooth non-sticky finish with natural matte sheen",
      "Antioxidant support keeps lips youthful and supple",
      "Subtle cucumber scent for a fresh, calming feel",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Healing", "Protective", "Matte Finish"],
    category: "face",
  },

  {
    sku: "face-dry-mask",
    slug: "face-dry-mask",
    title: "Simply Cucumber Face Dry Mask",
    tagline: "Detox. Revive. Glow.",
    price: 40,
    description:
      "Purify and refresh your skin with our Simply Cucumber Face Dry Mask — a powdered botanical blend designed to activate instantly with water or toner. Each use delivers a concentrated dose of cucumber enzymes, clay minerals, and antioxidants that draw out impurities while restoring essential hydration. Mix just what you need for a fresh, clean treatment every time. Ideal for all skin types, this mask calms inflammation, reduces oil buildup, and leaves skin smooth, balanced, and visibly renewed.",
    image: "/assets/products/cucumber-dry-mask.jpg",
    images: [
      "/assets/products/dry-mask-product-1.jpg",
      "/assets/products/dry-mask-product-2.jpg",
      "/assets/products/dry-mask-product-3.jpg",
    ],
    hoverImage: "/assets/products/dry-mask-product-3.jpg",
    highlights: ["Vegan", "Paraben-Free", "Brightening", "Cooling"],
    benefits: [
      "Balances oil without over-drying",
      "Cucumber enzymes refresh and soothe skin",
      "Draws out impurities and tightens pores",
      "Powder activates fresh for every use",
      "Leaves skin soft, matte, and radiant",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    category: "face",
  },

  {
    sku: "face-mask-1",
    slug: "cucumber-face-mask",
    title: "Simply Cucumber Face Mask (Single Use)",
    tagline: "Cool Your Skin. Revive Your Glow.",
    price: 6,
    description:
      "Reset your skin with the refreshing power of cucumber. The Simply Cucumber Face Mask delivers a surge of deep hydration, antioxidants, and Vitamin C to instantly cool, soothe, and brighten your complexion. Designed for all skin types — even sensitive — it helps reduce puffiness, tighten pores, and restore a naturally balanced glow. The gel-based formula feels icy and weightless, melting into skin to calm inflammation and boost radiance in minutes. Whether used after a long day, a flight, or a night out, this mask brings your skin back to life — refreshed, smooth, and luminous.",
    image: "/assets/products/cucumber-face-mask-single.jpg",
    images: [
      "/assets/products/face-mask-single-product-1.jpg",
      "/assets/products/face-mask-single-product-2.jpg",
      "/assets/products/face-mask-single-product-3.jpg",
    ],
    hoverImage: "/assets/products/face-mask-single-product-3.jpg",
    benefits: [
      "Deep hydration that replenishes and locks in moisture",
      "Reduces puffiness and dark circles for energized skin",
      "Calms irritation with antioxidants and Vitamin C",
      "Tightens pores and refines skin texture",
      "Brightens and softens for a healthy, natural glow",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Cooling", "Brightening"],
    category: "face",
  },

  {
    sku: "face-mask-16",
    slug: "cucumber-face-mask-16",
    title: "Simply Cucumber Face Mask (16 count)",
    tagline: "Cool Your Skin. Revive Your Glow.",
    price: 100,
    description:
      "Reset your skin with the refreshing power of cucumber. The Simply Cucumber Face Mask delivers a surge of deep hydration, antioxidants, and Vitamin C to instantly cool, soothe, and brighten your complexion. Designed for all skin types — even sensitive — it helps reduce puffiness, tighten pores, and restore a naturally balanced glow. The gel-based formula feels icy and weightless, melting into skin to calm inflammation and boost radiance in minutes. Whether used after a long day, a flight, or a night out, this mask brings your skin back to life — refreshed, smooth, and luminous.",
    image: "/assets/products/cucumber-face-mask-pack.jpg",
    images: [
      "/assets/products/face-mask-pack-product-1.jpg",
      "/assets/products/face-mask-pack-product-2.jpg",
      "/assets/products/face-mask-pack-product-3.jpg",
    ],
    hoverImage: "/assets/products/face-mask-pack-product-3.jpg",
    benefits: [
      "Deep hydration that replenishes and locks in moisture",
      "Reduces puffiness and dark circles for energized skin",
      "Calms irritation with antioxidants and Vitamin C",
      "Tightens pores and refines skin texture",
      "Brightens and softens for a healthy, natural glow",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Cooling", "Brightening"],
    category: "face",
  },

  {
    sku: "eye-pads-1",
    slug: "cucumber-eye-pads",
    title: "Simply Cucumber Eye Pads (Single Use)",
    tagline: "Wake Up Beautifully.",
    price: 6,
    description:
      "Refresh tired eyes in minutes with our Simply Cucumber Eye Pads, infused with cooling cucumber extract, aloe, and vitamin-rich botanicals that bring instant relief to delicate under-eye skin. Each pad delivers a soothing, hydrating boost that reduces puffiness, brightens dark circles, and revives your natural glow—whether you’re recovering from a long night or a long day. Powered by Vitamin C, niacinamide, and green tea antioxidants, these pads fight fatigue and early signs of aging, while cucumber’s cooling touch calms and refreshes. Store them in the fridge for the ultimate spa-at-home experience.",
    image: "/assets/products/cucumber-eye-pads-single.jpg",
    images: [
      "/assets/products/eye-pad-single-product-1.jpg",
      "/assets/products/eye-pad-single-product-2.jpg",
      "/assets/products/eye-pad-single-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-eye-pads-hover.jpg",
    benefits: [
      "Reduces puffiness and under-eye bags",
      "Brightens dark circles (Vitamin C + niacinamide)",
      "Deep hydration without irritation (aloe + glycerin)",
      "Soothes sensitive, tired eyes",
      "Antioxidant protection (cucumber + green tea)",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["De-Puffing", "Brightening", "Hydrating"],
    category: "face",
  },

  {
    sku: "eye-pads-16",
    slug: "cucumber-eye-pads-16",
    title: "Simply Cucumber Eye Pads (16 count)",
    tagline: "Wake Up Beautifully.",
    price: 100,
    description:
      "Refresh tired eyes in minutes with our Simply Cucumber Eye Pads, infused with cooling cucumber extract, aloe, and vitamin-rich botanicals that bring instant relief to delicate under-eye skin. Each pad delivers a soothing, hydrating boost that reduces puffiness, brightens dark circles, and revives your natural glow—whether you’re recovering from a long night or a long day. Powered by Vitamin C, niacinamide, and green tea antioxidants, these pads fight fatigue and early signs of aging, while cucumber’s cooling touch calms and refreshes. Store them in the fridge for the ultimate spa-at-home experience.",
    image: "/assets/products/cucumber-eye-pads-pack.jpg",
    images: [
      "/assets/products/eye-pads-pack-product-1.jpg",
      "/assets/products/eye-pads-pack-product-2.jpg",
      "/assets/products/eye-pads-pack-product-3.jpg",
    ],
    hoverImage: "/assets/products/eye-pads-pack-product-3.jpg",
    benefits: [
      "Reduces puffiness and under-eye bags",
      "Brightens dark circles (Vitamin C + niacinamide)",
      "Deep hydration without irritation (aloe + glycerin)",
      "Soothes sensitive, tired eyes",
      "Antioxidant protection (cucumber + green tea)",
    ],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["De-Puffing", "Brightening", "Hydrating"],
    category: "face",
  },

  {
    sku: "eye-gel",
    slug: "simply-cucumber-eye-gel",
    title: "Simply Cucumber Re-Freezable Eye Gel Pads (5 Uses)",
    tagline: "Cool. Calm. Reuse — Naturally.",
    price: 18,
    description:
      "Revive and refresh your eyes again and again with Simply Cucumber Re-Freezable Eye Gel Pads — reusable cooling pads designed to soothe, de-puff, and brighten tired eyes. Each pair is filled with cucumber-infused gel for a clean, cooling therapy that can be used up to 5 times. Store them in the fridge or freezer for the ultimate spa-at-home moment that instantly reduces puffiness, relieves tension, and restores your under-eye glow. Gentle, sustainable, and incredibly refreshing — your new daily reset ritual.",
    image: "/assets/products/cucumber-eye-gels.jpg",
    images: [
      "/assets/products/eye-gel-product-1.jpg",
      "/assets/products/eye-gel-product-2.jpg",
      "/assets/products/eye-gel-product-3.jpg",
    ],
    hoverImage: "/assets/products/cucumber-eye-gel-hover.jpg",
    benefits: [
      "Reusable up to 5 times — sustainable and effective",
      "Instant cooling relief for puffy, tired eyes",
      "Reduces dark circles and under-eye bags",
      "Soothes irritation and relieves tension around the eyes",
      "Infused with cucumber extract for hydration and calm",
      "Fridge-friendly and perfect for daily self-care",
    ],
    badges: ["Reusable", "Vegan", "Alcohol-Free"],
    highlights: ["Cooling", "Re-usable", "Soothing"],
    category: "face",
  },

  {
    sku: "spa",
    slug: "at-home-spa-kit",
    title: "At-Home Spa Kit",
    price: 200,
    description:
      "Curated cucumber spa ritual — includes mist, scrub, mask, and gel pads for full-body rejuvenation.",
    image: "/assets/products/spa.jpg",
    hoverImage: "/assets/products/spa-hover.jpg",
    benefits: ["Great Gift", "Complete Ritual"],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Giftable", "Complete Set", "Spa-At-Home"],
    category: "spa-packages",
  },

  {
    sku: "lotion",
    slug: "cucumber-body-lotion",
    title: "Cucumber Body Lotion",
    price: 25,
    description:
      "Lightweight daily hydration infused with cooling cucumber extract.",
    image: "/assets/products/lotion.jpg",
    hoverImage: "/assets/products/lotion-hover.jpg",
    benefits: ["Non-Greasy", "Quick Absorb"],
    badges: ["Vegan", "Paraben-Free", "Alcohol-Free"],
    highlights: ["Hydrating", "Quick-Absorb", "Non-Greasy"],
    category: "body",
  },
];

// Helper: always return a product with an images[] for components that expect it
export const bySlug = (slug: string) => {
  const p = PRODUCTS.find((p) => p.slug === slug);
  if (!p) return undefined;
  if (!p.images || p.images.length === 0) {
    // don’t mutate original; return a shallow clone with images fallback
    return { ...p, images: [p.image] } as Product;
    }
  return p;
};
